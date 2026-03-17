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
            child: Column(
              children: [
                // Day Names
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => Text(
                    d,
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey),
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
                          final isWeekend = dayIndex >= 5;
                          return Container(
                            width: 32,
                            height: 32,
                            decoration: BoxDecoration(
                              color: isWeekend 
                                ? (isDark ? Colors.indigo.withValues(alpha: 0.1) : Colors.indigo.shade50) 
                                : AppColors.bgLight.withValues(alpha: isDark ? 0.05 : 1),
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(
                                color: isWeekend 
                                  ? Colors.indigo.withValues(alpha: 0.3) 
                                  : AppColors.emeraldLight.withValues(alpha: 0.3),
                              ),
                            ),
                            child: isWeekend ? null : Center(
                              child: Container(
                                width: 4,
                                height: 4,
                                decoration: const BoxDecoration(
                                  color: AppColors.emeraldPrimary,
                                  shape: BoxShape.circle,
                                ),
                              ),
                            ),
                          );
                        }),
                      ),
                    );
                  }),
                ),
              ],
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
