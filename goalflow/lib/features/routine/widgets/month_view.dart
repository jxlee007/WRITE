import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../routine_provider.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/theme_notifier.dart';

class MonthView extends StatelessWidget {
  const MonthView({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<RoutineProvider>();
    final isDark = context.watch<ThemeNotifier>().isDark;
    final catHours = provider.getCategoryHours();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Adherence Card
          FutureBuilder<double>(
            future: provider.getAdherence(),
            builder: (context, snapshot) {
              final adherence = snapshot.data ?? 0.86;
              return Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppColors.emeraldDark, AppColors.emeraldPrimary],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Column(
                  children: [
                    const Icon(LucideIcons.target, color: Colors.white, size: 32),
                    const SizedBox(height: 12),
                    Text(
                      '${(adherence * 100).toInt()}% Matrix Adherence',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        letterSpacing: -0.5,
                      ),
                    ),
                    const SizedBox(height: 4),
                      Text(
                        'Past 7 days performance',
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.8),
                          fontSize: 14,
                        ),
                      ),
                  ],
                ),
              );
            },
          ),

          const SizedBox(height: 24),

          // Stat Grid
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 16,
            crossAxisSpacing: 16,
            childAspectRatio: 1.5,
            children: [
              _buildStatCard(
                'Hustle/Work',
                '${catHours['hustle_work']!.toStringAsFixed(1)}h',
                LucideIcons.briefcase,
                Colors.purple,
                isDark,
              ),
              _buildStatCard(
                'Study/Prep',
                '${catHours['study_prep']!.toStringAsFixed(1)}h',
                LucideIcons.bookOpen,
                Colors.amber,
                isDark,
              ),
              _buildStatCard(
                'Fitness',
                '${catHours['fitness']!.toStringAsFixed(1)}h',
                LucideIcons.dumbbell,
                AppColors.emeraldPrimary,
                isDark,
              ),
              _buildStatCard(
                'Sleep',
                '${catHours['sleep']!.toStringAsFixed(1)}h',
                LucideIcons.moon,
                Colors.indigo,
                isDark,
              ),
            ],
          ),

          const SizedBox(height: 32),

          Text(
            '4-Week Projection',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : const Color(0xFF1E293B),
            ),
          ),
          const SizedBox(height: 16),

          // Projection Calendar
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: isDark ? AppColors.surfaceDark : Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
            ),
            child: Builder(
              builder: (context) {
                final DateTime now = DateTime.now();
                final DateTime today = DateTime(now.year, now.month, now.day);
                // Find Monday of the current week (Mon=1, Sun=7)
                final DateTime weekStart = today.subtract(Duration(days: today.weekday - 1));

                return Column(
                  children: [
                    // Day Names
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => SizedBox(
                        width: 36,
                        child: Center(
                          child: Text(
                            d,
                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey),
                          ),
                        ),
                      )).toList(),
                    ),
                    const SizedBox(height: 12),
                    // Grid
                    Column(
                      children: List.generate(4, (weekIndex) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: List.generate(7, (dayIndex) {
                              final cellDate = weekStart.add(Duration(days: (weekIndex * 7) + dayIndex));
                              final isToday = cellDate.isAtSameMomentAs(today);
                              final isPast = cellDate.isBefore(today);
                              final isWeekend = dayIndex >= 5;

                              // Today: Emerald bg, white text, bold
                              if (isToday) {
                                return Container(
                                  width: 36,
                                  height: 36,
                                  decoration: BoxDecoration(
                                    color: AppColors.emeraldPrimary,
                                    borderRadius: BorderRadius.circular(10),
                                    boxShadow: [
                                      BoxShadow(
                                        color: AppColors.emeraldPrimary.withValues(alpha: 0.3),
                                        blurRadius: 8,
                                        offset: const Offset(0, 2),
                                      ),
                                    ],
                                  ),
                                  child: Center(
                                    child: Transform.scale(
                                      scale: 1.1,
                                      child: Text(
                                        '${cellDate.day}',
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 14,
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              }

                              // Common styles
                              Color bgColor = Colors.transparent;
                              Border? border;
                              TextStyle textStyle = TextStyle(
                                fontSize: 13,
                                color: isDark ? Colors.white70 : Colors.blueGrey.shade700,
                              );

                              if (isPast) {
                                // Past Cell
                                bgColor = isWeekend
                                    ? (isDark ? Colors.indigo.withValues(alpha: 0.15) : Colors.indigo.shade50)
                                    : (isDark ? Colors.white.withValues(alpha: 0.05) : AppColors.bgLight);
                                border = Border.all(
                                  color: isDark ? Colors.white10 : Colors.black.withValues(alpha: 0.05),
                                );
                                textStyle = textStyle.copyWith(
                                  color: isDark ? Colors.white60 : Colors.blueGrey.shade600,
                                );
                              } else {
                                // Future Cell
                                if (isWeekend) {
                                  bgColor = isDark ? Colors.indigo.withValues(alpha: 0.05) : Colors.indigo.shade50.withValues(alpha: 0.3);
                                }
                                border = Border.all(
                                  color: isDark ? Colors.white10 : Colors.blueGrey.shade200,
                                  style: BorderStyle.solid,
                                );
                                textStyle = textStyle.copyWith(
                                  color: isDark ? Colors.white30 : Colors.blueGrey.shade300,
                                );
                              }

                              return Container(
                                width: 36,
                                height: 36,
                                decoration: BoxDecoration(
                                  color: bgColor,
                                  borderRadius: BorderRadius.circular(8),
                                  border: border,
                                ),
                                child: Center(
                                  child: Text(
                                    '${cellDate.day}',
                                    style: textStyle,
                                  ),
                                ),
                              );
                            }),
                          ),
                        );
                      }),
                    ),
                  ],
                );
              },
            ),
          ),
          const SizedBox(height: 120), // Bottom padding
        ],
      ),
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon, Color color, bool isDark) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 20),
          const Spacer(),
          Text(
            value,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : const Color(0xFF1E293B),
            ),
          ),
          Text(
            title,
            style: const TextStyle(
              fontSize: 10,
              color: Colors.grey,
            ),
          ),
        ],
      ),
    );
  }
}
