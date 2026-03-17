import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'daily_provider.dart';
import '../../core/services/submit_notifier.dart';
import '../settings/settings_sheet.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/theme_notifier.dart';
import '../../widgets/empty_states/empty_habits.dart';
import '../../widgets/empty_states/empty_submitted.dart';
import '../../widgets/add_habit_sheet.dart';
import '../../core/feedback/haptic_service.dart';
import '../../core/motivational/motivation_engine.dart';
import '../../widgets/animations/animated_habit_check.dart';
import '../../widgets/animations/animated_counter.dart';
import '../../core/feedback/toast_service.dart';
import 'package:confetti/confetti.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
// HabitItem is now defined in daily_provider.dart

class DailyScreen extends StatelessWidget {
  const DailyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => DailyProvider(context.read<SubmitNotifier>()),
      child: const _DailyScreenContent(),
    );
  }
}

class _DailyScreenContent extends StatefulWidget {
  const _DailyScreenContent();

  @override
  State<_DailyScreenContent> createState() => _DailyScreenContentState();
}

class _DailyScreenContentState extends State<_DailyScreenContent> with SingleTickerProviderStateMixin {
  late ConfettiController _confettiController;
  late AnimationController _pulseController;
  bool _wasMaxConsistency = false;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 2));
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
  }

  @override
  void dispose() {
    _confettiController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  void _showAddHabitSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const AddHabitSheet(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<DailyProvider>();
    final themeNotifier = context.watch<ThemeNotifier>();
    final isDark = themeNotifier.isDark;

    return Scaffold(
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async {
            await provider.reload();
            if (context.mounted) HapticService.reload(context);
          },
          color: AppColors.emeraldPrimary,
          backgroundColor: isDark ? AppColors.surfaceDark : Colors.white,
          strokeWidth: 2.0,
          child: CustomScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            slivers: [
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.only(left: 24, right: 24, top: 16),
                  child: Column(
                    children: [
                      // Header Row
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Daily View',
                                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.white : Colors.black87,
                                    ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                MotivationEngine.getDailyGreeting(DateTime.now().hour, provider.streak),
                                style: TextStyle(
                                  color: isDark ? Colors.white70 : Colors.black54,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                          Row(
                            children: [
                              // Settings (Bell) Icon
                              InkWell(
                                onTap: () {
                                  showModalBottomSheet(
                                    context: context,
                                    isScrollControlled: true,
                                    backgroundColor: Colors.transparent,
                                    builder: (context) => const SettingsSheet(),
                                  );
                                },
                                borderRadius: BorderRadius.circular(12),
                                child: Container(
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: isDark ? AppColors.surfaceDark : Colors.white,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(color: isDark ? Colors.white10 : Colors.black12),
                                  ),
                                  child: Semantics(
                                    label: "Notification Settings",
                                    button: true,
                                    child: Icon(
                                      LucideIcons.bell,
                                      size: 20,
                                      color: isDark ? Colors.white : Colors.black87,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              // Theme Toggle
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
                                  child: Semantics(
                                    label: "Toggle Dark Mode",
                                    button: true,
                                    child: Icon(
                                      isDark ? LucideIcons.moon : LucideIcons.sun,
                                      size: 20,
                                      color: isDark ? Colors.white : Colors.black87,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              // Streak Button
                              InkWell(
                                onTap: () => context.go('/calendar'),
                                borderRadius: BorderRadius.circular(12),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                  decoration: BoxDecoration(
                                    color: AppColors.emeraldPrimary,
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Semantics(
                                    label: "View Streak Calendar",
                                    value: "${provider.streak} day streak",
                                    button: true,
                                    child: Row(
                                      children: [
                                        const Icon(LucideIcons.flame, color: Colors.white, size: 18),
                                        const SizedBox(width: 6),
                                        Text(
                                          '${provider.streak}',
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              )
                            ],
                          )
                        ],
                      ),
                      const SizedBox(height: 32),

                      // Confetti Overlay
                      Align(
                        alignment: Alignment.topCenter,
                        child: ConfettiWidget(
                          confettiController: _confettiController,
                          blastDirectionality: BlastDirectionality.explosive,
                          shouldLoop: false,
                          colors: [AppColors.emeraldPrimary, Colors.teal, Colors.green],
                          maximumSize: const Size(10, 10),
                          minimumSize: const Size(6, 6),
                          numberOfParticles: 30,
                          gravity: 0.1,
                        ),
                      ),

                      // Success banner
                      if (provider.isSubmitted) ...[
                        const EmptySubmitted(),
                        const SizedBox(height: 24),
                      ],

                      // Consistency Score
                      AnimatedBuilder(
                        animation: _pulseController,
                        builder: (context, child) {
                          final glow = ColorTween(
                            begin: Colors.transparent,
                            end: AppColors.emeraldPrimary.withValues(alpha: 0.4),
                          ).animate(CurvedAnimation(
                            parent: _pulseController,
                            curve: Curves.easeInOut,
                          ));
                          return Container(
                            padding: const EdgeInsets.all(24),
                            decoration: BoxDecoration(
                              color: isDark ? AppColors.surfaceDark : Colors.white,
                              borderRadius: BorderRadius.circular(32),
                              border: Border.all(
                                color: _pulseController.isAnimating 
                                    ? glow.value! 
                                    : (isDark ? Colors.white10 : Colors.black12),
                                width: _pulseController.isAnimating ? 2 : 1,
                              ),
                              boxShadow: _pulseController.isAnimating ? [
                                BoxShadow(
                                  color: glow.value!,
                                  blurRadius: 12,
                                  spreadRadius: 2,
                                )
                              ] : null,
                            ),
                            child: child,
                          );
                        },
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'CONSISTENCY SCORE',
                                      style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.w700,
                                        letterSpacing: 1.2,
                                        color: isDark ? Colors.white60 : Colors.black45,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    AnimatedCounter(
                                      value: (provider.consistencyScore * 100).toInt(),
                                      style: Theme.of(context).textTheme.headlineLarge!.copyWith(
                                            fontWeight: FontWeight.w800,
                                            fontSize: 36,
                                          ),
                                    ),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.all(12),
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: AppColors.emeraldPrimary.withValues(alpha: 0.1),
                                  ),
                                  child: const Icon(LucideIcons.trophy, color: AppColors.emeraldPrimary, size: 28),
                                ),
                              ],
                            ),
                            const SizedBox(height: 24),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: TweenAnimationBuilder<double>(
                                tween: Tween<double>(begin: 0, end: provider.consistencyScore),
                                duration: const Duration(milliseconds: 1000),
                                builder: (context, value, _) {
                                  // celebration logic for 25, 50, 75%
                                  _checkMilestones(value);

                                  // Trigger celebration if it hits 100% and wasn't before
                                  if (value >= 1.0 && !_wasMaxConsistency && !provider.isSubmitted) {
                                    WidgetsBinding.instance.addPostFrameCallback((_) {
                                      if (mounted) {
                                        if (!MediaQuery.of(context).disableAnimations) {
                                          _confettiController.play();
                                          _pulseController.forward().then((_) => _pulseController.reverse());
                                        }
                                        HapticService.habitComplete(context);
                                        ToastService.success("All done for today! Streak stays alive.");
                                        setState(() => _wasMaxConsistency = true);
                                      }
                                    });
                                  } else if (value < 1.0 && _wasMaxConsistency) {
                                    WidgetsBinding.instance.addPostFrameCallback((_) {
                                      if (mounted) setState(() => _wasMaxConsistency = false);
                                    });
                                  }
                                  
                                  return Stack(
                                    children: [
                                      Semantics(
                                        label: "Consistency Score",
                                        value: "${(value * 100).toInt()}%",
                                        child: LinearProgressIndicator(
                                          value: value,
                                          minHeight: 10,
                                          backgroundColor: isDark ? Colors.white10 : Colors.black12,
                                          color: value >= 1.0 ? null : AppColors.emeraldPrimary,
                                        ),
                                      ),
                                      if (value >= 1.0)
                                        Positioned.fill(
                                          child: Container(
                                            decoration: const BoxDecoration(
                                              gradient: LinearGradient(
                                                colors: [
                                                  Color(0xFF10B981),
                                                  Color(0xFF34D399),
                                                  Color(0xFF059669),
                                                  Color(0xFF10B981),
                                                ],
                                                stops: [0.0, 0.3, 0.7, 1.0],
                                              ),
                                            ),
                                          ),
                                        ),
                                    ],
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 32),

                      // Habit Stack Header
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'HABIT STACK',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 1.0,
                              color: isDark ? Colors.white60 : Colors.black54,
                            ),
                          ),
                          TextButton(
                            onPressed: () => context.go('/routine'),
                            style: TextButton.styleFrom(
                              foregroundColor: Colors.teal[500],
                            ),
                            child: const Text('Edit Routine', style: TextStyle(fontWeight: FontWeight.w600)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      if (provider.habits.isEmpty && !provider.isSubmitted)
                        EmptyHabits(
                          onSetUpRoutine: () => context.go('/routine'),
                          onAddQuickTask: () => _showAddHabitSheet(context),
                        ),
                    ],
                  ),
                ),
              ),
              if (provider.habits.isNotEmpty || provider.isSubmitted)
                SliverPadding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  sliver: SliverReorderableList(
                    itemCount: provider.habits.length,
                    onReorder: provider.reorderHabits,
                    itemBuilder: (context, index) {
                      final habit = provider.habits[index];
                      return ReorderableDelayedDragStartListener(
                        key: ValueKey(habit.id),
                        index: index,
                        enabled: !provider.isSubmitted,
                        child: _buildHabitCard(context, habit, provider, isDark),
                      );
                    },
                  ),
                ),
              const SliverToBoxAdapter(child: SizedBox(height: 120)),
            ],
          ),
        ),
      ),
    );
  }

  double _lastVibratedValue = 0;
  void _checkMilestones(double value) {
    // Milestone markers: 0.25, 0.5, 0.75
    final milestones = [0.25, 0.5, 0.75];
    for (var m in milestones) {
      if (value >= m && _lastVibratedValue < m) {
        _lastVibratedValue = value;
        HapticService.habitToggle(context);
        return;
      }
    }
    if (value < _lastVibratedValue) {
      _lastVibratedValue = value;
    }
  }

  Widget _buildHabitCard(BuildContext context, HabitItem habit, DailyProvider provider, bool isDark) {
    final catColor = AppColors.forCategory(habit.category, isDark);
    final iconData = AppColors.iconForCategory(habit.category);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: Slidable(
        key: ValueKey(habit.id),
        enabled: !provider.isSubmitted,
        startActionPane: ActionPane(
          motion: const DrawerMotion(),
          extentRatio: 0.25,
          children: [
            SlidableAction(
              onPressed: (_) {
                HapticService.habitToggle(context);
                provider.toggleHabit(habit.id);
              },
              backgroundColor: habit.completed ? Colors.amber : Colors.teal,
              foregroundColor: Colors.white,
              icon: habit.completed ? LucideIcons.undo : LucideIcons.check,
              label: habit.completed ? 'Undo' : 'Done',
              borderRadius: BorderRadius.circular(20),
            ),
          ],
        ),
        endActionPane: ActionPane(
          motion: const DrawerMotion(),
          extentRatio: 0.25,
          children: [
            SlidableAction(
              onPressed: (_) {
                ToastService.info('Notes feature coming soon!');
              },
              backgroundColor: isDark ? Colors.blueGrey[800]! : Colors.blueGrey[50]!,
              foregroundColor: isDark ? Colors.white : Colors.black87,
              icon: LucideIcons.messageSquare,
              label: 'Note',
              borderRadius: BorderRadius.circular(20),
            ),
          ],
        ),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: habit.completed 
               ? (isDark ? (Colors.teal[900] ?? Colors.teal).withValues(alpha: 0.3) : (Colors.teal[100] ?? Colors.teal).withValues(alpha: 0.5))
               : (isDark ? AppColors.surfaceDark : Colors.white),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: habit.completed ? (Colors.teal[500] ?? Colors.teal) : (isDark ? Colors.white10 : Colors.black12),
            ),
          ),
          child: Row(
            children: [
              // Use Checkbox if not in reorder mode, but here we can keep it for UX consistency
              Semantics(
                label: "${habit.name}, ${habit.completed ? 'complete' : 'incomplete'}",
                checked: habit.completed,
                child: AnimatedHabitCheck(
                  isChecked: habit.completed,
                  onTap: () {
                    HapticService.habitToggle(context);
                    provider.toggleHabit(habit.id);
                  },
                  activeColor: (Colors.teal[600] ?? Colors.teal),
                ),
              ),
              const SizedBox(width: 16),
              // Text & Badge
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    AnimatedDefaultTextStyle(
                      duration: const Duration(milliseconds: 200),
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        decoration: habit.completed ? TextDecoration.lineThrough : null,
                        color: habit.completed 
                            ? (isDark ? Colors.white54 : Colors.black45) 
                            : (isDark ? Colors.white : Colors.black87),
                      ),
                      child: Text(habit.name),
                    ),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        MediaQuery(
                          data: MediaQuery.of(context).copyWith(
                            textScaler: MediaQuery.textScalerOf(context).clamp(maxScaleFactor: 1.2),
                          ),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: catColor.bg,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: catColor.border),
                            ),
                            child: Row(
                              children: [
                                Icon(iconData, size: 12, color: catColor.text),
                                const SizedBox(width: 4),
                                Text(
                                  habit.category.toUpperCase(),
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.w700,
                                    color: catColor.text,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        MediaQuery(
                          data: MediaQuery.of(context).copyWith(
                            textScaler: MediaQuery.textScalerOf(context).clamp(maxScaleFactor: 1.2),
                          ),
                          child: Text(
                            habit.timeLabel,
                            style: TextStyle(
                              fontSize: 12,
                              color: isDark ? Colors.white54 : Colors.black54,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
              if (!provider.isSubmitted)
                const Icon(LucideIcons.gripVertical, size: 20, color: Colors.grey),
            ],
          ),
        ),
      ),
    );
  }
}
