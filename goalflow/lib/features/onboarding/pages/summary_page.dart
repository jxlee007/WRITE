import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../onboarding_provider.dart';

class SummaryPage extends StatelessWidget {
  final VoidCallback onFinish;

  const SummaryPage({super.key, required this.onFinish});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<OnboardingProvider>();
    final previewSlots = provider.generateRoutine();
    
    // Pick 6 key slots for preview
    final indices = [0, 1, 3, 5, 7, 10]; // 0=Wake, 1=Hustle, 3=Fitness, 5=Job/Creative, 7=Exam/Hustle2, 10=Sleep
    final filtered = indices.where((i) => i < previewSlots.length).map((i) => previewSlots[i]).toList();

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 48.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Your routine is ready.',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            "Built around your wake time and priorities.\nYou can edit any slot anytime.",
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
          const SizedBox(height: 40),
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Theme.of(context).brightness == Brightness.dark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(24),
              ),
              child: ListView.separated(
                itemCount: filtered.length,
                separatorBuilder: (context, index) => const Divider(height: 24, thickness: 0.5),
                itemBuilder: (context, index) {
                  final slot = filtered[index];
                  final cell = slot.rows[0]; // Monday as representative
                  
                  // Extract start time only from "HH:mm AM – HH:mm AM"
                  final startTime = slot.label.split(' – ')[0];
                  
                  return Row(
                    children: [
                      SizedBox(
                        width: 70,
                        child: Text(
                          startTime,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF10B981),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            cell.text,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Row(
                            children: [
                              Container(
                                width: 8,
                                height: 8,
                                decoration: BoxDecoration(
                                  color: _getCategoryColor(cell.cls),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: 6),
                              Text(
                                cell.sub,
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey.shade500,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  );
                },
              ),
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: onFinish,
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
              "Start GoalFlow",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }

  Color _getCategoryColor(String cls) {
    switch (cls) {
      case 'sleep': return Colors.indigo;
      case 'hustle': return Colors.orange;
      case 'write': return Colors.teal;
      case 'fit': return Colors.pink;
      case 'prep': return Colors.amber;
      case 'work': return Colors.blue;
      case 'exam': return Colors.red;
      case 'chore': return Colors.brown;
      default: return Colors.grey;
    }
  }
}
