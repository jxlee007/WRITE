import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'settings_provider.dart';
import '../../core/storage/storage_service.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/theme_notifier.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:app_settings/app_settings.dart';

class SettingsSheet extends StatelessWidget {
  const SettingsSheet({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = context.watch<SettingsProvider>();
    final themeNotifier = context.watch<ThemeNotifier>();
    final isDark = themeNotifier.isDark;

    return Container(
      padding: const EdgeInsets.fromLTRB(24, 12, 24, 32),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Drag handle
          Center(
            child: Container(
              margin: const EdgeInsets.only(bottom: 24),
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: isDark ? Colors.white10 : Colors.black12,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          
          Flexible(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Settings',
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                      ),
                      IconButton(
                        onPressed: () => Navigator.pop(context),
                        icon: Icon(LucideIcons.x, color: isDark ? Colors.white70 : Colors.black45),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Permission Warning
                  if (!settings.isNotifPermissionGranted) ...[
                    _buildPermissionWarning(context, isDark),
                    const SizedBox(height: 24),
                  ],

                  // Daily Reminders Section
                  _buildSectionHeader(context, 'DAILY REMINDERS', isDark),
                  const SizedBox(height: 12),
                  _buildSettingTile(
                    context,
                    icon: LucideIcons.sunrise,
                    title: 'Wake-up Alarm',
                    subtitle: 'Consistency starts at dawn',
                    value: settings.wakeUpEnabled,
                    time: settings.wakeUpTime,
                    onToggle: (v) => settings.setWakeUpEnabled(v),
                    onTimeTap: () => _selectTime(context, settings.wakeUpTime, settings.setWakeUpTime),
                    isDark: isDark,
                  ),
                  _buildSettingTile(
                    context,
                    icon: LucideIcons.bookOpen,
                    title: 'Exam Prep',
                    subtitle: 'No more skipped sessions',
                    value: settings.examEnabled,
                    time: settings.examTime,
                    onToggle: (v) => settings.setExamEnabled(v),
                    onTimeTap: () => _selectTime(context, settings.examTime, settings.setExamTime),
                    isDark: isDark,
                  ),
                  _buildSettingTile(
                    context,
                    icon: LucideIcons.brainCircuit,
                    title: 'Mind Sync',
                    subtitle: 'Daily review reminder',
                    value: settings.mindSyncEnabled,
                    time: settings.mindSyncTime,
                    onToggle: (v) => settings.setMindSyncEnabled(v),
                    onTimeTap: () => _selectTime(context, settings.mindSyncTime, settings.setMindSyncTime),
                    isDark: isDark,
                  ),
                  _buildToggleTile(
                    context,
                    icon: LucideIcons.flame,
                    title: 'Streak Risk',
                    subtitle: 'Alert when chain is broken',
                    value: settings.streakRiskEnabled,
                    onToggle: (v) => settings.setStreakRiskEnabled(v),
                    isDark: isDark,
                  ),

                  const SizedBox(height: 32),

                  // Pomodoro Section
                  _buildSectionHeader(context, 'POMODORO ALARM', isDark),
                  const SizedBox(height: 12),
                  _buildToggleTile(
                    context,
                    icon: LucideIcons.volume2,
                    title: 'Timer Sound',
                    subtitle: 'Chime on completion',
                    value: settings.pomodoroSoundEnabled,
                    onToggle: (v) => settings.setPomodoroSoundEnabled(v),
                    isDark: isDark,
                  ),
                  _buildToggleTile(
                    context,
                    icon: LucideIcons.vibrate,
                    title: 'Vibration',
                    subtitle: 'Haptic feedback',
                    value: settings.pomodoroVibrationEnabled,
                    onToggle: (v) => settings.setPomodoroVibrationEnabled(v),
                    isDark: isDark,
                  ),

                  const SizedBox(height: 32),
                  
                  // Footer Metadata
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: Text(
                        'GoalFlow v${StorageService.instance.appVersion} · Build ${StorageService.instance.buildNumber}\nMade with intention',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 10,
                          letterSpacing: 0.5,
                          height: 1.5,
                          color: isDark ? Colors.white24 : Colors.black26,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPermissionWarning(BuildContext context, bool isDark) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.error.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.error.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          const Icon(LucideIcons.alertCircle, color: AppColors.error, size: 24),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Notifications Disabled',
                  style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.error),
                ),
                Text(
                  'Grant access to receive reminders.',
                  style: TextStyle(fontSize: 12, color: isDark ? Colors.white70 : Colors.black54),
                ),
              ],
            ),
          ),
          TextButton(
            onPressed: () => AppSettings.openAppSettings(),
            child: const Text('FIX', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.error)),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title, bool isDark) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 10,
        fontWeight: FontWeight.w800,
        letterSpacing: 1.2,
        color: isDark ? Colors.white38 : Colors.black38,
      ),
    );
  }

  Widget _buildSettingTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required TimeOfDay time,
    required Function(bool) onToggle,
    required VoidCallback onTimeTap,
    required bool isDark,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? Colors.white.withValues(alpha: 0.03) : Colors.black.withValues(alpha: 0.02),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Row(
        children: [
          Icon(icon, size: 20, color: value ? AppColors.emeraldPrimary : (isDark ? Colors.white38 : Colors.black38)),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: isDark ? Colors.white : Colors.black87,
                  ),
                ),
                Text(
                  subtitle,
                  style: TextStyle(fontSize: 11, color: isDark ? Colors.white38 : Colors.black38),
                ),
              ],
            ),
          ),
          if (value)
            GestureDetector(
              onTap: onTimeTap,
              child: Semantics(
                label: "Edit reminder time",
                button: true,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.emeraldPrimary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    time.format(context),
                    style: const TextStyle(
                      color: AppColors.emeraldPrimary,
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                    ),
                  ),
                ),
              ),
            ),
          const SizedBox(width: 12),
          CupertinoSwitch(
            value: value,
            onChanged: onToggle,
            activeTrackColor: AppColors.emeraldPrimary,
          ),
        ],
      ),
    );
  }

  Widget _buildToggleTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required Function(bool) onToggle,
    required bool isDark,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? Colors.white.withValues(alpha: 0.03) : Colors.black.withValues(alpha: 0.02),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Row(
        children: [
          Icon(icon, size: 20, color: value ? AppColors.emeraldPrimary : (isDark ? Colors.white38 : Colors.black38)),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: isDark ? Colors.white : Colors.black87,
                  ),
                ),
                Text(
                  subtitle,
                  style: TextStyle(fontSize: 11, color: isDark ? Colors.white38 : Colors.black38),
                ),
              ],
            ),
          ),
          CupertinoSwitch(
            value: value,
            onChanged: onToggle,
            activeTrackColor: AppColors.emeraldPrimary,
          ),
        ],
      ),
    );
  }

  Future<void> _selectTime(BuildContext context, TimeOfDay initialTime, Function(TimeOfDay) onSelected) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: initialTime,
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: AppColors.emeraldPrimary,
              onPrimary: Colors.white,
              onSurface: context.read<ThemeNotifier>().isDark ? Colors.white : Colors.black87,
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null) {
      onSelected(picked);
    }
  }
}
