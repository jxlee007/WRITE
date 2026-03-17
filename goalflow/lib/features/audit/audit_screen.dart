import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../widgets/empty_states/empty_audit_nudge.dart';
import 'audit_provider.dart';
import '../../core/services/submit_notifier.dart';
import '../../core/models/audit_item.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/theme_notifier.dart';

class AuditScreen extends StatelessWidget {
  const AuditScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => AuditProvider(context.read<SubmitNotifier>()),
      child: const _AuditScreenContent(),
    );
  }
}

class _AuditScreenContent extends StatelessWidget {
  const _AuditScreenContent();

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AuditProvider>();
    final themeNotifier = context.watch<ThemeNotifier>();
    final isDark = themeNotifier.isDark;

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Text(
                'Audit Hub',
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : Colors.black87,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Measure your vital metrics',
                style: TextStyle(
                  fontSize: 14,
                  fontStyle: FontStyle.italic,
                  color: isDark ? Colors.white60 : Colors.black45,
                ),
              ),
              const SizedBox(height: 24),
              if (provider.showNudge) ...[
                EmptyAuditNudge(
                  onDismiss: provider.dismissNudge,
                ),
                const SizedBox(height: 24),
              ],

              // Categories
              ...provider.categories.entries.map((entry) {
                return _buildCategorySection(context, entry.key, entry.value, provider, isDark);
              }),
              
              const SizedBox(height: 120), // Space for bottom nav
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCategorySection(
    BuildContext context,
    String categoryName,
    List<AuditItem> items,
    AuditProvider provider,
    bool isDark,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Category Label
        Row(
          children: [
            Text(
              '${categoryName.toUpperCase()} SECTOR',
              style: const TextStyle(
                color: AppColors.emeraldPrimary,
                fontSize: 10,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Divider(
                color: isDark ? Colors.white10 : Colors.black12,
                thickness: 1,
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),

        // List of items
        ...List.generate(items.length, (index) {
          final item = items[index];
          final metricId = '$categoryName-$index';
          final isExpanded = provider.expandedMetricId == metricId;

          return _AuditItemCard(
            category: categoryName,
            index: index,
            item: item,
            metricId: metricId,
            isExpanded: isExpanded,
            isSubmitted: provider.isSubmitted,
            onToggle: () => provider.toggleExpansion(metricId),
            onScoreChanged: (val) => provider.updateScore(categoryName, index, val),
            onCommentChanged: (val) => provider.updateComment(categoryName, index, val),
            isDark: isDark,
          );
        }),
        const SizedBox(height: 24),
      ],
    );
  }
}

class _AuditItemCard extends StatefulWidget {
  final String category;
  final int index;
  final AuditItem item;
  final String metricId;
  final bool isExpanded;
  final bool isSubmitted;
  final VoidCallback onToggle;
  final ValueChanged<int> onScoreChanged;
  final ValueChanged<String> onCommentChanged;
  final bool isDark;

  const _AuditItemCard({
    required this.category,
    required this.index,
    required this.item,
    required this.metricId,
    required this.isExpanded,
    required this.isSubmitted,
    required this.onToggle,
    required this.onScoreChanged,
    required this.onCommentChanged,
    required this.isDark,
  });

  @override
  State<_AuditItemCard> createState() => _AuditItemCardState();
}

class _AuditItemCardState extends State<_AuditItemCard> {
  late TextEditingController _commentController;

  @override
  void initState() {
    super.initState();
    _commentController = TextEditingController(text: widget.item.comment);
  }

  @override
  void didUpdateWidget(_AuditItemCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.item.comment != widget.item.comment && _commentController.text != widget.item.comment) {
      _commentController.text = widget.item.comment;
    }
  }

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: widget.isDark ? AppColors.surfaceDark : Colors.white,
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          if (!widget.isDark)
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
        ],
        border: Border.all(
          color: widget.isExpanded 
              ? AppColors.emeraldPrimary.withValues(alpha: 0.3) 
              : (widget.isDark ? Colors.white10 : Colors.black12),
        ),
      ),
      child: Opacity(
        opacity: widget.isSubmitted ? 0.6 : 1.0,
        child: Column(
          children: [
            // Header Row (Clickable)
            InkWell(
              onTap: widget.onToggle,
              borderRadius: BorderRadius.circular(32),
              child: Semantics(
                label: "${widget.item.name}, Score ${widget.item.score} out of 10. Tap to ${widget.isExpanded ? 'close' : 'open'} notes.",
                button: true,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Text(
                                widget.item.name,
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: widget.isDark ? Colors.white70 : Colors.black54,
                                ),
                              ),
                              const SizedBox(width: 4),
                              Icon(
                                widget.isExpanded ? Icons.expand_less : Icons.expand_more,
                                size: 18,
                                color: widget.isDark ? Colors.white38 : Colors.black38,
                              ),
                            ],
                          ),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.baseline,
                            textBaseline: TextBaseline.alphabetic,
                            children: [
                              Text(
                                '${widget.item.score}',
                                style: const TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.emeraldPrimary,
                                ),
                              ),
                              const Text(
                                '/10',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      // Slider
                      Semantics(
                        label: "Adjust score for ${widget.item.name}",
                        value: "${widget.item.score}",
                        child: SliderTheme(
                          data: SliderTheme.of(context).copyWith(
                            trackHeight: 4,
                            activeTrackColor: AppColors.emeraldPrimary,
                            inactiveTrackColor: widget.isDark ? Colors.white10 : Colors.black12,
                            thumbColor: AppColors.emeraldPrimary,
                            overlayColor: AppColors.emeraldPrimary.withValues(alpha: 0.1),
                            thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 12), // Larger thumb
                          ),
                          child: Slider(
                            value: widget.item.score.toDouble(),
                            min: 1,
                            max: 10,
                            divisions: 9,
                            onChanged: widget.isSubmitted 
                                ? null 
                                : (val) => widget.onScoreChanged(val.toInt()),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Expanded content (Comment area)
            AnimatedSize(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
              child: widget.isExpanded
                  ? Padding(
                      padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            decoration: BoxDecoration(
                              color: widget.isDark ? Colors.white.withValues(alpha: 0.05) : const Color(0xFFF8FAFC),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: TextField(
                              controller: _commentController,
                              maxLines: null,
                              minLines: 3,
                              enabled: !widget.isSubmitted,
                              onChanged: widget.onCommentChanged,
                              style: TextStyle(
                                fontSize: 14,
                                color: widget.isDark ? Colors.white : Colors.black87,
                              ),
                              decoration: InputDecoration(
                                border: InputBorder.none,
                                hintText: 'Add notes or details...',
                                hintStyle: TextStyle(
                                  fontSize: 14,
                                  color: widget.isDark ? Colors.white24 : Colors.black26,
                                ),
                                icon: Icon(
                                  Icons.chat_bubble_outline,
                                  size: 16,
                                  color: widget.isDark ? Colors.white24 : Colors.black26,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    )
                  : const SizedBox.shrink(),
            ),
          ],
        ),
      ),
    );
  }
}
