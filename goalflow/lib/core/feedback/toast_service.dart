import 'dart:async';
import 'dart:collection';
import 'package:flutter/material.dart';
import '../../widgets/goalflow_toast.dart';

class _ToastConfig {
  final String message;
  final ToastType type;
  final String? actionLabel;
  final VoidCallback? onAction;
  final Duration duration;

  _ToastConfig({
    required this.message,
    required this.type,
    this.actionLabel,
    this.onAction,
    required this.duration,
  });
}

class ToastService {
  static final ToastService _instance = ToastService._internal();
  factory ToastService() => _instance;
  ToastService._internal();

  static ToastService get instance => _instance;

  OverlayState? _overlayState;
  final Queue<_ToastConfig> _queue = Queue<_ToastConfig>();
  bool _isShowing = false;
  OverlayEntry? _currentEntry;
  Timer? _dismissTimer;

  static void init(OverlayState overlay) {
    _instance._overlayState = overlay;
  }

  static void show({
    required String message,
    ToastType type = ToastType.info,
    String? actionLabel,
    VoidCallback? onAction,
    Duration? duration,
  }) {
    final config = _ToastConfig(
      message: message,
      type: type,
      actionLabel: actionLabel,
      onAction: onAction,
      duration: duration ?? _getDefaultDuration(type),
    );

    _instance._queue.add(config);
    _instance._processQueue();
  }

  static void success(String message, {String? actionLabel, VoidCallback? onAction}) =>
      show(message: message, type: ToastType.success, actionLabel: actionLabel, onAction: onAction);

  static void error(String message, {String? actionLabel, VoidCallback? onAction}) =>
      show(message: message, type: ToastType.error, actionLabel: actionLabel, onAction: onAction, duration: const Duration(seconds: 100)); // Persistent-ish

  static void warning(String message) =>
      show(message: message, type: ToastType.warning);

  static void info(String message) =>
      show(message: message, type: ToastType.info);

  static void streak(String message) =>
      show(message: message, type: ToastType.streak);

  static Duration _getDefaultDuration(ToastType type) {
    switch (type) {
      case ToastType.success:
      case ToastType.info:
      case ToastType.streak:
        return const Duration(seconds: 3);
      case ToastType.warning:
        return const Duration(seconds: 4);
      case ToastType.error:
        return const Duration(seconds: 10); // Longer for errors or requires manual dismiss
    }
  }

  void _processQueue() {
    if (_isShowing || _queue.isEmpty || _overlayState == null) return;

    _isShowing = true;
    final config = _queue.removeFirst();

    _currentEntry = OverlayEntry(
      builder: (context) => GoalFlowToast(
        message: config.message,
        type: config.type,
        actionLabel: config.actionLabel,
        onAction: config.onAction,
        onDismiss: () {
          _currentEntry?.remove();
          _currentEntry = null;
          _isShowing = false;
          _dismissTimer?.cancel();
          _processQueue();
        },
      ),
    );

    _overlayState!.insert(_currentEntry!);

    // Errors stay longer but not forever unless user wants. 
    // Here we auto-dismiss but error is 10s.
    _dismissTimer = Timer(config.duration, () {
      if (_isShowing && _currentEntry != null) {
        // Find a way to trigger reverse animation? 
        // For simplicity, we just remove it. 
        // In a real app we might use a GlobalKey to call dismiss() on the state.
        _removeEntry();
      }
    });
  }

  void _removeEntry() {
    if (_currentEntry != null) {
      _currentEntry?.remove();
      _currentEntry = null;
      _isShowing = false;
      _processQueue();
    }
  }
}
