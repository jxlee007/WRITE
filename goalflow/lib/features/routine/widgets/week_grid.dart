import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../routine_provider.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/theme_notifier.dart';
import 'task_bottom_sheet.dart';

class WeekGrid extends StatefulWidget {
  const WeekGrid({super.key});

  @override
  State<WeekGrid> createState() => _WeekGridState();
}

class _WeekGridState extends State<WeekGrid> {
  final ScrollController _headerScrollController = ScrollController();
  final ScrollController _dataScrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _dataScrollController.addListener(() {
      if (_headerScrollController.hasClients &&
          _headerScrollController.offset != _dataScrollController.offset) {
        _headerScrollController.jumpTo(_dataScrollController.offset);
      }
    });
  }

  @override
  void dispose() {
    _headerScrollController.dispose();
    _dataScrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<RoutineProvider>();
    final themeNotifier = context.watch<ThemeNotifier>();
    final isDark = themeNotifier.isDark;
    
    final slots = provider.slots;
    final days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return Column(
      children: [
        // Headers
        Row(
          children: [
            const SizedBox(width: 96), // Time column spacer
            Expanded(
              child: SingleChildScrollView(
                controller: _headerScrollController,
                scrollDirection: Axis.horizontal,
                physics: const ClampingScrollPhysics(),
                child: Row(
                  children: days.map((day) => Container(
                    width: 100,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    alignment: Alignment.center,
                    child: Text(
                      day,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.white70 : const Color(0xFF1E293B),
                      ),
                    ),
                  )).toList(),
                ),
              ),
            ),
          ],
        ),
        
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.only(bottom: 120),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Sticky Time Column
                Column(
                  children: slots.map((slot) {
                    final parts = slot.label.split(' – ');
                    return Container(
                      width: 96,
                      height: 100,
                      padding: const EdgeInsets.only(left: 16, top: 12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(parts[0], style: const TextStyle(fontSize: 10, color: Colors.grey)),
                          const SizedBox(height: 4),
                          if (parts.length > 1) 
                            Text(parts[1], style: const TextStyle(fontSize: 10, color: Colors.grey)),
                        ],
                      ),
                    );
                  }).toList(),
                ),

                // Scrollable Grid
                Expanded(
                  child: SingleChildScrollView(
                    controller: _dataScrollController,
                    scrollDirection: Axis.horizontal,
                    physics: const ClampingScrollPhysics(),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: List.generate(7, (dayIndex) {
                        return Column(
                          children: List.generate(slots.length, (slotIndex) {
                            final slot = slots[slotIndex];
                            final cell = slot.rows[dayIndex];
                            final catColor = AppColors.forCategory(cell.cls, isDark);

                            return GestureDetector(
                              onTap: () {
                                showModalBottomSheet(
                                  context: context,
                                  isScrollControlled: true,
                                  backgroundColor: Colors.transparent,
                                  builder: (_) => TaskBottomSheet(
                                    dayIndex: dayIndex,
                                    slotIndex: slotIndex,
                                    slot: slot,
                                    cell: cell,
                                    provider: provider,
                                  ),
                                );
                              },
                              child: Container(
                                width: 100,
                                height: 100,
                                margin: const EdgeInsets.all(2),
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: catColor.bg,
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: catColor.border),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      cell.text,
                                      style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.bold,
                                        color: catColor.text,
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      cell.sub,
                                      style: TextStyle(
                                        fontSize: 8,
                                        color: catColor.text.withValues(alpha: 0.8),
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }),
                        );
                      }),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
