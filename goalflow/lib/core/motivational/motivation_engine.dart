import 'dart:math';

class MotivationEngine {
  static String getDailyGreeting(int hour, int streak) {
    String greeting;
    if (hour >= 4 && hour < 6) {
      greeting = "Early bird advantage. Most people are still asleep.";
    } else if (hour >= 6 && hour < 9) {
      greeting = "Morning in motion. You're already ahead.";
    } else if (hour >= 9 && hour < 12) {
      greeting = "Morning locked in. Keep the momentum.";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Midday check-in. How's the streak holding?";
    } else if (hour >= 17 && hour < 20) {
      greeting = "Home stretch. Finish what you started.";
    } else {
      greeting = "Wrap it up. One more habit to go.";
    }

    if (streak >= 30) return "30-day legend — $greeting";
    if (streak >= 14) return "Two-week streak — $greeting";
    if (streak >= 7) return "One week strong — $greeting";
    return greeting;
  }

  static String getStreakMessage(int streak) {
    switch (streak) {
      case 1:
        return "Day one. The hardest step is done.";
      case 3:
        return "Three days in. The habit is forming.";
      case 7:
        return "One full week. You're building something real.";
      case 14:
        return "Two weeks of consistency. Compound interest is working.";
      case 21:
        return "21 days. This is who you are now.";
      case 30:
        return "One month. Most people quit by day 5.";
      default:
        if (streak % 10 == 0 && streak > 30) {
          return "$streak days. Remarkable.";
        }
        return "$streak-day streak. Don't break the chain.";
    }
  }

  static String getJournalPrompt(int questionIndex) {
    final now = DateTime.now();
    final dayOfYear = now.difference(DateTime(now.year, 1, 1)).inDays;
    final random = Random(dayOfYear);

    final pools = [
      // Question 0: went well
      [
        "What created the most energy today?",
        "What went right today?",
        "Which moment are you most proud of?",
        "What did you do that future-you will thank you for?",
        "What worked today that's worth repeating?"
      ],
      // Question 1: improve
      [
        "What would you do differently?",
        "Where did you lose time or focus?",
        "What drained your energy today?",
        "What's one thing to optimize tomorrow?",
        "What resistance did you notice in yourself?"
      ],
      // Question 2: tomorrow
      [
        "What's the one non-negotiable for tomorrow?",
        "Set the primary goal for tomorrow.",
        "What single outcome would make tomorrow a win?",
        "Write your intention for tomorrow.",
        "What's the highest-leverage thing tomorrow?"
      ],
    ];

    if (questionIndex < 0 || questionIndex >= pools.length) return "";
    final pool = pools[questionIndex];
    return pool[random.nextInt(pool.length)];
  }
}
