import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'routine_provider.dart';
import 'widgets/day_timeline.dart';
import 'widgets/week_grid.dart';
import 'widgets/month_view.dart';
import '../../core/theme/theme_notifier.dart';
import '../../../core/theme/app_colors.dart';

class RoutineScreen extends StatelessWidget {
  const RoutineScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => RoutineProvider(),
      child: const _RoutineScreenContent(),
    );
  }
}

class _RoutineScreenContent extends StatefulWidget {
  const _RoutineScreenContent();

  @override
  State<_RoutineScreenContent> createState() => _RoutineScreenContentState();
}

class _RoutineScreenContentState extends State<_RoutineScreenContent> {
  @override
  Widget build(BuildContext context) {
    final provider = context.watch<RoutineProvider>();
    final themeNotifier = context.watch<ThemeNotifier>();
    final isDark = themeNotifier.isDark;

    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Routine',
                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Your weekly matrix',
                        style: TextStyle(
                          color: isDark ? Colors.white70 : Colors.black54,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                  InkWell(
                    onTap: () => themeNotifier.toggle(),
                    borderRadius: BorderRadius.circular(12),
                    child: Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.surfaceDark : Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
                      ),
                      child: Icon(
                        isDark ? Icons.brightness_2 : Icons.brightness_5,
                        size: 20,
                        color: isDark ? Colors.white : Colors.black87,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            
            // Segmented Control (Tabs)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
              child: _buildSegmentedControl(provider, isDark),
            ),
            
            // View Content
            Expanded(
              child: _buildView(provider.currentView, provider, isDark),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildView(String view, RoutineProvider provider, bool isDark) {
    switch (view) {
      case 'week':
        return const WeekGrid();
      case 'month':
        return const MonthView();
      case 'day':
      default:
        return DayTimeline(provider: provider, isDark: isDark);
    }
  }

  Widget _buildSegmentedControl(RoutineProvider provider, bool isDark) {
    return Container(
      height: 48,
      decoration: BoxDecoration(
        color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Stack(
        children: [
          // Animated Indicator Pill
          AnimatedAlign(
            duration: const Duration(milliseconds: 250),
            curve: Curves.easeInOut,
            alignment: _getAlignmentForView(provider.currentView),
            child: FractionallySizedBox(
              widthFactor: 1 / 3,
              child: Container(
                margin: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceDark : Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    if (!isDark)
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.05),
                        blurRadius: 4,
                        offset: const Offset(0, 2),
                      ),
                  ],
                ),
              ),
            ),
          ),
          // Tab Buttons
          Row(
            children: ['day', 'week', 'month'].map((view) {
              final isActive = provider.currentView == view;
              return Expanded(
                child: GestureDetector(
                  onTap: () => provider.setView(view),
                  behavior: HitTestBehavior.opaque,
                  child: Center(
                    child: Text(
                      view[0].toUpperCase() + view.substring(1),
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: isActive 
                            ? (isDark ? Colors.white : Colors.black87) 
                            : (isDark ? Colors.white38 : Colors.black38),
                      ),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Alignment _getAlignmentForView(String view) {
    switch (view) {
      case 'day': return Alignment.centerLeft;
      case 'week': return Alignment.center;
      case 'month': return Alignment.centerRight;
      default: return Alignment.centerLeft;
    }
  }
}
