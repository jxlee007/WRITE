import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/routine_slot.dart';
import '../models/slot_cell.dart';
import '../models/audit_item.dart';
import '../models/journal_entry.dart';
import '../utils/date_utils.dart';

class StorageService {
  static StorageService? _instance;
  static late SharedPreferences _prefs;

  StorageService._();

  static Future<StorageService> init() async {
    if (_instance == null) {
      _prefs = await SharedPreferences.getInstance();
      _instance = StorageService._();
      
      // Initialize metadata if first time
      if (_prefs.getString(_installDateKey) == null) {
        await _prefs.setString(_installDateKey, DateTime.now().toIso8601String());
      }
    }
    return _instance!;
  }

  static StorageService get instance {
    if (_instance == null) {
      throw Exception('StorageService not initialized. Call init() first.');
    }
    return _instance!;
  }

  static const String _darkModeKey = 'dark_mode';
  static const String _routineSlotsKey = 'routine_slots';
  static const String _streakKey = 'streak';
  static const String _auditDataKey = 'audit_data';

  static const String _firstLaunchKey = 'first_launch';
  static const String _alarmSoundKey = 'alarm_sound';
  static const String _alarmVibrationKey = 'alarm_vibration';

  static const String _notifWakeupOnKey = 'notif_wakeup_on';
  static const String _notifExamOnKey = 'notif_exam_on';
  static const String _notifMindSyncOnKey = 'notif_mindsync_on';
  static const String _notifStreakOnKey = 'notif_streak_on';

  static const String _notifWakeupTimeKey = 'notif_wakeup_time';
  static const String _notifExamTimeKey = 'notif_exam_time';
  static const String _notifMindSyncTimeKey = 'notif_mind_sync_time';
  static const String _hapticsOnKey = 'haptics_on';
  
  static const String _installDateKey = 'app_install_date_meta';

  static String oneOffTasksKey(DateTime date) => 'oneoff_tasks_${AppDateUtils.formatDate(date)}';
  static String habitOrderKey(DateTime date) => 'habit_order_${AppDateUtils.formatDate(date)}';

  // First Launch
  bool isFirstLaunch() => _prefs.getBool(_firstLaunchKey) ?? true;
  Future<void> setFirstLaunch(bool value) async => _prefs.setBool(_firstLaunchKey, value);

  // Theme
  Future<bool> getDarkMode() async {
    try {
      return _prefs.getBool(_darkModeKey) ?? false;
    } catch (_) {
      return false;
    }
  }
  Future<void> setDarkMode(bool value) async => _prefs.setBool(_darkModeKey, value);

  // Synchronous access getter currently used by ThemeNotifier
  bool get isDarkMode => _prefs.getBool(_darkModeKey) ?? false;

  // Routine
  Future<List<RoutineSlot>> getRoutineSlots() async {
    try {
      final String? jsonString = _prefs.getString(_routineSlotsKey);
      if (jsonString != null && jsonString.isNotEmpty) {
        final List<dynamic> decoded = jsonDecode(jsonString) as List<dynamic>;
        return decoded.map((e) => RoutineSlot.fromJson(e as Map<String, dynamic>)).toList();
      }
    } catch (e) {
      debugPrint('Storage Error (getRoutineSlots): $e');
    }
    return _defaultSlots;
  }

  Future<void> saveRoutineSlots(List<RoutineSlot> slots) async {
    try {
      final String jsonString = jsonEncode(slots.map((e) => e.toJson()).toList());
      await _prefs.setString(_routineSlotsKey, jsonString);
    } catch (e) {
      debugPrint('Storage Error (saveRoutineSlots): $e');
    }
  }

  // Completions (per day)
  Future<Map<int, bool>> getCompletions(DateTime date) async {
    try {
      final String key = AppDateUtils.completionsKey(date);
      final String? jsonString = _prefs.getString(key);
      if (jsonString != null && jsonString.isNotEmpty) {
        final Map<String, dynamic> decoded = jsonDecode(jsonString) as Map<String, dynamic>;
        return decoded.map((k, v) => MapEntry(int.parse(k), v as bool));
      }
    } catch (e) {
      debugPrint('Storage Error (getCompletions): $e');
    }
    return {};
  }

  Future<void> saveCompletions(DateTime date, Map<int, bool> completions) async {
    try {
      final String key = AppDateUtils.completionsKey(date);
      final Map<String, dynamic> stringKeyedMap = completions.map((k, v) => MapEntry(k.toString(), v));
      await _prefs.setString(key, jsonEncode(stringKeyedMap));
    } catch (e) {
      debugPrint('Storage Error (saveCompletions): $e');
    }
  }

  // Streak Logic
  Future<int> getStreak() async {
    try {
      final streak = _prefs.getInt(_streakKey) ?? 0;
      final today = DateTime.now();
      final yesterday = today.subtract(const Duration(days: 1));
      
      // If today is not submitted AND yesterday was not submitted, reset streak
      // Wait, more accurate: if we haven't submitted today, check if yesterday was submitted.
      // If yesterday was NOT submitted AND it's a new day, streak is broken.
      bool todaySubmitted = await isSubmitted(today);
      bool yesterdaySubmitted = await isSubmitted(yesterday);
      
      if (!todaySubmitted && !yesterdaySubmitted) {
        // Technically if it's 4 AM today and yesterday wasn't submitted, streak is 0.
        // But if yesterday WAS submitted, current streak stands.
        return 0; 
      }
      return streak;
    } catch (_) {
      return 0;
    }
  }

  Future<void> setStreak(int value) async => _prefs.setInt(_streakKey, value);

  // Audit
  Future<Map<String, List<AuditItem>>> getAuditData() async {
    try {
      final String? jsonString = _prefs.getString(_auditDataKey);
      if (jsonString != null && jsonString.isNotEmpty) {
        final Map<String, dynamic> decoded = jsonDecode(jsonString) as Map<String, dynamic>;
        return decoded.map(
          (k, v) => MapEntry(
            k,
            (v as List<dynamic>).map((e) => AuditItem.fromJson(e as Map<String, dynamic>)).toList(),
          ),
        );
      }
    } catch (e) {
      debugPrint('Storage Error (getAuditData): $e');
    }
    return {};
  }

  Future<void> saveAuditData(Map<String, List<AuditItem>> data) async {
    try {
      final Map<String, dynamic> encoded = data.map(
        (k, v) => MapEntry(k, v.map((e) => e.toJson()).toList()),
      );
      await _prefs.setString(_auditDataKey, jsonEncode(encoded));
    } catch (e) {
      debugPrint('Storage Error (saveAuditData): $e');
    }
  }

  // Journal
  Future<JournalEntry?> getJournal(DateTime date) async {
    try {
      final String key = 'journal_${AppDateUtils.formatDate(date)}';
      final String? jsonString = _prefs.getString(key);
      if (jsonString != null && jsonString.isNotEmpty) {
        return JournalEntry.fromJson(jsonDecode(jsonString) as Map<String, dynamic>);
      }
    } catch (e) {
      debugPrint('Storage Error (getJournal): $e');
    }
    return null;
  }

  Future<void> saveJournal(JournalEntry entry) async {
    try {
      final String key = 'journal_${AppDateUtils.formatDate(entry.date)}';
      await _prefs.setString(key, jsonEncode(entry.toJson()));
    } catch (e) {
      debugPrint('Storage Error (saveJournal): $e');
    }
  }

  // Submitted flag
  Future<bool> isSubmitted(DateTime date) async {
    try {
      final String key = 'submitted_${AppDateUtils.formatDate(date)}';
      return _prefs.getBool(key) ?? false;
    } catch (_) {
      return false;
    }
  }

  Future<void> setSubmitted(DateTime date, bool value) async {
    try {
      final String key = 'submitted_${AppDateUtils.formatDate(date)}';
      await _prefs.setBool(key, value);
    } catch (e) {
      debugPrint('Storage Error (setSubmitted): $e');
    }
  }

  // One-off Tasks
  Future<List<Map<String, dynamic>>> getOneOffTasks(DateTime date) async {
    try {
      final String key = oneOffTasksKey(date);
      final String? jsonString = _prefs.getString(key);
      if (jsonString != null && jsonString.isNotEmpty) {
        final List<dynamic> decoded = jsonDecode(jsonString) as List<dynamic>;
        return decoded.map((e) => e as Map<String, dynamic>).toList();
      }
    } catch (e) {
      debugPrint('Storage Error (getOneOffTasks): $e');
    }
    return [];
  }

  Future<void> saveOneOffTasks(DateTime date, List<Map<String, dynamic>> tasks) async {
    try {
      final String key = oneOffTasksKey(date);
      await _prefs.setString(key, jsonEncode(tasks));
    } catch (e) {
      debugPrint('Storage Error (saveOneOffTasks): $e');
    }
  }

  // Habit Reordering
  Future<List<int>> getHabitOrder(DateTime date) async {
    try {
      final String key = habitOrderKey(date);
      final List<String>? order = _prefs.getStringList(key);
      if (order != null) {
        return order.map((e) => int.parse(e)).toList();
      }
    } catch (_) {}
    return [];
  }

  Future<void> saveHabitOrder(DateTime date, List<int> order) async {
    try {
      final String key = habitOrderKey(date);
      await _prefs.setStringList(key, order.map((e) => e.toString()).toList());
    } catch (_) {}
  }

  // Alarms
  bool isAlarmSoundEnabled() => _prefs.getBool(_alarmSoundKey) ?? true;
  Future<void> setAlarmSound(bool value) async => _prefs.setBool(_alarmSoundKey, value);

  bool isAlarmVibrationEnabled() => _prefs.getBool(_alarmVibrationKey) ?? true;
  Future<void> setAlarmVibration(bool value) async => _prefs.setBool(_alarmVibrationKey, value);

  // Notification Toggles
  bool isWakeupNotifEnabled() => _prefs.getBool(_notifWakeupOnKey) ?? true;
  Future<void> setWakeupNotif(bool value) async => _prefs.setBool(_notifWakeupOnKey, value);

  bool isExamNotifEnabled() => _prefs.getBool(_notifExamOnKey) ?? true;
  Future<void> setExamNotif(bool value) async => _prefs.setBool(_notifExamOnKey, value);

  bool isMindSyncNotifEnabled() => _prefs.getBool(_notifMindSyncOnKey) ?? true;
  Future<void> setMindSyncNotif(bool value) async => _prefs.setBool(_notifMindSyncOnKey, value);

  bool isStreakNotifEnabled() => _prefs.getBool(_notifStreakOnKey) ?? true;
  Future<void> setStreakNotif(bool value) async => _prefs.setBool(_notifStreakOnKey, value);

  // Notification Times (Stored as "HH:mm")
  String getWakeupNotifTime() => _prefs.getString(_notifWakeupTimeKey) ?? "04:30";
  Future<void> setWakeupNotifTime(String value) async => _prefs.setString(_notifWakeupTimeKey, value);

  String getExamNotifTime() => _prefs.getString(_notifExamTimeKey) ?? "19:00";
  Future<void> setExamNotifTime(String value) async => _prefs.setString(_notifExamTimeKey, value);

  String getMindSyncNotifTime() => _prefs.getString(_notifMindSyncTimeKey) ?? "21:00";
  Future<void> setMindSyncNotifTime(String value) async => _prefs.setString(_notifMindSyncTimeKey, value);

  bool isHapticsEnabled() => _prefs.getBool(_hapticsOnKey) ?? true;
  Future<void> setHapticsEnabled(bool value) async => _prefs.setBool(_hapticsOnKey, value);

  // App Metadata
  String get appVersion => appVersionConst;
  String get buildNumber => buildNumberConst;
  static const String appVersionConst = '1.0.0';
  static const String buildNumberConst = '1';

  DateTime get firstInstallDate {
    final dateStr = _prefs.getString(_installDateKey);
    return dateStr != null ? DateTime.parse(dateStr) : DateTime.now();
  }

  // Define default slots exactly as requested
  static final List<RoutineSlot> _defaultSlots = [
    RoutineSlot(
      label: "10:00 PM – 5:00 AM",
      rows: [
        SlotCell(cls:"sleep",text:"Sleep",sub:"7 hrs"), SlotCell(cls:"sleep",text:"Sleep",sub:"7 hrs"), SlotCell(cls:"sleep",text:"Sleep",sub:"7 hrs"), SlotCell(cls:"sleep",text:"Sleep",sub:"7 hrs"), SlotCell(cls:"sleep",text:"Sleep",sub:"7 hrs"), SlotCell(cls:"sleep",text:"Sleep",sub:"7.5 hrs"), SlotCell(cls:"sleep",text:"Sleep",sub:"7.5 hrs"),
      ],
    ),
    RoutineSlot(
      label: "5:00 – 5:15 AM",
      rows: [
        SlotCell(cls:"sleep",text:"Wake ritual",sub:"hydrate"), SlotCell(cls:"sleep",text:"Wake ritual",sub:"hydrate"), SlotCell(cls:"sleep",text:"Wake ritual",sub:"hydrate"), SlotCell(cls:"sleep",text:"Wake ritual",sub:"hydrate"), SlotCell(cls:"sleep",text:"Wake ritual",sub:"hydrate"), SlotCell(cls:"sleep",text:"Wake",sub:"5:30 AM"), SlotCell(cls:"sleep",text:"Wake",sub:"5:30 AM"),
      ],
    ),
    RoutineSlot(
      label: "5:15 – 6:00 AM",
      rows: [
        SlotCell(cls:"hustle",text:"Side hustle",sub:"deep work"), SlotCell(cls:"hustle",text:"Side hustle",sub:"deep work"), SlotCell(cls:"hustle",text:"Side hustle",sub:"deep work"), SlotCell(cls:"hustle",text:"Side hustle",sub:"deep work"), SlotCell(cls:"hustle",text:"Side hustle",sub:"deep work"), SlotCell(cls:"write",text:"Writing",sub:"long session"), SlotCell(cls:"write",text:"Writing",sub:"+ journal"),
      ],
    ),
    RoutineSlot(
      label: "6:00 – 6:45 AM",
      rows: [
        SlotCell(cls:"write",text:"Writing",sub:"30–40 min"), SlotCell(cls:"write",text:"Writing",sub:"30–40 min"), SlotCell(cls:"write",text:"Writing",sub:"30–40 min"), SlotCell(cls:"write",text:"Writing",sub:"30–40 min"), SlotCell(cls:"write",text:"Writing",sub:"30–40 min"), SlotCell(cls:"hustle",text:"Big hustle",sub:"2–3 hrs"), SlotCell(cls:"hustle",text:"Big hustle",sub:"2–3 hrs"),
      ],
    ),
    RoutineSlot(
      label: "6:45 – 7:45 AM",
      rows: [
        SlotCell(cls:"fit",text:"Fitness",sub:"gym / run"), SlotCell(cls:"fit",text:"Fitness",sub:"gym / run"), SlotCell(cls:"fit",text:"Fitness",sub:"gym / run"), SlotCell(cls:"fit",text:"Fitness",sub:"gym / run"), SlotCell(cls:"fit",text:"Fitness",sub:"gym / run"), SlotCell(cls:"hustle",text:"Big hustle",sub:"continued"), SlotCell(cls:"hustle",text:"Big hustle",sub:"continued"),
      ],
    ),
    RoutineSlot(
      label: "7:45 – 9:00 AM",
      rows: [
        SlotCell(cls:"prep",text:"Prep + commute",sub:"GK podcast"), SlotCell(cls:"prep",text:"Prep + commute",sub:"GK podcast"), SlotCell(cls:"prep",text:"Prep + commute",sub:"GK podcast"), SlotCell(cls:"prep",text:"Prep + commute",sub:"GK podcast"), SlotCell(cls:"prep",text:"Prep + commute",sub:"GK podcast"), SlotCell(cls:"fit",text:"Fitness",sub:"outdoor / gym"), SlotCell(cls:"fit",text:"Fitness",sub:"outdoor / gym"),
      ],
    ),
    RoutineSlot(
      label: "9:00 AM – 6:00 PM",
      rows: [
        SlotCell(cls:"work",text:"Job shift",sub:"9 hrs"), SlotCell(cls:"work",text:"Job shift",sub:"9 hrs"), SlotCell(cls:"work",text:"Job shift",sub:"9 hrs"), SlotCell(cls:"work",text:"Job shift",sub:"9 hrs"), SlotCell(cls:"work",text:"Job shift",sub:"9 hrs"), SlotCell(cls:"exam",text:"Mock test",sub:"NQT / CMAT"), SlotCell(cls:"exam",text:"Weak area",sub:"revision"),
      ],
    ),
    RoutineSlot(
      label: "6:00 – 7:00 PM",
      rows: [
        SlotCell(cls:"chore",text:"Chores",sub:"decompress"), SlotCell(cls:"chore",text:"Chores",sub:"decompress"), SlotCell(cls:"chore",text:"Chores",sub:"decompress"), SlotCell(cls:"chore",text:"Chores",sub:"decompress"), SlotCell(cls:"chore",text:"Chores",sub:"decompress"), SlotCell(cls:"social",text:"Social",sub:"friends / family"), SlotCell(cls:"chore",text:"Diet prep",sub:"batch cook"),
      ],
    ),
    RoutineSlot(
      label: "7:00 – 8:30 PM",
      rows: [
        SlotCell(cls:"exam",text:"Exam prep",sub:"Quant"), SlotCell(cls:"exam",text:"Exam prep",sub:"Logic"), SlotCell(cls:"exam",text:"Exam prep",sub:"Verbal"), SlotCell(cls:"exam",text:"Exam prep",sub:"GK / CA"), SlotCell(cls:"exam",text:"Exam prep",sub:"Quant DI"), SlotCell(cls:"social",text:"Social",sub:"continued"), SlotCell(cls:"chore",text:"Weekly plan",sub:"+ admin"),
      ],
    ),
    RoutineSlot(
      label: "8:30 – 9:30 PM",
      rows: [
        SlotCell(cls:"hustle",text:"Hustle sprint",sub:"+ task prep"), SlotCell(cls:"hustle",text:"Hustle sprint",sub:"+ task prep"), SlotCell(cls:"hustle",text:"Hustle sprint",sub:"+ task prep"), SlotCell(cls:"hustle",text:"Hustle sprint",sub:"+ task prep"), SlotCell(cls:"hustle",text:"Hustle sprint",sub:"+ task prep"), SlotCell(cls:"free",text:"Free time",sub:"leisure"), SlotCell(cls:"free",text:"Free time",sub:"leisure"),
      ],
    ),
    RoutineSlot(
      label: "9:30 – 10:00 PM",
      rows: [
        SlotCell(cls:"sleep",text:"Wind-down",sub:"book / stretch"), SlotCell(cls:"sleep",text:"Wind-down",sub:"book / stretch"), SlotCell(cls:"sleep",text:"Wind-down",sub:"book / stretch"), SlotCell(cls:"sleep",text:"Wind-down",sub:"book / stretch"), SlotCell(cls:"sleep",text:"Wind-down",sub:"book / stretch"), SlotCell(cls:"sleep",text:"Wind-down",sub:"screens off"), SlotCell(cls:"sleep",text:"Wind-down",sub:"screens off"),
      ],
    ),
  ];
}
