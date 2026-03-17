import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class EmptyJournalNudge extends StatelessWidget {
  const EmptyJournalNudge({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? Colors.purple[900]!.withValues(alpha: 0.1) : Colors.purple[50],
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isDark ? Colors.purple[800]!.withValues(alpha: 0.3) : Colors.purple[200]!,
          style: BorderStyle.solid,
        ),
      ),
      child: Row(
        children: [
          Icon(
            LucideIcons.moon,
            size: 20,
            color: isDark ? Colors.purple[400] : Colors.purple[600],
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Time to reflect',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: isDark ? Colors.purple[400] : Colors.purple[800],
                  ),
                ),
                Text(
                  '3 questions. 2 minutes. Close the loop on today.',
                  style: TextStyle(
                    fontSize: 12,
                    color: isDark ? Colors.purple[300] : Colors.purple[600],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
