import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'bottom_nav_bar.dart';
import '../features/daily/daily_provider.dart';
import '../features/routine/routine_provider.dart';
import '../features/audit/audit_provider.dart';
import '../features/journal/journal_provider.dart';
import '../core/feedback/toast_service.dart';
import '../core/feedback/haptic_service.dart'; // Added import

class AppShell extends StatefulWidget {
  final StatefulNavigationShell navigationShell;

  const AppShell({
    super.key,
    required this.navigationShell,
  });

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> with WidgetsBindingObserver {
  late DateTime _lastDate;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _lastDate = DateTime.now();
    
    // Initialize Toast Service after the first frame
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        ToastService.init(Overlay.of(context));
      }
    });
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _checkDayChange();
      _reloadState();
    }
  }

  void _checkDayChange() {
    final now = DateTime.now();
    if (now.year != _lastDate.year || now.month != _lastDate.month || now.day != _lastDate.day) {
      // New day!
      _lastDate = now;
      _onDayChange();
    }
  }

  void _onDayChange() {
    // Reset all providers for the new day
    context.read<DailyProvider>().resetForNewDay();
    context.read<RoutineProvider>().refresh();
    context.read<AuditProvider>().refresh();
    context.read<JournalProvider>().refresh();
  }

  void _reloadState() {
    // Refresh current view's state if needed
    context.read<DailyProvider>().loadTodayStatus();
  }

  void _onTap(int index) {
    if (index != widget.navigationShell.currentIndex) { // Only trigger haptic feedback if tab is actually changing
      HapticService.tabSwitch(context); // Added HapticService call
    }
    widget.navigationShell.goBranch(
      index,
      initialLocation: index == widget.navigationShell.currentIndex,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      body: Stack(
        children: [
          widget.navigationShell,
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: SafeArea(
              child: GlassBottomNavBar(
                currentIndex: widget.navigationShell.currentIndex,
                onTap: _onTap,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
