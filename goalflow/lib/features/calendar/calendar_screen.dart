import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:intl/intl.dart';
import 'calendar_provider.dart';
import '../../core/storage/storage_service.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/theme_notifier.dart';
import '../../widgets/empty_states/empty_calendar_month.dart';
import '../../core/motivational/motivation_engine.dart';

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => CalendarProvider(),
      child: const _CalendarScreenContent(),
    );
  }
}

class _CalendarScreenContent extends StatelessWidget {
  const _CalendarScreenContent();

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<CalendarProvider>();
    final themeNotifier = context.watch<ThemeNotifier>();
    final isDark = themeNotifier.isDark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.bgDark : AppColors.bgLight,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: Icon(
                      LucideIcons.chevronLeft,
                      color: isDark ? Colors.white : Colors.black87,
                    ),
                  ),
                  const Expanded(
                    child: Center(
                      child: Text(
                        'Consistency Map',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Center(
                      child: Text(
                        MotivationEngine.getDailyGreeting(
                          DateTime.now().hour,
                          provider.streak,
                        ),
                        style: const TextStyle(
                          fontSize: 12,
                          color: Colors.grey,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Streak Hero Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppColors.emeraldPrimary, Color(0xFF059669)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(32),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.emeraldPrimary.withValues(alpha: 0.3),
                        blurRadius: 20,
                        offset: const Offset(0, 10),
                      ),
                    ],
                ),
                child: Stack(
                  children: [
                    Positioned(
                      right: -20,
                      top: -20,
                      child: Icon(
                        LucideIcons.sparkles,
                        size: 96,
                        color: Colors.white.withValues(alpha: 0.1),
                      ),
                    ),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: const Icon(
                            LucideIcons.flame,
                            color: Colors.white,
                            size: 32,
                          ),
                        ),
                        const SizedBox(width: 20),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${provider.streak} Days',
                              style: const TextStyle(
                                fontSize: 30,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            Text(
                              'Current Hot Streak',
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.white.withValues(alpha: 0.8),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Month Navigation
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Semantics(
                    label: "Previous Month",
                    button: true,
                    child: IconButton(
                      onPressed: provider.isLoading ? null : provider.prevMonth,
                      icon: Icon(
                        LucideIcons.chevronLeft,
                        color: isDark ? Colors.white70 : Colors.black54,
                      ),
                    ),
                  ),
                  Text(
                    DateFormat('MMMM yyyy').format(provider.viewDate).toUpperCase(),
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.2,
                      color: isDark ? Colors.white70 : Colors.black54,
                    ),
                  ),
                  Semantics(
                    label: "Next Month",
                    button: true,
                    child: IconButton(
                      onPressed: provider.isLoading ? null : provider.nextMonth,
                      icon: Icon(
                        LucideIcons.chevronRight,
                        color: isDark ? Colors.white70 : Colors.black54,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Calendar Grid Card
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceDark : Colors.white,
                  borderRadius: BorderRadius.circular(32),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    // Day Headers
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                          .map((d) => Text(
                                d,
                                style: const TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey,
                                ),
                              ))
                          .toList(),
                    ),
                    const SizedBox(height: 16),
                    provider.isLoading
                        ? _buildShimmerGrid()
                        : provider.submissionMap.values.every((v) => !v)
                            ? EmptyCalendarMonth(
                                viewDate: provider.viewDate,
                                onGoToToday: () => provider.goToToday(),
                              )
                            : _buildCalendarGrid(provider, isDark),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Weekly Velocity Section
              const Text(
                'WEEKLY VELOCITY',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.2,
                  color: Colors.grey,
                ),
              ),
              const SizedBox(height: 16),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4,
                  crossAxisSpacing: 12,
                  mainAxisExtent: 80,
                ),
                itemCount: 4,
                itemBuilder: (context, index) {
                  final wk = 'Wk ${index + 1}';
                  final velocity = provider.weeklyVelocity[wk] ?? 0.0;
                  return Container(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    decoration: BoxDecoration(
                      color: isDark ? AppColors.surfaceDark : Colors.white,
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(
                        color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.blueGrey.withValues(alpha: 0.1),
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          wk,
                          style: const TextStyle(
                            fontSize: 9,
                            color: Colors.grey,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${(velocity * 100).toInt()}%',
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: AppColors.emeraldLight,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
              const SizedBox(height: 100), // Bottom padding
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCalendarGrid(CalendarProvider provider, bool isDark) {
    final year = provider.viewDate.year;
    final month = provider.viewDate.month;
    final firstDayOfMonth = DateTime(year, month, 1);
    final daysInMonth = DateUtils.getDaysInMonth(year, month);
    final weekdayOfFirst = firstDayOfMonth.weekday % 7; // 0=Sun, 6=Sat

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 7,
        mainAxisSpacing: 8,
        crossAxisSpacing: 8,
      ),
      itemCount: 42, // Max grid size (6 weeks)
      itemBuilder: (context, index) {
        if (index < weekdayOfFirst || index >= weekdayOfFirst + daysInMonth) {
          return const SizedBox.shrink();
        }

        final day = index - weekdayOfFirst + 1;
        final date = DateTime(year, month, day);
        final dateKey = DateFormat('yyyy-MM-dd').format(date);
        final isSubmitted = provider.submissionMap[dateKey] ?? false;
        
        final dateStr = DateFormat('MMMM d, yyyy').format(date);
        final isBeforeInstall = date.isBefore(StorageService.instance.firstInstallDate);
        final semanticsLabel = isBeforeInstall 
            ? "$dateStr, before GoalFlow" 
            : "$dateStr, ${isSubmitted ? 'cycle completed' : 'not completed'}";

        return Center(
          child: Semantics(
            label: semanticsLabel,
            child: AnimatedScale(
              scale: isSubmitted ? 1.05 : 1.0,
              duration: const Duration(milliseconds: 300),
              child: Container(
                width: 44, // Increased from 36
                height: 44, // Increased from 36
                decoration: BoxDecoration(
                  color: isSubmitted
                      ? AppColors.emeraldPrimary
                      : (isDark ? Colors.white.withValues(alpha: 0.05) : const Color(0xFFF8FAFC)),
                  shape: BoxShape.circle,
                  border: isBeforeInstall ? Border.all(color: Colors.grey.withValues(alpha: 0.2), width: 1, style: BorderStyle.none) : null,
                  boxShadow: isSubmitted
                      ? [
                          BoxShadow(
                            color: AppColors.emeraldPrimary.withValues(alpha: 0.4),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          )
                        ]
                      : null,
                ),
                child: Center(
                  child: Text(
                    day.toString(),
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: isSubmitted ? FontWeight.bold : FontWeight.normal,
                      color: isBeforeInstall 
                          ? Colors.grey.withValues(alpha: 0.3)
                          : (isSubmitted
                              ? Colors.white
                              : (isDark ? Colors.white38 : Colors.grey)),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildShimmerGrid() {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 7,
        mainAxisSpacing: 8,
        crossAxisSpacing: 8,
      ),
      itemCount: 31,
      itemBuilder: (context, index) {
        return Container(
          decoration: BoxDecoration(
            color: Colors.grey.withValues(alpha: 0.1),
            shape: BoxShape.circle,
          ),
        );
      },
    );
  }
}
