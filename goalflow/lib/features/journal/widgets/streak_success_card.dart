import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/motivational/motivation_engine.dart';

class StreakSuccessCard extends StatelessWidget {
  final int streak;
  final bool isDark;

  const StreakSuccessCard({
    required this.streak,
    required this.isDark,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Top section — identity
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 48, 24, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Mind Sync',
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : Colors.black87,
                    ),
                  ),
                  Text(
                    'Map your progress',
                    style: TextStyle(
                      fontSize: 14,
                      fontStyle: FontStyle.italic,
                      color: isDark ? Colors.white60 : Colors.black45,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 48),

            // Central streak display — the single hero element
            Center(
              child: Column(
                children: [
                  // Flame icon in an emerald circle
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: AppColors.emeraldPrimary,
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.emeraldPrimary.withValues(alpha: 0.35),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        )
                      ],
                    ),
                    child: const Icon(LucideIcons.flame, color: Colors.white, size: 36),
                  ),

                  const SizedBox(height: 24),

                  // Large streak number
                  Text(
                    '$streak',
                    style: const TextStyle(
                      fontSize: 80,
                      fontWeight: FontWeight.w900,
                      color: AppColors.emeraldPrimary,
                      height: 1.0,
                      fontFeatures: [FontFeature.tabularFigures()],
                    ),
                  ),

                  // "day streak" label
                  Text(
                    streak == 1 ? 'day streak' : 'day streak',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: isDark ? Colors.white60 : Colors.black45,
                      letterSpacing: 0.5,
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Motivational line from MotivationEngine
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 40),
                    child: Text(
                      MotivationEngine.getStreakMessage(streak),
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 14,
                        fontStyle: FontStyle.italic,
                        color: isDark ? Colors.white38 : Colors.black38,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 48),

            // Divider
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 48),
              child: Divider(color: isDark ? Colors.white10 : Colors.black.withValues(alpha: 0.08)),
            ),

            const SizedBox(height: 24),

            // "Day closed" confirmation line
            Center(
              child: Text(
                'Cycle secured. Rest well.',
                style: TextStyle(
                  fontSize: 13,
                  color: isDark ? Colors.white38 : Colors.black38,
                  letterSpacing: 0.3,
                ),
              ),
            ),

            const SizedBox(height: 16),

            // "Come back tomorrow" — subtle, not a button
            const Text(
              'Come back tomorrow to keep the flame alive.',
              style: TextStyle(
                fontSize: 14,
                color: Colors.white60,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            TextButton.icon(
              onPressed: () => context.push('/journal-log'),
              icon: const Icon(LucideIcons.history, size: 16, color: Colors.white70),
              label: const Text(
                'View Journal Log',
                style: TextStyle(
                  color: Colors.white70,
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                backgroundColor: Colors.white.withValues(alpha: 0.05),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),

            const SizedBox(height: 120), // bottom nav clearance
          ],
        ),
      ),
    );
  }
}
