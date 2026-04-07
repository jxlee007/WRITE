class SlotCell {
  String cls;
  String text;
  String sub;

  SlotCell({
    required this.cls,
    required this.text,
    required this.sub,
  });

  factory SlotCell.fromJson(Map<String, dynamic> json) {
    return SlotCell(
      cls: json['cls'] as String,
      text: json['text'] as String,
      sub: json['sub'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'cls': cls,
      'text': text,
      'sub': sub,
    };
  }

  SlotCell copyWith({
    String? cls,
    String? text,
    String? sub,
  }) {
    return SlotCell(
      cls: cls ?? this.cls,
      text: text ?? this.text,
      sub: sub ?? this.sub,
    );
  }
}
