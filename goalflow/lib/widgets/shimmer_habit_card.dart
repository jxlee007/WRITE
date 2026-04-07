import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class ShimmerHabitCard extends StatelessWidget {
  const ShimmerHabitCard({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final baseColor = isDark ? Colors.white.withValues(alpha: 0.05) : Colors.grey[300]!;
    final highlightColor = isDark ? Colors.white.withValues(alpha: 0.1) : Colors.grey[100]!;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: Shimmer.fromColors(
        baseColor: baseColor,
        highlightColor: highlightColor,
        child: Container(
          height: 72,
          width: double.infinity,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
          ),
        ),
      ),
    );
  }
}
