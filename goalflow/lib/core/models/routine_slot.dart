import 'slot_cell.dart';

class RoutineSlot {
  String label;
  List<SlotCell> rows;

  RoutineSlot({
    required this.label,
    required this.rows,
  });

  factory RoutineSlot.fromJson(Map<String, dynamic> json) {
    return RoutineSlot(
      label: json['label'] as String,
      rows: (json['rows'] as List<dynamic>)
          .map((e) => SlotCell.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'label': label,
      'rows': rows.map((e) => e.toJson()).toList(),
    };
  }
}
