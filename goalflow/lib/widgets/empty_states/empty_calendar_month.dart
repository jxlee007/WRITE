import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

class EmptyCalendarMonth extends StatelessWidget {
  final DateTime viewDate;
  final VoidCallback onGoToToday;

  const EmptyCalendarMonth({
    super.key,
    required this.viewDate,
    required this.onGoToToday,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final now = DateTime.now();
    final isFuture = viewDate.year > now.year || (viewDate.year == now.year && viewDate.month > now.month);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 48),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomPaint(
            size: const Size(120, 100),
            painter: _CalendarIllustrationPainter(isDark: isDark),
          ),
          const SizedBox(height: 24),
          Text(
            'No data for this month',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: isDark ? Colors.blueGrey[200] : Colors.blueGrey[800],
            ),
          ),
          const SizedBox(height: 8),
          Text(
            isFuture
                ? 'Keep your streak going and\nthis month will fill itself.'
                : 'Complete daily habits and save the day\nto build your consistency map.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              height: 1.6,
              color: isDark ? Colors.white38 : Colors.black38,
            ),
          ),
          if (!isFuture) ...[
            const SizedBox(height: 24),
            SizedBox(
              width: 160,
              height: 48,
              child: ElevatedButton(
                onPressed: onGoToToday,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.emeraldPrimary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  elevation: 0,
                ),
                child: const Text(
                  'Go to today',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _CalendarIllustrationPainter extends CustomPainter {
  final bool isDark;

  _CalendarIllustrationPainter({required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final rectWidth = 100.0;
    final rectHeight = 80.0;
    final rect = Rect.fromCenter(center: center, width: rectWidth, height: rectHeight);
    final RRect rrect = RRect.fromRectAndRadius(rect, const Radius.circular(12));

    final paint = Paint()
      ..color = isDark ? Colors.blueGrey[700]! : Colors.blueGrey[100]!
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    // Draw the calendar rounded rect outline
    canvas.drawRRect(rrect, paint);

    // Draw grid lines (simplified as small rounded rects)
    final gridPaint = Paint()
      ..color = isDark ? Colors.white10 : Colors.black.withValues(alpha: 0.05)
      ..style = PaintingStyle.fill;

    final cellWidth = 10.0;
    final cellHeight = 8.0;
    const spacingX = 14.0;
    const spacingY = 12.0;

    for (int row = 0; row < 3; row++) {
      for (int col = 0; col < 5; col++) {
        final cellLeft = rect.left + 14 + (col * spacingX);
        final cellTop = rect.top + 20 + (row * spacingY);
        canvas.drawRRect(
          RRect.fromLTRBR(cellLeft, cellTop, cellLeft + cellWidth, cellTop + cellHeight, const Radius.circular(2)),
          gridPaint,
        );
      }
    }

    // Draw one emerald dot in the corner
    final dotPaint = Paint()
      ..color = AppColors.emeraldPrimary
      ..style = PaintingStyle.fill;
    
    canvas.drawCircle(Offset(rect.right - 14, rect.bottom - 12), 3, dotPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
