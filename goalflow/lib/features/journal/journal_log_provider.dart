import 'package:flutter/material.dart';
import '../../core/models/journal_entry.dart';
import '../../core/storage/storage_service.dart';

class JournalLogProvider extends ChangeNotifier {
  List<JournalEntry> entries = [];
  bool isLoading = true;

  JournalLogProvider() {
    _load();
  }

  Future<void> _load() async {
    isLoading = true;
    notifyListeners();
    entries = await StorageService.instance.getAllJournalEntries();
    isLoading = false;
    notifyListeners();
  }

  Future<void> refresh() => _load();
}
