import 'dart:async';
import 'package:flutter/material.dart';
import '../../core/models/journal_entry.dart';
import '../../core/storage/storage_service.dart';
import '../../core/services/submit_notifier.dart';
import '../../core/feedback/toast_service.dart';
import '../../core/feedback/haptic_service.dart';

class JournalProvider extends ChangeNotifier {
  final StorageService _storage = StorageService.instance;
  final SubmitNotifier _submitNotifier;
  
  final wentWellController = TextEditingController();
  final couldImproveController = TextEditingController();
  final tomorrowGoalController = TextEditingController();
  
  bool isSubmitted = false;
  bool showNudge = false;
  int streak = 0;
  DateTime today = DateTime.now();
  Timer? _nudgeTimer;

  JournalProvider(this._submitNotifier) {
    _init();
  }

  Future<void> _init() async {
    isSubmitted = await _storage.isSubmitted(today);
    streak = await _storage.getStreak();
    
    if (isSubmitted) {
      final entry = await _storage.getJournal(today);
      if (entry != null) {
        wentWellController.text = entry.wentWell;
        couldImproveController.text = entry.couldImprove;
        tomorrowGoalController.text = entry.tomorrowGoal;
      }
    } else {
      _checkNudgeVisibility();
      // Setup listeners to dismiss nudge on typing
      wentWellController.addListener(_onTyping);
      couldImproveController.addListener(_onTyping);
      tomorrowGoalController.addListener(_onTyping);
    }
    notifyListeners();
  }

  void _onTyping() {
    if (showNudge) {
      showNudge = false;
      notifyListeners();
    }
  }

  void _checkNudgeVisibility() {
    final now = DateTime.now();
    // Show nudge if after 8 PM (20:00) and not submitted
    if (now.hour >= 20 && !isSubmitted) {
      showNudge = true;
    } else if (!isSubmitted) {
      // Re-check every minute if before 8 PM
      _nudgeTimer?.cancel();
      _nudgeTimer = Timer(const Duration(minutes: 1), _checkNudgeVisibility);
    }
  }

  void dismissNudge() {
    showNudge = false;
    notifyListeners();
  }

  Future<void> refresh() async {
    today = DateTime.now();
    await _init();
  }

  Future<void> handleSubmitDay(BuildContext context) async {
    if (wentWellController.text.isEmpty && 
        couldImproveController.text.isEmpty && 
        tomorrowGoalController.text.isEmpty) {
      ToastService.error('Please fill at least one field.');
      return;
    }

    final entry = JournalEntry(
      wentWell: wentWellController.text,
      couldImprove: couldImproveController.text,
      tomorrowGoal: tomorrowGoalController.text,
      date: today,
    );

    await _storage.saveJournal(entry);
    
    // Increment streak
    streak += 1;
    await _storage.setStreak(streak);
    
    // Set submitted
    await _storage.setSubmitted(today, true);
    isSubmitted = true;
    
    // Notify global state
    await _submitNotifier.notifySubmit();
    
    if (!context.mounted) return;
    HapticService.daySubmitted(context);

    // Check for milestone haptic feedback
    final milestones = [1, 3, 7, 14, 21, 30];
    if (milestones.contains(streak) || (streak > 30 && streak % 10 == 0)) {
      HapticService.streakMilestone(context);
    }

    ToastService.streak('$streak day streak — keep going!');
    
    notifyListeners();
  }

  @override
  void dispose() {
    wentWellController.removeListener(_onTyping);
    couldImproveController.removeListener(_onTyping);
    tomorrowGoalController.removeListener(_onTyping);
    wentWellController.dispose();
    couldImproveController.dispose();
    tomorrowGoalController.dispose();
    _nudgeTimer?.cancel();
    super.dispose();
  }
}
