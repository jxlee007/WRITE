class AuditItem {
  String name;
  int score;
  String comment;

  AuditItem({
    required this.name,
    required this.score,
    required this.comment,
  });

  factory AuditItem.fromJson(Map<String, dynamic> json) {
    return AuditItem(
      name: json['name'] as String,
      score: json['score'] as int,
      comment: json['comment'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'score': score,
      'comment': comment,
    };
  }

  AuditItem copyWith({
    String? name,
    int? score,
    String? comment,
  }) {
    return AuditItem(
      name: name ?? this.name,
      score: score ?? this.score,
      comment: comment ?? this.comment,
    );
  }
}
