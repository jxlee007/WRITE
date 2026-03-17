import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../routine_provider.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/theme_notifier.dart';
import 'package:provider/provider.dart';
import '../../../widgets/pomodoro_timer.dart';

class TaskBottomSheet extends StatefulWidget {
  final int slotIndex;
  final int dayIndex;
  final dynamic slot; // RoutineSlot
  final dynamic cell; // SlotCell
  final RoutineProvider provider;

  const TaskBottomSheet({
    super.key,
    required this.slotIndex,
    required this.dayIndex,
    required this.slot,
    required this.cell,
    required this.provider,
  });

  @override
  State<TaskBottomSheet> createState() => _TaskBottomSheetState();
}

class _TaskBottomSheetState extends State<TaskBottomSheet> {
  late TextEditingController _titleController;
  late TextEditingController _descController;
  late String _selectedCategory;
  late DraggableScrollableController _sheetController;
  
  late int _parsedDuration;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.cell.text);
    _descController = TextEditingController(text: widget.cell.sub);
    _selectedCategory = widget.cell.cls;
    _parsedDuration = PomodoroTimer.parseMinutes(widget.slot.label);
    _sheetController = DraggableScrollableController();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    _sheetController.dispose();
    super.dispose();
  }

  void _expandSheet() {
    if (_sheetController.isAttached) {
      _sheetController.animateTo(
        0.9,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOutCubic,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final themeNotifier = context.watch<ThemeNotifier>();
    final isDark = themeNotifier.isDark;

    return DraggableScrollableSheet(
      initialChildSize: 0.6,
      maxChildSize: 0.9,
      minChildSize: 0.5,
      snap: true,
      snapSizes: const [0.6, 0.9],
      controller: _sheetController,
      builder: (context, scrollController) {
        return Container(
          decoration: BoxDecoration(
            color: isDark ? AppColors.bgDark : Colors.white,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
          ),
          padding: const EdgeInsets.all(24),
          child: ListView(
            controller: scrollController,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${widget.provider.dayName} | ${widget.slot.label}',
                        style: const TextStyle(
                          color: AppColors.emeraldPrimary,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1.0,
                        ),
                      ),
                    ],
                  ),
                  IconButton(
                    icon: const Icon(LucideIcons.x),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              // Editable Title
              Row(
                children: [
                   Icon(
                     AppColors.iconForCategory(_selectedCategory),
                     size: 28,
                     color: isDark ? Colors.white70 : Colors.black87,
                   ),
                   const SizedBox(width: 12),
                   Expanded(
                     child: TextField(
                       controller: _titleController,
                       onTap: _expandSheet,
                       style: TextStyle(
                         fontSize: 24,
                         fontWeight: FontWeight.bold,
                         color: isDark ? Colors.white : Colors.black87,
                       ),
                       decoration: const InputDecoration(
                         border: InputBorder.none,
                         hintText: 'Task title',
                       ),
                     ),
                   ),
                ],
              ),
              const SizedBox(height: 32),
              
              // Pomodoro Timer Section
              Center(
                child: PomodoroTimer(
                  durationMinutes: _parsedDuration,
                  taskName: _titleController.text,
                ),
              ),
              
              const SizedBox(height: 48),
              
              // Category Dropdown
              const Text(
                'CATEGORY',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.0, color: Colors.grey),
              ),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                initialValue: _selectedCategory,
                decoration: InputDecoration(
                  filled: true,
                  fillColor: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.05),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
                items: ['sleep', 'hustle', 'write', 'fit', 'prep', 'work', 'chore', 'exam', 'social', 'free'].map((c) {
                  return DropdownMenuItem(value: c, child: Text(c[0].toUpperCase() + c.substring(1)));
                }).toList(),
                onChanged: (val) => setState(() => _selectedCategory = val!),
              ),
              
              const SizedBox(height: 24),
              
              // Description
              const Text(
                'DESCRIPTION',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.0, color: Colors.grey),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: _descController,
                onTap: _expandSheet,
                maxLines: 3,
                decoration: InputDecoration(
                  hintText: 'What needs to be done?',
                  filled: true,
                  fillColor: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.05),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                ),
              ),
              
              const SizedBox(height: 40),
              
              // Actions
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        widget.provider.updateSlot(
                          widget.slotIndex,
                          widget.dayIndex,
                          text: _titleController.text,
                          sub: _descController.text,
                          cls: _selectedCategory,
                        );
                        Navigator.pop(context);
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.emeraldPrimary,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 20),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                      ),
                      child: const Text('Save Routine', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                  const SizedBox(width: 16),
                  TextButton(
                    onPressed: () {
                      widget.provider.clearSlot(widget.slotIndex, widget.dayIndex);
                      Navigator.pop(context);
                    },
                    child: const Text('Clear', style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 40),
            ],
          ),
        );
      },
    );
  }
}
