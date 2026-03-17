class JournalEntry {
  String wentWell;
  String couldImprove;
  String tomorrowGoal;
  DateTime date;

  JournalEntry({
    required this.wentWell,
    required this.couldImprove,
    required this.tomorrowGoal,
    required this.date,
  });

  factory JournalEntry.fromJson(Map<String, dynamic> json) {
    return JournalEntry(
      wentWell: json['wentWell'] as String,
      couldImprove: json['couldImprove'] as String,
      tomorrowGoal: json['tomorrowGoal'] as String,
      date: DateTime.parse(json['date'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'wentWell': wentWell,
      'couldImprove': couldImprove,
      'tomorrowGoal': tomorrowGoal,
      'date': date.toIso8601String(),
    };
  }
}
