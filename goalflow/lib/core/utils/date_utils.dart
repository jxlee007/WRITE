import 'package:intl/intl.dart';

class AppDateUtils {
  static String formatDate(DateTime date) {
    return DateFormat('yyyy-MM-dd').format(date);
  }

  static String completionsKey(DateTime date) {
    return 'completions_${formatDate(date)}';
  }
}
