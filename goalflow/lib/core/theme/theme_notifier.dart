import 'package:flutter/material.dart';
import '../storage/storage_service.dart';

class ThemeNotifier extends ChangeNotifier {
  late bool _isDarkMode;

  ThemeNotifier() {
    _isDarkMode = StorageService.instance.isDarkMode;
  }

  bool get isDark => _isDarkMode;

  void toggle() {
    _isDarkMode = !_isDarkMode;
    StorageService.instance.setDarkMode(_isDarkMode);
    notifyListeners();
  }
}
