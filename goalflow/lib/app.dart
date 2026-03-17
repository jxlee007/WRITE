import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'core/theme/app_theme.dart';
import 'core/theme/theme_notifier.dart';
import 'widgets/app_shell.dart';
import 'features/daily/daily_screen.dart';
import 'features/routine/routine_screen.dart';
import 'features/audit/audit_screen.dart';
import 'features/journal/journal_screen.dart';
import 'features/journal/journal_log_screen.dart';
import 'features/calendar/calendar_screen.dart';
import 'features/onboarding/onboarding_screen.dart';
import 'core/storage/storage_service.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();

final GoRouter _router = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/daily',
  redirect: (context, state) {
    if (StorageService.instance.isFirstLaunch() && state.matchedLocation != '/onboarding') {
      return '/onboarding';
    }
    return null;
  },
  routes: [
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => const OnboardingScreen(),
    ),
    // StatefulShellRoute for core app sections with bottom nav
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return AppShell(navigationShell: navigationShell);
      },
      branches: [
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/daily',
              builder: (context, state) => const DailyScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/routine',
              builder: (context, state) => const RoutineScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/audit',
              builder: (context, state) => const AuditScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/journal',
              builder: (context, state) => const JournalScreen(),
            ),
          ],
        ),
      ],
    ),
    // Calendar screen pushed on top (removes nav bar)
    GoRoute(
      path: '/calendar',
      builder: (context, state) => const CalendarScreen(),
    ),
    // Journal Log screen pushed on top
    GoRoute(
      path: '/journal-log',
      builder: (context, state) => const JournalLogScreen(),
    ),
  ],
);

class GoalflowApp extends StatelessWidget {
  const GoalflowApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeNotifier = context.watch<ThemeNotifier>();

    return MaterialApp.router(
      title: 'Goalflow',
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: themeNotifier.isDark ? ThemeMode.dark : ThemeMode.light,
      routerConfig: _router,
      debugShowCheckedModeBanner: false,
    );
  }
}
