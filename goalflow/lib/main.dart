import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/storage/storage_service.dart';
import 'core/theme/theme_notifier.dart';
import 'core/services/submit_notifier.dart';
import 'core/notifications/notification_service.dart';
import 'features/settings/settings_provider.dart';
import 'features/onboarding/onboarding_provider.dart';
import 'app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await StorageService.init();
  await NotificationService.instance.init();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeNotifier()),
        ChangeNotifierProvider(create: (_) => SubmitNotifier()),
        ChangeNotifierProvider(create: (_) => SettingsProvider()),
        ChangeNotifierProvider(create: (_) => OnboardingProvider()),
      ],
      child: const GoalflowApp(),
    ),
  );
}
