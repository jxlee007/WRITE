import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:go_router/go_router.dart';
import 'journal_provider.dart';
import 'widgets/streak_success_card.dart';
import '../../core/services/submit_notifier.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/theme_notifier.dart';
import '../../core/motivational/motivation_engine.dart';

class JournalScreen extends StatelessWidget {
  const JournalScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final submitNotifier = context.watch<SubmitNotifier>();
    return ChangeNotifierProvider(
      create: (_) => JournalProvider(submitNotifier),
      child: const _JournalScreenContent(),
    );
  }
}

class _JournalScreenContent extends StatefulWidget {
  const _JournalScreenContent();

  @override
  State<_JournalScreenContent> createState() => _JournalScreenContentState();
}

class _JournalScreenContentState extends State<_JournalScreenContent> with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
    _fadeAnimation = CurvedAnimation(parent: _animationController, curve: Curves.easeIn);
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _animationController, curve: Curves.easeOutCubic));

    final provider = context.read<JournalProvider>();
    if (provider.isSubmitted) {
      _animationController.forward();
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<JournalProvider>();
    final isDark = context.watch<ThemeNotifier>().isDark;

    if (provider.isSubmitted) {
      _animationController.forward();
      return _buildSuccessState(provider, isDark);
    }

    return Scaffold(
      backgroundColor: isDark ? AppColors.bgDark : AppColors.bgLight,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Text(
                'How was your day?',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : Colors.black87,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Secure the cycle by reflecting on your progress.',
                    style: TextStyle(
                      fontSize: 15,
                      color: isDark ? Colors.white70 : Colors.black54,
                    ),
                  ),
                  TextButton.icon(
                    onPressed: () => context.push('/journal-log'),
                    icon: Icon(LucideIcons.history, size: 16, color: isDark ? Colors.white70 : Colors.black54),
                    label: Text(
                      'View Log',
                      style: TextStyle(color: isDark ? Colors.white70 : Colors.black54, fontSize: 13),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              _buildJournalSection(
                'Positive Outcomes',
                MotivationEngine.getJournalPrompt(0),
                provider.wentWellController,
                isDark,
              ),
              const SizedBox(height: 24),
              _buildJournalSection(
                'Improvement Vectors',
                MotivationEngine.getJournalPrompt(1),
                provider.couldImproveController,
                isDark,
              ),
              const SizedBox(height: 24),
              _buildJournalSection(
                'Next Objective',
                MotivationEngine.getJournalPrompt(2),
                provider.tomorrowGoalController,
                isDark,
              ),
              const SizedBox(height: 40),

              // Save Button
              SizedBox(
                width: double.infinity,
                height: 72,
                child: ElevatedButton(
                  onPressed: () => provider.handleSubmitDay(context),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF065F46), // emerald-800 approx
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24),
                    ),
                    elevation: 0,
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Save The Day',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(width: 8),
                      Icon(LucideIcons.moon, size: 20),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 120), // Bottom nav space
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildJournalSection(String label, String hint, TextEditingController controller, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: const TextStyle(
            color: Colors.grey,
            fontSize: 10,
            fontWeight: FontWeight.bold,
            letterSpacing: 1.5,
          ),
        ),
        const SizedBox(height: 12),
        ValueListenableBuilder<TextEditingValue>(
          valueListenable: controller,
          builder: (context, value, _) {
            final count = value.text.length;
            String motivation = '';
            if (count > 0 && count < 10) {
              motivation = 'Starting strong...';
            } else if (count >= 10 && count < 50) {
              motivation = 'Good detail.';
            } else if (count >= 50 && count < 100) {
              motivation = 'Deeply insightful.';
            } else if (count >= 100) {
              motivation = 'Exceptional clarity!';
            }

            return Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                TextField(
                  controller: controller,
                  maxLines: null,
                  minLines: 5,
                  keyboardType: TextInputType.multiline,
                  style: TextStyle(color: isDark ? Colors.white : Colors.black87),
                  decoration: InputDecoration(
                    hintText: hint,
                    hintStyle: TextStyle(color: isDark ? Colors.white24 : Colors.black26),
                    filled: true,
                    fillColor: isDark ? AppColors.surfaceDark : const Color(0xFFF8FAFC),
                    contentPadding: const EdgeInsets.all(24),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(24),
                      borderSide: BorderSide(color: isDark ? Colors.white.withValues(alpha: 0.05) : const Color(0xFFE2E8F0)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(24),
                      borderSide: BorderSide(color: isDark ? Colors.white.withValues(alpha: 0.05) : const Color(0xFFE2E8F0)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(24),
                      borderSide: const BorderSide(color: AppColors.emeraldPrimary, width: 2),
                    ),
                  ),
                ),
                if (count > 0)
                  Padding(
                    padding: const EdgeInsets.only(top: 8, right: 12),
                    child: AnimatedOpacity(
                      duration: const Duration(milliseconds: 300),
                      opacity: 1.0,
                      child: Text(
                        '$motivation  $count chars',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          color: AppColors.emeraldPrimary.withValues(alpha: 0.8),
                        ),
                      ),
                    ),
                  ),
              ],
            );
          },
        ),
      ],
    );
  }

  Widget _buildSuccessState(JournalProvider provider, bool isDark) {
    return Scaffold(
      backgroundColor: isDark ? AppColors.bgDark : AppColors.bgLight,
      body: Center(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: SlideTransition(
            position: _slideAnimation,
            child: StreakSuccessCard(streak: provider.streak, isDark: isDark),
          ),
        ),
      ),
    );
  }
}
