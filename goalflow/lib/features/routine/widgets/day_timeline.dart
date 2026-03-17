import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../routine_provider.dart';
import '../../../core/theme/app_colors.dart';
import 'task_bottom_sheet.dart';

class DayTimeline extends StatelessWidget {
  final RoutineProvider provider;
  final bool isDark;

  const DayTimeline({
    super.key,
    required this.provider,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    if (provider.slots.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    return GestureDetector(
      onHorizontalDragEnd: (details) {
        if (details.primaryVelocity == null) return;
        if (details.primaryVelocity! < -500) {
          // Swipe Left -> Next Day
          provider.setCurrentDay(provider.currentDayIndex + 1);
        } else if (details.primaryVelocity! > 500) {
          // Swipe Right -> Previous Day
          provider.setCurrentDay(provider.currentDayIndex - 1);
        }
      },
      child: Column(
        children: [
          // Day Navigation
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  icon: const Icon(LucideIcons.chevronLeft),
                  onPressed: () => provider.setCurrentDay(provider.currentDayIndex - 1),
                  color: isDark ? Colors.white70 : Colors.black54,
                ),
                const SizedBox(width: 16),
                SizedBox(
                  width: 120,
                  child: Center(
                    child: Text(
                      provider.dayName,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.white : Colors.black87,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                IconButton(
                  icon: const Icon(LucideIcons.chevronRight),
                  onPressed: () => provider.setCurrentDay(provider.currentDayIndex + 1),
                  color: isDark ? Colors.white70 : Colors.black54,
                ),
              ],
            ),
          ),
          // Timeline List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.fromLTRB(24, 0, 24, 120),
              itemCount: provider.slots.length,
              itemBuilder: (context, index) {
                final slot = provider.slots[index];
                final cell = slot.rows[provider.currentDayIndex];
                final isLast = index == provider.slots.length - 1;

                return IntrinsicHeight(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Time Label (Left)
                      SizedBox(
                        width: 64,
                        child: Padding(
                          padding: const EdgeInsets.only(top: 8),
                          child: _buildTimeLabel(slot.label, isDark),
                        ),
                      ),
                      // Timeline Connector & Dot (Center)
                      Column(
                        children: [
                          _buildDot(cell.cls, isDark),
                          if (!isLast)
                            Expanded(
                              child: Container(
                                width: 2,
                                color: isDark ? Colors.white12 : Colors.black12,
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(width: 16),
                      // Tappable Card (Right)
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.only(bottom: 24),
                          child: _buildTaskCard(context, index, cell, isDark),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimeLabel(String label, bool isDark) {
    final parts = label.split(' – ');
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Text(
          parts[0],
          style: TextStyle(
            fontSize: 10,
            color: isDark ? Colors.white38 : Colors.black38,
            fontWeight: FontWeight.w600,
          ),
        ),
        if (parts.length > 1) ...[
          const SizedBox(height: 2),
          Text(
             parts[1],
             style: TextStyle(
               fontSize: 10,
               color: isDark ? Colors.white38 : Colors.black38,
               fontWeight: FontWeight.w600,
             ),
          ),
        ],
      ],
    );
  }

  Widget _buildDot(String category, bool isDark) {
    final iconData = AppColors.iconForCategory(category);
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : Colors.white,
        shape: BoxShape.circle,
        border: Border.all(
          color: isDark ? Colors.white12 : Colors.black12,
          width: 1,
        ),
      ),
      child: Center(
        child: Icon(
          iconData,
          size: 16,
          color: isDark ? Colors.white70 : Colors.black87,
        ),
      ),
    );
  }

  Widget _buildTaskCard(BuildContext context, int slotIndex, cell, bool isDark) {
    final catColors = AppColors.forCategory(cell.cls, isDark);
    
    return GestureDetector(
      onTap: () {
        showModalBottomSheet(
          context: context,
          isScrollControlled: true,
          backgroundColor: Colors.transparent,
          builder: (context) => TaskBottomSheet(
            slotIndex: slotIndex,
            dayIndex: provider.currentDayIndex,
            slot: provider.slots[slotIndex],
            cell: cell,
            provider: provider,
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: catColors.bg,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: catColors.border, width: 1),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              cell.text,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: catColors.text,
              ),
            ),
            if (cell.sub.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(
                cell.sub,
                style: TextStyle(
                  fontSize: 12,
                  color: catColors.text.withValues(alpha: 0.7),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
