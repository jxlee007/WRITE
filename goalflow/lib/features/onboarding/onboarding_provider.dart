import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/storage/storage_service.dart';
import '../../core/notifications/notification_service.dart';
import '../../core/models/routine_slot.dart';
import '../../core/models/slot_cell.dart';

class OnboardingProvider extends ChangeNotifier {
  final StorageService _storage = StorageService.instance;
  final NotificationService _notifications = NotificationService.instance;

  TimeOfDay _wakeTime = const TimeOfDay(hour: 5, minute: 0);
  String _jobShift = '9AM–5PM';
  final Set<String> _focusAreas = {
    'Side hustle',
    'Writing',
    'Fitness',
    'Exam prep',
    'Sleep quality',
    'Life & chores',
  };

  TimeOfDay get wakeTime => _wakeTime;
  String get jobShift => _jobShift;
  Set<String> get focusAreas => _focusAreas;

  void setWakeTime(TimeOfDay time) {
    _wakeTime = time;
    notifyListeners();
  }

  void setJobShift(String shift) {
    _jobShift = shift;
    notifyListeners();
  }

  void toggleFocusArea(String area) {
    if (_focusAreas.contains(area)) {
      _focusAreas.remove(area);
    } else {
      _focusAreas.add(area);
    }
    notifyListeners();
  }

  Future<void> finishOnboarding(BuildContext context) async {
    final slots = generateRoutine();
    await _storage.saveRoutineSlots(slots);
    await _storage.setFirstLaunch(false);

    // Schedule notifications
    await _notifications.scheduleWakeUpAlarm(_wakeTime);
    if (_focusAreas.contains('Exam prep')) {
      await _notifications.scheduleExamPrepReminder(const TimeOfDay(hour: 18, minute: 0));
    }
    await _notifications.scheduleMindSyncReminder(const TimeOfDay(hour: 21, minute: 0));

    if (context.mounted) {
      context.go('/daily');
    }
  }

  List<RoutineSlot> generateRoutine() {
    final List<RoutineSlot> slots = [];
    
    // Helper to add duration to TimeOfDay
    TimeOfDay addMinutes(TimeOfDay time, int minutes) {
      final int totalMinutes = time.hour * 60 + time.minute + minutes;
      return TimeOfDay(hour: (totalMinutes ~/ 60) % 24, minute: totalMinutes % 60);
    }

    String formatTime(TimeOfDay time) {
      final hour = time.hourOfPeriod == 0 ? 12 : time.hourOfPeriod;
      final period = time.period == DayPeriod.am ? 'AM' : 'PM';
      return '$hour:${time.minute.toString().padLeft(2, '0')} $period';
    }

    String formatRange(TimeOfDay start, TimeOfDay end) {
      return '${formatTime(start)} – ${formatTime(end)}';
    }

    // Parse Job Shift
    TimeOfDay? jobStart;
    TimeOfDay? jobEnd;
    bool noJob = _jobShift == 'No job';
    
    if (!noJob && _jobShift != 'WFH flexible') {
      try {
        final parts = _jobShift.split('–');
        if (parts.length == 2) {
          jobStart = _parseShiftTime(parts[0]);
          jobEnd = _parseShiftTime(parts[1]);
        }
      } catch (e) {
        debugPrint('Error parsing job shift: $e');
      }
    }

    // Default to 9-5 if parsing fails or flexible
    final actualStart = jobStart ?? const TimeOfDay(hour: 9, minute: 0);
    final actualEnd = jobEnd ?? const TimeOfDay(hour: 17, minute: 0);

    // Slots Generation
    
    // Slot 1: Wake ritual
    final t1 = _wakeTime;
    final t2 = addMinutes(t1, 15);
    slots.add(RoutineSlot(
      label: formatRange(t1, t2),
      rows: List.generate(7, (_) => SlotCell(cls: 'sleep', text: 'Wake ritual', sub: 'hydrate')),
    ));

    // Slot 2: Side hustle or Morning block
    final t3 = addMinutes(t2, 45);
    bool hasHustle = _focusAreas.contains('Side hustle');
    slots.add(RoutineSlot(
      label: formatRange(t2, t3),
      rows: List.generate(7, (_) => SlotCell(
        cls: hasHustle ? 'hustle' : 'prep',
        text: hasHustle ? 'Side hustle' : 'Morning block',
        sub: hasHustle ? 'deep work' : 'prep',
      )),
    ));

    // Slot 3: Writing or Category
    final t4 = addMinutes(t3, 45);
    bool hasWriting = _focusAreas.contains('Writing');
    slots.add(RoutineSlot(
      label: formatRange(t3, t4),
      rows: List.generate(7, (_) => SlotCell(
        cls: hasWriting ? 'write' : 'prep',
        text: hasWriting ? 'Writing' : 'Morning routine',
        sub: hasWriting ? '30–40 min' : 'prep',
      )),
    ));

    // Slot 4: Fitness or Morning prep
    final t5 = addMinutes(t4, 45);
    bool hasFitness = _focusAreas.contains('Fitness');
    slots.add(RoutineSlot(
      label: formatRange(t4, t5),
      rows: List.generate(7, (_) => SlotCell(
        cls: hasFitness ? 'fit' : 'prep',
        text: hasFitness ? 'Fitness' : 'Morning prep',
        sub: hasFitness ? 'gym / movement' : 'prep',
      )),
    ));

    // Slot 5: Morning prep + commute
    final t6 = noJob ? addMinutes(t5, 90) : actualStart;
    slots.add(RoutineSlot(
      label: formatRange(t5, t6),
      rows: List.generate(7, (_) => SlotCell(cls: 'prep', text: 'Prep + commute', sub: 'GK podcast')),
    ));

    // Slot 6: Job shift or Extra Hustle
    TimeOfDay postShiftStart;
    if (noJob) {
      final extraHustleEnd = addMinutes(t6, 120);
      slots.add(RoutineSlot(
        label: formatRange(t6, extraHustleEnd),
        rows: List.generate(7, (_) => SlotCell(cls: 'hustle', text: 'Creative block', sub: '2-hour sprint')),
      ));
      postShiftStart = extraHustleEnd;
    } else {
      slots.add(RoutineSlot(
        label: formatRange(actualStart, actualEnd),
        rows: List.generate(7, (_) => SlotCell(cls: 'work', text: 'Job shift', sub: 'Focus time')),
      ));
      postShiftStart = actualEnd;
    }

    // Slot 7: Chores / decompress (starts shift end + 60)
    final t7 = addMinutes(postShiftStart, 60);
    final t8 = addMinutes(t7, 60);
    slots.add(RoutineSlot(
      label: formatRange(t7, t8),
      rows: List.generate(7, (_) => SlotCell(cls: 'chore', text: 'Chores', sub: 'decompress')),
    ));

    // Slot 8: Exam prep or Hustle sprint (starts shift end + 120)
    final t9 = addMinutes(postShiftStart, 120);
    final t10 = addMinutes(t9, 90);
    bool hasExam = _focusAreas.contains('Exam prep');
    slots.add(RoutineSlot(
      label: formatRange(t9, t10),
      rows: List.generate(7, (_) => SlotCell(
        cls: hasExam ? 'exam' : 'hustle',
        text: hasExam ? 'Exam prep' : 'Side hustle sprint',
        sub: hasExam ? 'revision' : 'sprint',
      )),
    ));

    // Slot 9: Hustle sprint (starts shift end + 210)
    final t11 = addMinutes(postShiftStart, 210);
    final t12 = addMinutes(t11, 60);
    slots.add(RoutineSlot(
      label: formatRange(t11, t12),
      rows: List.generate(7, (_) => SlotCell(cls: 'hustle', text: 'Hustle sprint', sub: 'final push')),
    ));

    // Slot 10: Wind-down
    final t13 = const TimeOfDay(hour: 21, minute: 30);
    final t14 = const TimeOfDay(hour: 22, minute: 0);
    slots.add(RoutineSlot(
      label: formatRange(t13, t14),
      rows: List.generate(7, (_) => SlotCell(cls: 'sleep', text: 'Wind-down', sub: 'No screens')),
    ));

    // Slot 11: Sleep
    slots.add(RoutineSlot(
      label: formatRange(t14, _wakeTime),
      rows: List.generate(7, (_) => SlotCell(cls: 'sleep', text: 'Sleep', sub: 'Restoration')),
    ));

    return slots;
  }

  TimeOfDay _parseShiftTime(String timeStr) {
    final clean = timeStr.trim().toUpperCase();
    final isPM = clean.contains('PM');
    final isAM = clean.contains('AM');
    final timePart = clean.replaceAll('AM', '').replaceAll('PM', '').trim();
    
    int hour = 0;
    int minute = 0;
    
    if (timePart.contains(':')) {
      final parts = timePart.split(':');
      hour = int.parse(parts[0]);
      minute = int.parse(parts[1]);
    } else {
      hour = int.parse(timePart);
    }
    
    if (isPM && hour < 12) hour += 12;
    if (isAM && hour == 12) hour = 0;
    
    return TimeOfDay(hour: hour, minute: minute);
  }
}
