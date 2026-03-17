import 'package:flutter/material.dart';
import '../../core/storage/storage_service.dart';
import '../../core/services/submit_notifier.dart';
import '../../core/feedback/toast_service.dart';

class HabitItem {
  final int id;
  final String name;
  final String category;
  final String timeLabel;
  bool completed;

  HabitItem({
    required this.id,
    required this.name,
    required this.category,
    required this.timeLabel,
    this.completed = false,
  });
}

class DailyProvider extends ChangeNotifier {
  final StorageService _storage = StorageService.instance;
  final SubmitNotifier _submitNotifier;
  
  List<HabitItem> habits = [];
  Map<int, bool> completions = {};
  bool isSubmitted = false;
  int streak = 0;
  DateTime today = DateTime.now();

  DailyProvider(this._submitNotifier) {
    _submitNotifier.addListener(_onGlobalSubmit);
    _init();
  }

  void _onGlobalSubmit() {
    isSubmitted = _submitNotifier.isSubmitted;
    notifyListeners();
  }

  @override
  void dispose() {
    _submitNotifier.removeListener(_onGlobalSubmit);
    super.dispose();
  }

  Future<void> _init() async {
    await fetchTodayData();
  }

  Future<void> fetchTodayData() async {
    final slots = await _storage.getRoutineSlots();
    completions = await _storage.getCompletions(today);
    isSubmitted = await _storage.isSubmitted(today);
    streak = await _storage.getStreak();

    // extract today's habits
    // dayOfWeek: 1=Mon...7=Sun. Our array is 0=Mon.
    int dayIndex = today.weekday - 1;
    
    habits.clear();
    for (int i = 0; i < slots.length; i++) {
      final slot = slots[i];
      final cell = slot.rows[dayIndex];
      // Filter out "free"
      if (cell.cls != 'free') {
        habits.add(HabitItem(
          id: i,
          name: cell.text,
          category: cell.cls,
          timeLabel: slot.label,
          completed: completions[i] ?? false,
        ));
      }
    }

    // Add one-off tasks (IDs starting from 1000 to avoid collision with slot IDs)
    final oneOffs = await _storage.getOneOffTasks(today);
    for (var taskData in oneOffs) {
      habits.add(HabitItem(
        id: taskData['id'] as int,
        name: taskData['name'] as String,
        category: taskData['category'] as String,
        timeLabel: 'One-off',
        completed: taskData['completed'] as bool,
      ));
    }

    // Apply saved order if exists
    final order = await _storage.getHabitOrder(today);
    if (order.isNotEmpty) {
      final Map<int, HabitItem> habitMap = {for (var h in habits) h.id: h};
      List<HabitItem> sortedHabits = [];
      for (int id in order) {
        if (habitMap.containsKey(id)) {
          sortedHabits.add(habitMap.remove(id)!);
        }
      }
      // Add any remaining habits that weren't in the saved order (e.g. newly added one-offs)
      sortedHabits.addAll(habitMap.values);
      habits = sortedHabits;
    }

    notifyListeners();
  }

  Future<void> addOneOffHabit(String name, String category) async {
    if (isSubmitted) {
      ToastService.warning('Day already submitted.');
      return;
    }

    // Generate a unique ID for the one-off task
    int newId = 1000 + habits.where((h) => h.id >= 1000).length;
    
    final newHabit = HabitItem(
      id: newId,
      name: name,
      category: category,
      timeLabel: 'One-off',
      completed: false,
    );

    habits.add(newHabit);
    await _saveOneOffsToStorage();
    notifyListeners();
  }

  Future<void> _saveOneOffsToStorage() async {
    final oneOffs = habits.where((h) => h.id >= 1000).map((h) => {
      'id': h.id,
      'name': h.name,
      'category': h.category,
      'completed': h.completed,
    }).toList();
    await _storage.saveOneOffTasks(today, oneOffs);
  }

  double get consistencyScore {
    if (habits.isEmpty) return 0.0;
    int completedCount = habits.where((h) => h.completed).length;
    return completedCount / habits.length;
  }

  Future<void> toggleHabit(int slotId) async {
    if (isSubmitted) {
      ToastService.warning('Day already submitted. Routine is locked.');
      return;
    }
    
    final habit = habits.firstWhere((h) => h.id == slotId);
    habit.completed = !habit.completed;
    
    if (slotId >= 1000) {
      await _saveOneOffsToStorage();
    } else {
      completions[slotId] = habit.completed;
      await _storage.saveCompletions(today, completions);
    }
    
    notifyListeners();
  }

  // Lifecycle helpers
  Future<void> loadTodayStatus() async {
    isSubmitted = await _storage.isSubmitted(today);
    streak = await _storage.getStreak();
    notifyListeners();
  }

  Future<void> resetForNewDay() async {
    today = DateTime.now();
    await fetchTodayData();
  }

  Future<void> reload() async {
    final now = DateTime.now();
    if (now.year != today.year || now.month != today.month || now.day != today.day) {
      today = now;
      await _storage.setStreak(0); // Reset streak if new day started without submission (simplified)
      // Actually streak logic is in StorageService.getStreak()
    }
    await fetchTodayData();
  }

  void reorderHabits(int oldIndex, int newIndex) async {
    if (isSubmitted) return;
    
    if (newIndex > oldIndex) {
      newIndex -= 1;
    }
    final HabitItem item = habits.removeAt(oldIndex);
    habits.insert(newIndex, item);
    
    notifyListeners();
    
    final order = habits.map((h) => h.id).toList();
    await _storage.saveHabitOrder(today, order);
  }
}
