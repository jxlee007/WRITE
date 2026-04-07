import 'package:flutter/material.dart';

class AnimatedCounter extends StatelessWidget {
  final int value;
  final TextStyle style;
  final Duration duration;

  const AnimatedCounter({
    super.key,
    required this.value,
    this.style = const TextStyle(
      fontSize: 32,
      fontWeight: FontWeight.bold,
      letterSpacing: -1,
    ),
    this.duration = const Duration(milliseconds: 600),
  });

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      duration: duration,
      tween: Tween<double>(begin: value.toDouble(), end: value.toDouble()),
      curve: Curves.easeOutCubic,
      builder: (context, val, child) {
        return Text(
          '${val.round()}%',
          style: style,
        );
      },
      onEnd: () {
        // Optional: Trigger additional effects when counting ends
      },
    );
  }
}
