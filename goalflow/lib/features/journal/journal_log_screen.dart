import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:intl/intl.dart';
import 'journal_log_provider.dart';
import '../../core/models/journal_entry.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/theme_notifier.dart';

class JournalLogScreen extends StatelessWidget {
  const JournalLogScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = context.watch<ThemeNotifier>().isDark;

    return ChangeNotifierProvider(
      create: (_) => JournalLogProvider(),
      child: Consumer<JournalLogProvider>(
        builder: (context, provider, _) {
          return Scaffold(
            backgroundColor: isDark ? AppColors.bgDark : AppColors.bgLight,
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0,
              leading: IconButton(
                icon: Icon(LucideIcons.arrowLeft, color: isDark ? Colors.white : Colors.black87),
                onPressed: () => context.pop(),
              ),
              title: Text(
                'Journal Log',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : Colors.black87,
                ),
              ),
              actions: [
                IconButton(
                  icon: Icon(LucideIcons.refreshCw, size: 20, color: isDark ? Colors.white70 : Colors.black54),
                  onPressed: () => provider.refresh(),
                ),
                const SizedBox(width: 8),
              ],
            ),
            body: _buildBody(provider, isDark),
          );
        },
      ),
    );
  }

  Widget _buildBody(JournalLogProvider provider, bool isDark) {
    if (provider.isLoading) {
      return const Center(
        child: CircularProgressIndicator(color: AppColors.emeraldPrimary),
      );
    }

    if (provider.entries.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(LucideIcons.bookOpen, size: 48, color: isDark ? Colors.white12 : Colors.black12),
            const SizedBox(height: 16),
            Text(
              'No entries yet',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: isDark ? Colors.white38 : Colors.black38,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Save your first day to see it here.',
              style: TextStyle(
                fontSize: 14,
                color: isDark ? Colors.white24 : Colors.black26,
              ),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 120),
      itemCount: provider.entries.length,
      itemBuilder: (context, index) => _EntryCard(
        entry: provider.entries[index],
        isDark: isDark,
      ),
    );
  }
}

class _EntryCard extends StatelessWidget {
  final JournalEntry entry;
  final bool isDark;

  const _EntryCard({required this.entry, required this.isDark});

  String _formatEntryDate(DateTime date) {
    return DateFormat('EEEE, MMM d').format(date);
  }

  String _relativeDate(DateTime date) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final entryDate = DateTime(date.year, date.month, date.day);
    final diff = today.difference(entryDate).inDays;

    if (diff == 0) return 'Today';
    if (diff == 1) return 'Yesterday';
    return '$diff days ago';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.05),
        ),
        boxShadow: [
          if (!isDark)
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.02),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Date header row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                _formatEntryDate(entry.date),
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: AppColors.emeraldPrimary,
                ),
              ),
              Text(
                _relativeDate(entry.date),
                style: TextStyle(
                  fontSize: 11,
                  color: isDark ? Colors.white38 : Colors.black38,
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),
          Divider(height: 1, color: isDark ? Colors.white10 : Colors.black.withValues(alpha: 0.05)),
          const SizedBox(height: 16),

          // Three journal fields
          if (entry.wentWell.isNotEmpty)
            _buildField(
              'Positive Outcomes',
              entry.wentWell,
              LucideIcons.sun,
              Colors.amber,
              isDark,
            ),
          if (entry.couldImprove.isNotEmpty)
            _buildField(
              'Improvement Vectors',
              entry.couldImprove,
              LucideIcons.trendingUp,
              Colors.blue,
              isDark,
            ),
          if (entry.tomorrowGoal.isNotEmpty)
            _buildField(
              'Next Objective',
              entry.tomorrowGoal,
              LucideIcons.target,
              AppColors.emeraldPrimary,
              isDark,
            ),
        ],
      ),
    );
  }

  Widget _buildField(String label, String content, IconData icon, Color color, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 28,
            height: 28,
            decoration: BoxDecoration(
              color: color.withValues(alpha: isDark ? 0.15 : 0.10),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, size: 14, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label.toUpperCase(),
                  style: TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                    color: isDark ? Colors.white38 : Colors.black38,
                    letterSpacing: 1.2,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  content,
                  style: TextStyle(
                    fontSize: 13,
                    height: 1.5,
                    color: isDark ? Colors.white : Colors.black87,
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
