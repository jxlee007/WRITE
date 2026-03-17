import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../features/daily/daily_provider.dart';

class AddHabitSheet extends StatefulWidget {
  const AddHabitSheet({super.key});

  @override
  State<AddHabitSheet> createState() => _AddHabitSheetState();
}

class _AddHabitSheetState extends State<AddHabitSheet> {
  final TextEditingController _nameController = TextEditingController();
  String _selectedCategory = 'hustle';

  final List<Map<String, dynamic>> _categories = [
    {'id': 'hustle', 'label': 'Hustle', 'color': Colors.orange},
    {'id': 'fit', 'label': 'Fitness', 'color': Colors.blue},
    {'id': 'write', 'label': 'Writing', 'color': Colors.purple},
    {'id': 'exam', 'label': 'Exam', 'color': Colors.red},
    {'id': 'prep', 'label': 'Prep', 'color': Colors.teal},
    {'id': 'chore', 'label': 'Chore', 'color': Colors.blueGrey},
  ];

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  void _submit() {
    final name = _nameController.text.trim();
    if (name.isEmpty) return;

    context.read<DailyProvider>().addOneOffHabit(name, _selectedCategory);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bottomPadding = MediaQuery.of(context).viewInsets.bottom;

    return Container(
      padding: EdgeInsets.fromLTRB(24, 12, 24, 24 + bottomPadding),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF0F172A) : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 32,
              height: 4,
              decoration: BoxDecoration(
                color: isDark ? Colors.blueGrey[900] : Colors.blueGrey[50],
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Quick Task',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _nameController,
            autofocus: true,
            decoration: InputDecoration(
              hintText: 'What needs doing?',
              hintStyle: TextStyle(color: isDark ? Colors.white38 : Colors.black38),
              filled: true,
              fillColor: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.blueGrey[50],
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: BorderSide.none,
              ),
              contentPadding: const EdgeInsets.all(16),
            ),
            onSubmitted: (_) => _submit(),
          ),
          const SizedBox(height: 24),
          Text(
            'Category',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.5,
              color: Colors.blueGrey[600],
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _categories.map((cat) {
              final isSelected = _selectedCategory == cat['id'];
              final color = cat['color'] as Color;
              return GestureDetector(
                onTap: () => setState(() => _selectedCategory = cat['id']),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: isSelected 
                      ? color.withValues(alpha: 0.1) 
                      : (isDark ? Colors.white.withValues(alpha: 0.05) : Colors.blueGrey.withValues(alpha: 0.05)),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isSelected ? color : Colors.transparent,
                      width: 1.5,
                    ),
                  ),
                  child: Text(
                    cat['label'],
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      color: isSelected ? color : (isDark ? Colors.white38 : Colors.black45),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: _submit,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.teal[500],
                foregroundColor: Colors.white,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
              child: const Text(
                'Add to Today',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
