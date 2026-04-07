import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import '../../features/settings/settings_provider.dart';

class HapticService {
  static Future<void> habitToggle(BuildContext context) async {
    if (!context.read<SettingsProvider>().hapticsEnabled) return;
    await HapticFeedback.lightImpact();
  }

  static Future<void> habitComplete(BuildContext context) async {
    if (!context.read<SettingsProvider>().hapticsEnabled) return;
    await HapticFeedback.mediumImpact();
  }

  static Future<void> daySubmitted(BuildContext context) async {
    if (!context.read<SettingsProvider>().hapticsEnabled) return;
    await HapticFeedback.heavyImpact();
  }

  static Future<void> streakMilestone(BuildContext context) async {
    if (!context.read<SettingsProvider>().hapticsEnabled) return;
    await HapticFeedback.selectionClick();
    await Future.delayed(const Duration(milliseconds: 100));
    await HapticFeedback.mediumImpact();
    await Future.delayed(const Duration(milliseconds: 100));
    await HapticFeedback.heavyImpact();
  }

  static Future<void> timerStart(BuildContext context) async {
    if (!context.read<SettingsProvider>().hapticsEnabled) return;
    await HapticFeedback.selectionClick();
  }

  static Future<void> timerDone(BuildContext context) async {
    await streakMilestone(context);
  }

  static Future<void> tabSwitch(BuildContext context) async {
    if (!context.read<SettingsProvider>().hapticsEnabled) return;
    await HapticFeedback.selectionClick();
  }

  static Future<void> reload(BuildContext context) async {
    if (!context.read<SettingsProvider>().hapticsEnabled) return;
    await HapticFeedback.mediumImpact();
  }

  static Future<void> error(BuildContext context) async {
    if (!context.read<SettingsProvider>().hapticsEnabled) return;
    await HapticFeedback.vibrate();
  }
}
