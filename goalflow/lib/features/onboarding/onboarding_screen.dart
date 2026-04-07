import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './onboarding_provider.dart';
import './pages/welcome_page.dart';
import './pages/wake_time_page.dart';
import './pages/job_shift_page.dart';
import './pages/focus_areas_page.dart';
import './pages/summary_page.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  void _nextPage() {
    if (_currentPage < 4) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOutCubic,
      );
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          PageView(
            controller: _pageController,
            physics: const NeverScrollableScrollPhysics(), // Force "Continue" button usage
            onPageChanged: (page) => setState(() => _currentPage = page),
            children: [
              WelcomePage(onContinue: _nextPage),
              WakeTimePage(onContinue: _nextPage),
              JobShiftPage(onContinue: _nextPage),
              FocusAreasPage(onContinue: _nextPage),
              SummaryPage(onFinish: () => context.read<OnboardingProvider>().finishOnboarding(context)),
            ],
          ),
          
          // Page Indicators
          if (_currentPage > 0) // Hide on welcome page as per design inspiration
            Positioned(
              bottom: 120,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(5, (index) {
                  return AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    height: 8,
                    width: _currentPage == index ? 24 : 8,
                    decoration: BoxDecoration(
                      color: _currentPage == index ? const Color(0xFF10B981) : Colors.grey.withValues(alpha: 0.3),
                      borderRadius: BorderRadius.circular(4),
                    ),
                  );
                }),
              ),
            ),
        ],
      ),
    );
  }
}
