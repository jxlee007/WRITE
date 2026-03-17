import 'package:flutter/material.dart';
import '../../core/storage/storage_service.dart';
import '../../core/notifications/notification_service.dart';
import 'package:permission_handler/permission_handler.dart';

class SettingsProvider with ChangeNotifier {
  final StorageService _storage = StorageService.instance;
  final NotificationService _notifications = NotificationService.instance;

  bool _isNotifPermissionGranted = true;
  bool get isNotifPermissionGranted => _isNotifPermissionGranted;

  SettingsProvider() {
    _checkPermissions();
  }

  Future<void> _checkPermissions() async {
    final status = await Permission.notification.status;
    _isNotifPermissionGranted = status.isGranted;
    notifyListeners();
  }

  Future<void> requestPermissions() async {
    final status = await Permission.notification.request();
    _isNotifPermissionGranted = status.isGranted;
    notifyListeners();
  }

  // Getters
  bool get wakeUpEnabled => _storage.isWakeupNotifEnabled();
  bool get examEnabled => _storage.isExamNotifEnabled();
  bool get mindSyncEnabled => _storage.isMindSyncNotifEnabled();
  bool get streakRiskEnabled => _storage.isStreakNotifEnabled();

  bool get pomodoroSoundEnabled => _storage.isAlarmSoundEnabled();
  bool get pomodoroVibrationEnabled => _storage.isAlarmVibrationEnabled();
  bool get hapticsEnabled => _storage.isHapticsEnabled();

  TimeOfDay get wakeUpTime => _parseTime(_storage.getWakeupNotifTime());
  TimeOfDay get examTime => _parseTime(_storage.getExamNotifTime());
  TimeOfDay get mindSyncTime => _parseTime(_storage.getMindSyncNotifTime());

  // Setters
  Future<void> setWakeUpEnabled(bool value) async {
    await _storage.setWakeupNotif(value);
    if (value) {
      await _notifications.scheduleWakeUpAlarm(wakeUpTime);
    } else {
      await _notifications.cancelById(NotificationService.idWakeUp);
    }
    notifyListeners();
  }

  Future<void> setExamEnabled(bool value) async {
    await _storage.setExamNotif(value);
    if (value) {
      await _notifications.scheduleExamPrepReminder(examTime);
    } else {
      await _notifications.cancelById(NotificationService.idExamPrep);
    }
    notifyListeners();
  }

  Future<void> setMindSyncEnabled(bool value) async {
    await _storage.setMindSyncNotif(value);
    if (value) {
      await _notifications.scheduleMindSyncReminder(mindSyncTime);
    } else {
      await _notifications.cancelById(NotificationService.idMindSync);
    }
    notifyListeners();
  }

  Future<void> setStreakRiskEnabled(bool value) async {
    await _storage.setStreakNotif(value);
    if (value) {
      await _notifications.scheduleStreakRiskAlert();
    } else {
      await _notifications.cancelAll(); // Or just cancel streak
      // Actually cancelById(NotificationService.idStreak)
      await _notifications.cancelById(NotificationService.idStreak);
    }
    notifyListeners();
  }

  Future<void> setPomodoroSoundEnabled(bool value) async {
    await _storage.setAlarmSound(value);
    notifyListeners();
  }

  Future<void> setPomodoroVibrationEnabled(bool value) async {
    await _storage.setAlarmVibration(value);
    notifyListeners();
  }

  Future<void> setHapticsEnabled(bool value) async {
    await _storage.setHapticsEnabled(value);
    notifyListeners();
  }

  Future<void> setWakeUpTime(TimeOfDay time) async {
    final timeStr = _formatTime(time);
    await _storage.setWakeupNotifTime(timeStr);
    if (wakeUpEnabled) {
      await _notifications.scheduleWakeUpAlarm(time);
    }
    notifyListeners();
  }

  Future<void> setExamTime(TimeOfDay time) async {
    final timeStr = _formatTime(time);
    await _storage.setExamNotifTime(timeStr);
    if (examEnabled) {
      await _notifications.scheduleExamPrepReminder(time);
    }
    notifyListeners();
  }

  Future<void> setMindSyncTime(TimeOfDay time) async {
    final timeStr = _formatTime(time);
    await _storage.setMindSyncNotifTime(timeStr);
    if (mindSyncEnabled) {
      await _notifications.scheduleMindSyncReminder(time);
    }
    notifyListeners();
  }

  // Helpers
  TimeOfDay _parseTime(String timeString) {
    try {
      final parts = timeString.split(':');
      if (parts.length != 2) return const TimeOfDay(hour: 0, minute: 0);
      return TimeOfDay(hour: int.parse(parts[0]), minute: int.parse(parts[1]));
    } catch (_) {
      return const TimeOfDay(hour: 0, minute: 0);
    }
  }

  String _formatTime(TimeOfDay time) {
    final hour = time.hour.toString().padLeft(2, '0');
    final minute = time.minute.toString().padLeft(2, '0');
    return '$hour:$minute';
  }
}
