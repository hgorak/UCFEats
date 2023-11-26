import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:ucfeats/pages/dashboard_page.dart';

import 'values/app_theme.dart';
import 'pages/login_page.dart';
import 'pages/register_page.dart';
import 'pages/forgot_page.dart';
import 'values/app_constants.dart';
import 'values/app_routes.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarIconBrightness: Brightness.light,
    ),
  );
  SystemChrome.setPreferredOrientations(
    [DeviceOrientation.portraitUp],
  ).then(
    (_) => runApp(
      const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    Theme.of(context);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'UCFEats app',
      theme: AppTheme.themeData,
      initialRoute: AppRoutes.loginScreen,
      navigatorKey: AppConstants.navigationKey,
      routes: {
        AppRoutes.loginScreen: (_) => const LoginPage(),
        AppRoutes.registerScreen: (_) => const RegisterPage(),
        AppRoutes.dashboardScreen: (_) => const DashboardPage(),
        AppRoutes.forgotPasswordScreen: (_) => const ForgotPasswordPage()
      },
    );
  }
}
