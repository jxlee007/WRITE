import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../onboarding_provider.dart';

class FocusAreasPage extends StatelessWidget {
  final VoidCallback onContinue;

  const FocusAreasPage({super.key, required this.onContinue});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<OnboardingProvider>();
    final areas = [
      {'label': 'Side hustle', 'icon': Icons.rocket_launch_rounded},
      {'label': 'Writing', 'icon': Icons.edit_note_rounded},
      {'label': 'Fitness', 'icon': Icons.fitness_center_rounded},
      {'label': 'Exam prep', 'icon': Icons.menu_book_rounded},
      {'label': 'Sleep quality', 'icon': Icons.nights_stay_rounded},
      {'label': 'Life & chores', 'icon': Icons.home_rounded},
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 48.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'What matters most to you?',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            "Select all that apply.",
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
          const SizedBox(height: 48),
          Expanded(
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 1.2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
              ),
              itemCount: areas.length,
              itemBuilder: (context, index) {
                final area = areas[index];
                final label = area['label'] as String;
                final icon = area['icon'] as IconData;
                final isSelected = provider.focusAreas.contains(label);
                
                return GestureDetector(
                  onTap: () => provider.toggleFocusArea(label),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    decoration: BoxDecoration(
                      color: isSelected ? const Color(0xFF10B981).withValues(alpha: 0.1) : (Theme.of(context).brightness == Brightness.dark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9)),
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(
                        color: isSelected ? const Color(0xFF10B981) : Colors.transparent,
                        width: 2,
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          icon,
                          size: 32,
                          color: isSelected ? const Color(0xFF10B981) : (Theme.of(context).brightness == Brightness.dark ? Colors.white54 : const Color(0xFF94A3B8)),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          label,
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: isSelected ? const Color(0xFF10B981) : (Theme.of(context).brightness == Brightness.dark ? Colors.white70 : const Color(0xFF334155)),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: onContinue,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 64),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(32),
              ),
              elevation: 0,
            ),
            child: const Text(
              "Continue",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}
