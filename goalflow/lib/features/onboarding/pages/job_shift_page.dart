import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../onboarding_provider.dart';

class JobShiftPage extends StatelessWidget {
  final VoidCallback onContinue;

  const JobShiftPage({super.key, required this.onContinue});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<OnboardingProvider>();
    final shifts = [
      'No job',
      '9AM–5PM',
      '10AM–6PM',
      '12PM–8PM',
      'Night shift',
      'WFH flexible',
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 48.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "When's your job shift?",
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            "We'll protect this block\nand build around it.",
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
          const SizedBox(height: 48),
          Expanded(
            child: ListView.separated(
              itemCount: shifts.length,
              separatorBuilder: (context, index) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final shift = shifts[index];
                final isSelected = provider.jobShift == shift;
                
                return GestureDetector(
                  onTap: () => provider.setJobShift(shift),
                      child: AnimatedScale(
                        scale: isSelected ? 1.02 : 1.0,
                        duration: const Duration(milliseconds: 200),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          height: 64,
                          decoration: BoxDecoration(
                            color: isSelected ? const Color(0xFF10B981) : (Theme.of(context).brightness == Brightness.dark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9)),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          alignment: Alignment.center,
                          child: Text(
                            shift,
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: isSelected ? Colors.white : (Theme.of(context).brightness == Brightness.dark ? Colors.white70 : const Color(0xFF334155)),
                            ),
                          ),
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
