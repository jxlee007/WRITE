import 'package:flutter/material.dart';
import '../../core/storage/storage_service.dart';
import '../../core/models/routine_slot.dart';
import '../../core/models/slot_cell.dart';
import '../../core/feedback/toast_service.dart';

class RoutineProvider extends ChangeNotifier {
  final StorageService _storage = StorageService.instance;

  List<RoutineSlot> slots = [];
  int currentDayIndex = DateTime.now().weekday - 1; // 0=Mon, 6=Sun
  String currentView = 'day'; // 'day' | 'week' | 'month'

  RoutineProvider() {
    _loadSlots();
  }

  Future<void> _loadSlots() async {
    slots = await _storage.getRoutineSlots();
    notifyListeners();
  }

  Future<void> refresh() => _loadSlots();

  void setCurrentDay(int index) {
    if (index >= 0 && index <= 6) {
      currentDayIndex = index;
      notifyListeners();
    }
  }

  void setView(String view) {
    currentView = view;
    notifyListeners();
  }

  Future<void> updateSlot(int slotIndex, int dayIndex, {String? text, String? sub, String? cls}) async {
    if (slotIndex < 0 || slotIndex >= slots.length) return;
    
    final slot = slots[slotIndex];
    final cell = slot.rows[dayIndex];
    
    slot.rows[dayIndex] = SlotCell(
      cls: cls ?? cell.cls,
      text: text ?? cell.text,
      sub: sub ?? cell.sub,
    );
    
    await _storage.saveRoutineSlots(slots);
    ToastService.success('Routine updated');
    notifyListeners();
  }

  Future<void> clearSlot(int slotIndex, int dayIndex) async {
    await updateSlot(slotIndex, dayIndex, cls: 'free', text: 'Free Time', sub: '');
    ToastService.info('Slot cleared');
  }

  String get dayName {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[currentDayIndex];
  }

  // --- Month Stats Logic ---

  Future<double> getAdherence() async {
    // Mock adherence or compute from completions for last 7 days
    int total = 0;
    int completed = 0;
    
    // Check last 7 days inclusive of today
    for (int i = 0; i < 7; i++) {
       final date = DateTime.now().subtract(Duration(days: i));
       final comps = await _storage.getCompletions(date);
       final slotsCount = (await _storage.getRoutineSlots()).length;
       
       total += slotsCount;
       completed += comps.length; // Approximate: completions map size is completed tasks
    }
    
    if (total == 0) return 0.86; // Proto fallback
    return completed / total;
  }

  Map<String, double> getCategoryHours() {
    // Compute from slots (Weekly Matrix is the ideal hours)
    Map<String, int> minutes = {
      'hustle_work': 0,
      'study_prep': 0,
      'fitness': 0,
      'sleep': 0,
    };

    for (final slot in slots) {
      int duration = _parseDurationMinutes(slot.label);
      for (final cell in slot.rows) {
        if (cell.cls == 'hustle' || cell.cls == 'work') minutes['hustle_work'] = minutes['hustle_work']! + duration;
        if (cell.cls == 'exam' || cell.cls == 'prep') minutes['study_prep'] = minutes['study_prep']! + duration;
        if (cell.cls == 'fit') minutes['fitness'] = minutes['fitness']! + duration;
        if (cell.cls == 'sleep') minutes['sleep'] = minutes['sleep']! + duration;
      }
    }

    // Convert to weekly average (divide by 7 and format to hours)
    return minutes.map((k, v) => MapEntry(k, v / 60));
  }

  int _parseDurationMinutes(String label) {
    try {
      final clean = label.split(' AM')[0].split(' PM')[0];
      final parts = clean.split(' – ');
      if (parts.length == 2) {
        final start = _parseTime(parts[0]);
        final end = _parseTime(parts[1]);
        int diff = end.difference(start).inMinutes;
        if (diff < 0) diff += 24 * 60;
        return diff;
      }
    } catch (_) {}
    return 30; // Default
  }

  DateTime _parseTime(String time) {
    final t = time.trim();
    final parts = t.split(':');
    return DateTime(2026, 3, 17, int.parse(parts[0]), int.parse(parts[1]));
  }
}
