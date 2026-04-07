import 'package:flutter/material.dart';
import '../storage/storage_service.dart';

class SubmitNotifier extends ChangeNotifier {
  final StorageService _storage = StorageService.instance;
  bool _isSubmitted = false;

  bool get isSubmitted => _isSubmitted;

  SubmitNotifier() {
    _loadState();
  }

  Future<void> _loadState() async {
    _isSubmitted = await _storage.isSubmitted(DateTime.now());
    notifyListeners();
  }

  Future<void> notifySubmit() async {
    _isSubmitted = true;
    notifyListeners();
  }
}
