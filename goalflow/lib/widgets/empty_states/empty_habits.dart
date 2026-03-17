import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

class EmptyHabits extends StatelessWidget {
  final VoidCallback onSetUpRoutine;
  final VoidCallback onAddQuickTask;

  const EmptyHabits({
    super.key,
    required this.onSetUpRoutine,
    required this.onAddQuickTask,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomPaint(
            size: const Size(120, 120),
            painter: _HabitIllustrationPainter(isDark: isDark),
          ),
          const SizedBox(height: 24),
          Text(
            'Nothing scheduled yet',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: isDark ? Colors.blueGrey[200] : Colors.blueGrey[800],
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Your routine matrix is empty for today.\nSet up your week to see tasks here.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              height: 1.6,
              color: isDark ? Colors.white38 : Colors.black38,
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: 200,
            height: 48,
            child: ElevatedButton(
              onPressed: onSetUpRoutine,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.emeraldPrimary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                elevation: 0,
              ),
              child: const Text(
                'Set up routine',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: onAddQuickTask,
            child: Text(
              'Or add a quick task',
              style: TextStyle(
                color: isDark ? Colors.white54 : Colors.black54,
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _HabitIllustrationPainter extends CustomPainter {
  final bool isDark;

  _HabitIllustrationPainter({required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final rectSize = 80.0;
    final rect = Rect.fromCenter(center: center, width: rectSize, height: rectSize);
    final RRect rrect = RRect.fromRectAndRadius(rect, const Radius.circular(20));

    final paint = Paint()
      ..color = isDark ? Colors.blueGrey[700]! : Colors.blueGrey[200]!
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    // Draw the rounded square outline
    canvas.drawRRect(rrect, paint);

    // Draw dotted interior (simplified as small dots)
    final dotPaint = Paint()
      ..color = isDark ? Colors.white10 : Colors.black12
      ..style = PaintingStyle.fill;

    const spacing = 16.0;
    for (double x = rect.left + 12; x < rect.right; x += spacing) {
      for (double y = rect.top + 12; y < rect.bottom; y += spacing) {
        canvas.drawCircle(Offset(x, y), 2, dotPaint);
      }
    }

    // Draw sparkles
    final sparklePaint = Paint()
      ..color = AppColors.emeraldPrimary
      ..style = PaintingStyle.fill;

    final sparkleOffsets = [
      Offset(center.dx + 45, center.dy - 35),
      Offset(center.dx + 55, center.dy - 15),
      Offset(center.dx + 35, center.dy - 50),
    ];

    for (final offset in sparkleOffsets) {
      canvas.drawCircle(offset, 3, sparklePaint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
