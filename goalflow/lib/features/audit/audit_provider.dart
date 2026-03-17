import 'dart:async';
import 'package:flutter/material.dart';
import '../../core/models/audit_item.dart';
import '../../core/storage/storage_service.dart';
import '../../core/services/submit_notifier.dart';
import '../../core/feedback/toast_service.dart';

class AuditProvider extends ChangeNotifier {
  final StorageService _storage = StorageService.instance;
  final SubmitNotifier _submitNotifier;
  
  Map<String, List<AuditItem>> categories = {};
  String? expandedMetricId;
  bool isSubmitted = false;
  bool showNudge = true;
  Timer? _debounce;

  AuditProvider(this._submitNotifier) {
    _submitNotifier.addListener(_onGlobalSubmit);
    _init();
  }

  void dismissNudge() {
    showNudge = false;
    notifyListeners();
  }

  void _onGlobalSubmit() {
    isSubmitted = _submitNotifier.isSubmitted;
    notifyListeners();
  }

  Future<void> _init() async {
    final data = await _storage.getAuditData();
    if (data.isEmpty) {
      categories = {
        "Health": [
          AuditItem(name: "Nutrition", score: 5, comment: ""),
          AuditItem(name: "Sleep", score: 7, comment: ""),
          AuditItem(name: "Exercise", score: 4, comment: ""),
        ],
        "Growth": [
          AuditItem(name: "Skill Dev", score: 6, comment: ""),
          AuditItem(name: "Mindset", score: 8, comment: ""),
          AuditItem(name: "Network", score: 5, comment: ""),
        ],
      };
    } else {
      categories = data;
    }
    
    // Check submission for today
    isSubmitted = await _storage.isSubmitted(DateTime.now());
    notifyListeners();
  }

  Future<void> refresh() => _init();

  void toggleExpansion(String metricId) {
    if (expandedMetricId == metricId) {
      expandedMetricId = null;
    } else {
      expandedMetricId = metricId;
    }
    notifyListeners();
  }

  void updateScore(String category, int index, int score) {
    if (isSubmitted) {
      ToastService.warning('Day already submitted. Audit is locked.');
      return;
    }
    categories[category]![index].score = score;
    notifyListeners();
    _saveDebounced();
  }

  void updateComment(String category, int index, String comment) {
    if (isSubmitted) {
      ToastService.warning('Day already submitted. Audit is locked.');
      return;
    }
    categories[category]![index].comment = comment;
    notifyListeners();
    _saveDebounced();
  }

  void _saveDebounced() {
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      _storage.saveAuditData(categories);
    });
  }

  @override
  void dispose() {
    _submitNotifier.removeListener(_onGlobalSubmit);
    _debounce?.cancel();
    super.dispose();
  }
}
