import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../core/notifications/notification_service.dart';

class FullScreenTimerPage extends StatefulWidget {
  final int totalSeconds;
  final String taskName;
  final VoidCallback? onCancel;
  final VoidCallback? onComplete;

  const FullScreenTimerPage({
    super.key,
    required this.totalSeconds,
    required this.taskName,
    this.onCancel,
    this.onComplete,
  });

  @override
  State<FullScreenTimerPage> createState() => _FullScreenTimerPageState();
}

class _FullScreenTimerPageState extends State<FullScreenTimerPage>
    with TickerProviderStateMixin {
  Timer? _timer;
  late int _remaining;
  bool _isPaused = false;
  late AnimationController _ringController;

  @override
  void initState() {
    super.initState();
    _remaining = widget.totalSeconds;
    _ringController = AnimationController(
      vsync: this,
      duration: Duration(seconds: widget.totalSeconds),
    );
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (mounted) {
        setState(() {
          if (_remaining > 0) {
            _remaining--;
          } else {
            t.cancel();
            _onDone();
          }
        });
      }
    });
    _ringController.reverse(from: _remaining / widget.totalSeconds);
  }

  void _pause() {
    _timer?.cancel();
    _ringController.stop();
    setState(() {
      _isPaused = true;
    });
  }

  void _resume() {
    _startTimer();
    setState(() {
      _isPaused = false;
    });
  }

  void _cancel() {
    _timer?.cancel();
    Navigator.of(context).pop();
    widget.onCancel?.call();
  }

  void _onDone() {
    _ringController.stop();
    // Play alarm and show notification
    NotificationService.instance.showTimerDoneNotification(
      widget.taskName.isEmpty ? 'Focus Session' : widget.taskName,
      widget.totalSeconds ~/ 60,
    );
    
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        Navigator.of(context).pop();
        widget.onComplete?.call();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _ringController.dispose();
    super.dispose();
  }

  String _formatHoursMin(int totalSecs) {
    final h = totalSecs ~/ 3600;
    final m = (totalSecs % 3600) ~/ 60;
    if (h > 0) {
      return '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')}';
    }
    return m.toString().padLeft(2, '0');
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      child: Scaffold(
        backgroundColor: Colors.black,
        body: SafeArea(
          child: Column(
            children: [
              // Top spacer
              const Expanded(flex: 1, child: SizedBox()),

              // Ring + countdown (center)
              Expanded(
                flex: 5,
                child: Center(
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Progress ring
                      AnimatedBuilder(
                        animation: _ringController,
                        builder: (context, child) {
                          // The controller goes from 1.0 to 0.0
                          return CustomPaint(
                            size: const Size(280, 280),
                            painter: FullScreenRingPainter(
                              progress: _remaining / widget.totalSeconds,
                            ),
                          );
                        },
                      ),

                      // Time display
                      Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          RichText(
                            text: TextSpan(
                              children: [
                                TextSpan(
                                  text: _formatHoursMin(_remaining),
                                  style: const TextStyle(
                                    fontSize: 64,
                                    fontWeight: FontWeight.w200,
                                    color: Colors.white,
                                    fontFeatures: [FontFeature.tabularFigures()],
                                  ),
                                ),
                                TextSpan(
                                  text: ':${(_remaining % 60).toString().padLeft(2, '0')}',
                                  style: const TextStyle(
                                    fontSize: 64,
                                    fontWeight: FontWeight.w200,
                                    color: Color(0xFFE74C3C),
                                    fontFeatures: [FontFeature.tabularFigures()],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 12),
                          Text(
                            widget.taskName.isEmpty
                                ? 'focus session'
                                : widget.taskName.toLowerCase(),
                            style: const TextStyle(
                              fontSize: 16,
                              color: Colors.white38,
                              letterSpacing: 1.2,
                            ),
                          ),
                          const SizedBox(height: 4),
                          const Text(
                            'skip max',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.white24,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              // Bottom buttons
              Padding(
                padding: EdgeInsets.fromLTRB(
                  24,
                  0,
                  24,
                  32 + MediaQuery.of(context).padding.bottom,
                ),
                child: Row(
                  children: [
                    // Cancel button
                    Expanded(
                      child: OutlinedButton(
                        onPressed: _cancel,
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.white70,
                          side: const BorderSide(color: Color(0xFF3D1A1A), width: 1),
                          backgroundColor: const Color(0xFF1A0A0A),
                          minimumSize: const Size.fromHeight(64),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                        child: const Text(
                          'Cancel',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    // Pause / Resume button
                    Expanded(
                      child: ElevatedButton(
                        onPressed: _isPaused ? _resume : _pause,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFE74C3C),
                          foregroundColor: Colors.white,
                          minimumSize: const Size.fromHeight(64),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          elevation: 0,
                        ),
                        child: Text(
                          _isPaused ? 'Resume' : 'Pause',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FullScreenRingPainter extends CustomPainter {
  final double progress; // 0.0 to 1.0
  const FullScreenRingPainter({required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - 10;

    // Background ring (dim)
    canvas.drawCircle(
      center,
      radius,
      Paint()
        ..color = const Color(0xFF1A0505)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2,
    );

    // Progress arc (red, clockwise from top)
    final sweepAngle = 2 * math.pi * progress;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      sweepAngle,
      false,
      Paint()
        ..color = const Color(0xFFE74C3C)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(FullScreenRingPainter old) => old.progress != progress;
}
