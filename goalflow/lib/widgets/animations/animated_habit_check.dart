import 'package:flutter/material.dart';

class AnimatedHabitCheck extends StatelessWidget {
  final bool isChecked;
  final VoidCallback onTap;
  final Color activeColor;

  const AnimatedHabitCheck({
    super.key,
    required this.isChecked,
    required this.onTap,
    this.activeColor = const Color(0xFF059669), // emerald-600
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: TweenAnimationBuilder<double>(
        duration: const Duration(milliseconds: 150),
        tween: Tween(begin: 1.0, end: isChecked ? 1.2 : 1.0),
        curve: Curves.easeOut,
        builder: (context, scale, child) {
          return Transform.scale(
            scale: scale,
            child: child,
          );
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: 28,
          height: 28,
          decoration: BoxDecoration(
            color: isChecked ? activeColor : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: isChecked ? activeColor : (isDark ? Colors.white24 : Colors.black26),
              width: 1.5,
            ),
          ),
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 200),
            transitionBuilder: (child, animation) {
              return ScaleTransition(
                scale: CurvedAnimation(
                  parent: animation,
                  curve: Curves.elasticOut,
                ),
                child: FadeTransition(
                  opacity: animation,
                  child: child,
                ),
              );
            },
            child: isChecked
                ? const Icon(
                    Icons.check,
                    key: ValueKey('check'),
                    color: Colors.white,
                    size: 18,
                  )
                : const SizedBox.shrink(key: ValueKey('empty')),
          ),
        ),
      ),
    );
  }
}
