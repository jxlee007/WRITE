import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

enum ToastType { success, error, warning, info, streak }

class GoalFlowToast extends StatefulWidget {
  final String message;
  final ToastType type;
  final String? actionLabel;
  final VoidCallback? onAction;
  final VoidCallback onDismiss;

  const GoalFlowToast({
    super.key,
    required this.message,
    required this.type,
    this.actionLabel,
    this.onAction,
    required this.onDismiss,
  });

  @override
  State<GoalFlowToast> createState() => _GoalFlowToastState();
}

class _GoalFlowToastState extends State<GoalFlowToast> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _offsetAnimation;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );

    _offsetAnimation = Tween<Offset>(
      begin: const Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutCubic,
    ));

    _fadeAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeIn,
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> dismiss() async {
    await _controller.reverse();
    widget.onDismiss();
  }

  @override
  Widget build(BuildContext context) {
    // Styling based on type
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    Color bgColor;
    Color borderColor;
    Color iconBgColor;
    Color iconColor;
    IconData iconData;

    switch (widget.type) {
      case ToastType.success:
        bgColor = isDark ? const Color(0xFF064E3B) : const Color(0xFFECFDF5);
        borderColor = isDark ? const Color(0xFF065F46) : const Color(0xFFA7F3D0);
        iconBgColor = isDark ? const Color(0xFF065F46) : const Color(0xFFD1FAE5);
        iconColor = isDark ? const Color(0xFF34D399) : const Color(0xFF047857);
        iconData = LucideIcons.checkCircle;
        break;
      case ToastType.error:
        bgColor = isDark ? const Color(0xFF451A1A) : const Color(0xFFFFF1F1);
        borderColor = isDark ? const Color(0xFF7F1D1D) : const Color(0xFFFECACA);
        iconBgColor = isDark ? const Color(0xFF7F1D1D) : const Color(0xFFFEE2E2);
        iconColor = isDark ? const Color(0xFFF87171) : const Color(0xFFB91C1C);
        iconData = LucideIcons.alertCircle;
        break;
      case ToastType.warning:
        bgColor = isDark ? const Color(0xFF451A03) : const Color(0xFFFFFBEB);
        borderColor = isDark ? const Color(0xFF78350F) : const Color(0xFFFDE68A);
        iconBgColor = isDark ? const Color(0xFF78350F) : const Color(0xFFFEF3C7);
        iconColor = isDark ? const Color(0xFFFBBF24) : const Color(0xFFB45309);
        iconData = LucideIcons.alertTriangle;
        break;
      case ToastType.streak:
        bgColor = isDark ? const Color(0xFF431407) : const Color(0xFFFFF7ED);
        borderColor = isDark ? const Color(0xFF7C2D12) : const Color(0xFFFED7AA);
        iconBgColor = isDark ? const Color(0xFF7C2D12) : const Color(0xFFFFEDD5);
        iconColor = isDark ? const Color(0xFFFB923C) : const Color(0xFFC2410C);
        iconData = LucideIcons.flame;
        break;
      case ToastType.info:
        bgColor = isDark ? const Color(0xFF1E3A8A) : const Color(0xFFEFF6FF);
        borderColor = isDark ? const Color(0xFF1E40AF) : const Color(0xFFBFDBFE);
        iconBgColor = isDark ? const Color(0xFF1E40AF) : const Color(0xFFDBEAFE);
        iconColor = isDark ? const Color(0xFF60A5FA) : const Color(0xFF1D4ED8);
        iconData = LucideIcons.info;
        break;
    }

    final textColor = isDark ? Colors.white : const Color(0xFF0F172A);

    return SafeArea(
      child: Center(
        child: Padding(
          padding: const EdgeInsets.only(bottom: 100),
          child: SlideTransition(
            position: _offsetAnimation,
            child: FadeTransition(
              opacity: _fadeAnimation,
              child: Material(
                color: Colors.transparent,
                child: Container(
                  width: MediaQuery.of(context).size.width * 0.9,
                  constraints: const BoxConstraints(maxWidth: 360),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: bgColor,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: borderColor, width: 0.5),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.08),
                        blurRadius: 12,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(
                          color: iconBgColor,
                          shape: BoxShape.circle,
                        ),
                        child: Icon(iconData, color: iconColor, size: 20),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          widget.message,
                          style: TextStyle(
                            color: textColor,
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                      if (widget.actionLabel != null)
                        TextButton(
                          onPressed: () {
                            widget.onAction?.call();
                            dismiss();
                          },
                          child: Text(
                            widget.actionLabel!,
                            style: TextStyle(
                              color: iconColor,
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      IconButton(
                        onPressed: dismiss,
                        icon: const Icon(LucideIcons.x, size: 16),
                        color: isDark ? Colors.white54 : Colors.black45,
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
