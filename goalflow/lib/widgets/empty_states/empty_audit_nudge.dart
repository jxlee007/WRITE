import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class EmptyAuditNudge extends StatelessWidget {
  final VoidCallback onDismiss;

  const EmptyAuditNudge({
    super.key,
    required this.onDismiss,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? Colors.amber[900]!.withValues(alpha: 0.1) : Colors.amber[50],
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isDark ? Colors.amber[800]!.withValues(alpha: 0.3) : Colors.amber[200]!,
          style: BorderStyle.solid,
        ),
      ),
      child: Stack(
        children: [
          Row(
            children: [
              Icon(
                LucideIcons.sparkles,
                size: 20,
                color: isDark ? Colors.amber[400] : Colors.amber[600],
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Rate today before you submit',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.amber[400] : Colors.amber[800],
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      "Sliders reset each day — scores aren't saved until you submit.",
                      style: TextStyle(
                        fontSize: 11,
                        color: isDark ? Colors.white54 : Colors.black54,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 24),
            ],
          ),
          Positioned(
            right: -8,
            top: -8,
            child: IconButton(
              onPressed: onDismiss,
              icon: const Icon(LucideIcons.x, size: 16),
              color: isDark ? Colors.white38 : Colors.black38,
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(),
            ),
          ),
        ],
      ),
    );
  }
}
