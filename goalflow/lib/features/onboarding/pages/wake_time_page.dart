import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../onboarding_provider.dart';

class WakeTimePage extends StatelessWidget {
  final VoidCallback onContinue;

  const WakeTimePage({super.key, required this.onContinue});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<OnboardingProvider>();
    final times = [
      const TimeOfDay(hour: 4, minute: 0),
      const TimeOfDay(hour: 4, minute: 30),
      const TimeOfDay(hour: 5, minute: 0),
      const TimeOfDay(hour: 5, minute: 30),
      const TimeOfDay(hour: 6, minute: 0),
      const TimeOfDay(hour: 6, minute: 30),
      const TimeOfDay(hour: 7, minute: 0),
      const TimeOfDay(hour: 7, minute: 30),
    ];

    String formatTime(TimeOfDay time) {
      final hour = time.hourOfPeriod == 0 ? 12 : time.hourOfPeriod;
      final period = time.period == DayPeriod.am ? 'AM' : 'PM';
      return '$hour:${time.minute.toString().padLeft(2, '0')} $period';
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 48.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'When do you wake up?',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            "We'll build your routine around\nyour natural rhythm.",
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
          const SizedBox(height: 48),
          Expanded(
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
              ),
              itemCount: times.length,
              itemBuilder: (context, index) {
                final time = times[index];
                final isSelected = provider.wakeTime.hour == time.hour && provider.wakeTime.minute == time.minute;
                
                return GestureDetector(
                  onTap: () => provider.setWakeTime(time),
                      child: AnimatedScale(
                        scale: isSelected ? 1.05 : 1.0,
                        duration: const Duration(milliseconds: 200),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          decoration: BoxDecoration(
                            color: isSelected ? const Color(0xFF10B981) : (Theme.of(context).brightness == Brightness.dark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9)),
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: isSelected ? [
                              BoxShadow(
                                color: const Color(0xFF10B981).withValues(alpha: 0.3),
                                blurRadius: 12,
                                offset: const Offset(0, 4),
                              )
                            ] : null,
                          ),
                          alignment: Alignment.center,
                          child: Text(
                            formatTime(time),
                            style: TextStyle(
                              fontSize: 18,
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
