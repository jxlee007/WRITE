import 'package:flutter/material.dart';
import '../../core/storage/storage_service.dart';
import '../../core/utils/date_utils.dart';

class CalendarProvider extends ChangeNotifier {
  DateTime _viewDate = DateTime.now();
  int _streak = 0;
  Map<String, bool> _submissionMap = {};
  Map<String, double> _weeklyVelocity = {};
  bool _isLoading = false;

  CalendarProvider() {
    _init();
  }

  DateTime get viewDate => _viewDate;
  int get streak => _streak;
  Map<String, bool> get submissionMap => _submissionMap;
  Map<String, double> get weeklyVelocity => _weeklyVelocity;
  bool get isLoading => _isLoading;

  Future<void> _init() async {
    _streak = await StorageService.instance.getStreak();
    await _loadMonthData();
  }

  Future<void> _loadMonthData() async {
    _isLoading = true;
    notifyListeners();

    final year = _viewDate.year;
    final month = _viewDate.month;
    final daysInMonth = DateUtils.getDaysInMonth(year, month);

    final List<Future<void>> futures = [];
    final Map<String, bool> tempMap = {};

    for (int day = 1; day <= daysInMonth; day++) {
      final date = DateTime(year, month, day);
      futures.add(
        StorageService.instance.isSubmitted(date).then((value) {
          tempMap[AppDateUtils.formatDate(date)] = value;
        }),
      );
    }

    await Future.wait(futures);
    _submissionMap = tempMap;
    _calculateVelocity();

    _isLoading = false;
    notifyListeners();
  }

  void _calculateVelocity() {
    final year = _viewDate.year;
    final month = _viewDate.month;
    final daysInMonth = DateUtils.getDaysInMonth(year, month);
    
    // We'll divide the month into 4 segments (Wk 1-4) for the velocity display
    final Map<String, double> velocities = {};
    
    for (int week = 0; week < 4; week++) {
      int startDay = (week * 7) + 1;
      int endDay = (week == 3) ? daysInMonth : (week + 1) * 7;
      
      int submittedCount = 0;
      int totalDays = endDay - startDay + 1;
      
      for (int day = startDay; day <= endDay; day++) {
        final dateKey = AppDateUtils.formatDate(DateTime(year, month, day));
        if (_submissionMap[dateKey] == true) {
          submittedCount++;
        }
      }
      
      velocities['Wk ${week + 1}'] = (submittedCount / totalDays);
    }
    
    _weeklyVelocity = velocities;
  }

  void nextMonth() {
    _viewDate = DateTime(_viewDate.year, _viewDate.month + 1);
    _loadMonthData();
  }

  void prevMonth() {
    _viewDate = DateTime(_viewDate.year, _viewDate.month - 1);
    _loadMonthData();
  }

  void goToToday() {
    _viewDate = DateTime.now();
    _loadMonthData();
  }
}
