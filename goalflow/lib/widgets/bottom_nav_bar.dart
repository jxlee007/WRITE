import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../core/theme/app_colors.dart';

class GlassBottomNavBar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;

  const GlassBottomNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Padding(
      padding: const EdgeInsets.only(bottom: 24.0, left: 16.0, right: 16.0),
      child: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 360),
          width: MediaQuery.of(context).size.width * 0.9,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(40),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                decoration: BoxDecoration(
                  color: isDark 
                      ? const Color(0xFF0F172A).withValues(alpha: 0.9) 
                      : Colors.white.withValues(alpha: 0.9),
                  borderRadius: BorderRadius.circular(40),
                  border: Border.all(
                    color: isDark 
                        ? Colors.white.withValues(alpha: 0.1) 
                        : Colors.blueGrey.withValues(alpha: 0.1),
                    width: 0.5,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.1),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _NavBarItem(
                      index: 0,
                      icon: LucideIcons.calendar,
                      label: 'DAILY',
                      isSelected: currentIndex == 0,
                      onTap: () => onTap(0),
                    ),
                    _NavBarItem(
                      index: 1,
                      icon: LucideIcons.layoutGrid,
                      label: 'ROUTINE',
                      isSelected: currentIndex == 1,
                      onTap: () => onTap(1),
                    ),
                    _NavBarItem(
                      index: 2,
                      icon: LucideIcons.barChart,
                      label: 'AUDIT',
                      isSelected: currentIndex == 2,
                      onTap: () => onTap(2),
                    ),
                    _NavBarItem(
                      index: 3,
                      icon: LucideIcons.moon,
                      label: 'SYNC',
                      isSelected: currentIndex == 3,
                      onTap: () => onTap(3),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _NavBarItem extends StatelessWidget {
  final int index;
  final IconData icon;
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _NavBarItem({
    required this.index,
    required this.icon,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final activeColor = isDark ? AppColors.emeraldLight : const Color(0xFF047857);
    final inactiveColor = isDark ? Colors.blueGrey.shade500 : Colors.blueGrey.shade400;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected 
              ? AppColors.emeraldPrimary.withValues(alpha: 0.1) 
              : Colors.transparent,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 22,
              color: isSelected ? activeColor : inactiveColor,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 9,
                fontWeight: FontWeight.bold,
                letterSpacing: 0.5,
                color: isSelected ? activeColor : inactiveColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
