import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:vibration/vibration.dart';
import '../core/storage/storage_service.dart';
import '../core/notifications/notification_service.dart';
import 'pomodoro_finished_overlay.dart';

class PomodoroTimer extends StatefulWidget {
  final int durationMinutes;
  final String taskName;
  final VoidCallback? onComplete;

  const PomodoroTimer({
    super.key,
    required this.durationMinutes,
    required this.taskName,
    this.onComplete,
  });

  @override
  State<PomodoroTimer> createState() => _PomodoroTimerState();

  /// Parses duration from slot label e.g. "4:45 – 5:30 AM" -> 45
  static int parseMinutes(String label) {
    try {
      final parts = label.split(' – ');
      if (parts.length != 2) return 25;

      final startStr = parts[0].trim();
      final endStr = parts[1].trim();

      DateTime start = _parseTime(startStr);
      DateTime end = _parseTime(endStr);

      int diff = end.difference(start).inMinutes;
      if (diff <= 0) {
        // Handle overnight (e.g. 9 PM to 5 AM)
        diff += 1440;
      }
      return diff;
    } catch (e) {
      return 25;
    }
  }

  static DateTime _parseTime(String timeStr) {
    // Expected format: "4:45 AM" or "5:30"
    final clean = timeStr.toUpperCase();
    bool isPM = clean.contains('PM');
    bool isAM = clean.contains('AM');

    final timeParts = clean.replaceAll('AM', '').replaceAll('PM', '').trim().split(':');
    int hour = int.parse(timeParts[0]);
    int minute = timeParts.length > 1 ? int.parse(timeParts[1]) : 0;

    if (isPM && hour < 12) hour += 12;
    if (isAM && hour == 12) hour = 0;

    // Use a fixed reference date to calculate difference
    return DateTime(2024, 1, 1, hour, minute);
  }
}

class _PomodoroTimerState extends State<PomodoroTimer> {
  Timer? _timer;
  late int _remaining;
  late int _total;
  bool _isRunning = false;
  String _status = "Ready";
  
  final AudioPlayer _tickPlayer = AudioPlayer();
  final AudioPlayer _completePlayer = AudioPlayer();
  
  bool get _alarmSoundEnabled => StorageService.instance.isAlarmSoundEnabled();
  bool get _alarmVibrationEnabled => StorageService.instance.isAlarmVibrationEnabled();
  
  bool _showOverlay = false;

  @override
  void initState() {
    super.initState();
    _total = widget.durationMinutes * 60;
    _remaining = _total;
  }

  @override
  void dispose() {
    _timer?.cancel();
    _tickPlayer.dispose();
    _completePlayer.dispose();
    Vibration.cancel();
    super.dispose();
  }

  void _toggleTimer() {
    if (_isRunning) {
      _pause();
    } else {
      _start();
    }
  }

  void _start() {
    setState(() {
      _isRunning = true;
      _status = "Focus";
    });
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_remaining > 0) {
        setState(() {
          _remaining--;
        });
        if (_remaining <= 5 && _remaining > 0 && _alarmSoundEnabled) {
          _tickPlayer.play(AssetSource('sounds/timer_tick.mp3'), volume: 0.6);
        }
      } else {
        _onDone();
      }
    });
  }

  void _pause() {
    _timer?.cancel();
    setState(() {
      _isRunning = false;
      _status = "Paused";
    });
  }

  void _reset() {
    _timer?.cancel();
    Vibration.cancel();
    setState(() {
      _remaining = _total;
      _isRunning = false;
      _status = "Ready";
    });
  }

  void _onDone() async {
    _timer?.cancel();
    setState(() {
      _isRunning = false;
      _status = "Done";
      _remaining = 0;
      _showOverlay = true;
    });

    if (_alarmSoundEnabled) {
      _completePlayer.play(AssetSource('sounds/timer_complete.mp3'));
    }

    if (_alarmVibrationEnabled) {
      if (await Vibration.hasVibrator()) {
        Vibration.vibrate(
          pattern: [0, 400, 200, 400, 200, 800],
          intensities: [0, 255, 0, 180, 0, 255],
        );
      }
    }

    NotificationService.instance.showTimerDoneNotification(
      widget.taskName,
      widget.durationMinutes,
    );

    widget.onComplete?.call();
  }

  String _formatTime(int seconds) {
    int mins = seconds ~/ 60;
    int secs = seconds % 60;
    return '${mins.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final progress = _total > 0 ? _remaining / _total : 0.0;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Circular Ring
        Stack(
          alignment: Alignment.center,
          children: [
            CustomPaint(
              size: const Size(160, 160),
              painter: RingPainter(
                progress: progress,
                isDark: isDark,
              ),
            ),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  _formatTime(_remaining),
                  style: const TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.bold,
                    fontFeatures: [FontFeature.tabularFigures()],
                  ),
                ),
                Text(
                  _status.toUpperCase(),
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 1.2,
                    color: isDark ? Colors.blueGrey[400] : Colors.blueGrey[600],
                  ),
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 32),
        // Control Row
        Row(
          children: [
            // Reset Button
            Material(
              color: isDark ? Colors.blueGrey[800] : Colors.blueGrey[50],
              borderRadius: BorderRadius.circular(16),
              child: Semantics(
                label: "Reset focus timer",
                button: true,
                child: InkWell(
                  onTap: _reset,
                  borderRadius: BorderRadius.circular(16),
                  child: Container(
                    width: 52,
                    height: 52,
                    alignment: Alignment.center,
                    child: Icon(
                      LucideIcons.rotateCcw,
                      size: 20,
                      color: isDark ? Colors.white : Colors.blueGrey[800],
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            // Start/Pause Button
            Expanded(
              child: Material(
                color: const Color(0xFF059669), // Emerald 600
                borderRadius: BorderRadius.circular(16),
                child: Semantics(
                  label: _isRunning ? "Pause focus timer" : "Start focus timer",
                  button: true,
                  child: InkWell(
                    onTap: _toggleTimer,
                    borderRadius: BorderRadius.circular(16),
                    child: Container(
                      height: 52,
                      alignment: Alignment.center,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            _isRunning ? LucideIcons.pause : LucideIcons.play,
                            size: 20,
                            color: Colors.white,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            _isRunning
                                ? "Pause"
                                : (_remaining < _total ? "Resume" : "Start"),
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
        if (_showOverlay)
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: PomodoroFinishedOverlay(
              taskName: widget.taskName,
              durationMins: widget.durationMinutes,
              onDone: () {
                setState(() {
                  _showOverlay = false;
                });
              },
            ),
          ),
      ],
    );
  }
}

class RingPainter extends CustomPainter {
  final double progress;
  final bool isDark;

  RingPainter({required this.progress, required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = math.min(size.width, size.height) / 2;

    // Background circle
    final bgPaint = Paint()
      ..color = isDark ? Colors.blueGrey[800]! : Colors.blueGrey[100]!
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4;

    canvas.drawCircle(center, radius, bgPaint);

    // Progress arc
    if (progress > 0) {
      final progressPaint = Paint()
        ..color = const Color(0xFF10B981) // Emerald 500
        ..style = PaintingStyle.stroke
        ..strokeWidth = 6
        ..strokeCap = StrokeCap.round;

      // Start from 12 o'clock (-pi/2) and sweep clockwise
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        -math.pi / 2,
        2 * math.pi * progress,
        false,
        progressPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant RingPainter oldDelegate) {
    return oldDelegate.progress != progress || oldDelegate.isDark != isDark;
  }
}
