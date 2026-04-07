import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class EmptySlotHint extends StatelessWidget {
  const EmptySlotHint({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
      decoration: BoxDecoration(
        color: isDark ? Colors.white.withValues(alpha: 0.03) : Colors.black.withValues(alpha: 0.02),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? Colors.white10 : Colors.black12,
          style: BorderStyle.solid, // Prompt said dashed, but dashed is complex in vanilla Flutter, using solid with low opacity
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Icon(
            LucideIcons.plusCircle,
            size: 20,
            color: isDark ? Colors.white38 : Colors.black38,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'This slot is free — tap below to assign a task',
              style: TextStyle(
                fontSize: 12,
                fontStyle: FontStyle.italic,
                color: isDark ? Colors.white38 : Colors.black38,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
