import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../components/app_text_form_field.dart';
import '../utils/extensions.dart';
import '../utils/api_endpoints.dart';
import '../values/app_colors.dart';
import '../values/app_constants.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController calorieController = TextEditingController();
  TextEditingController proteinController = TextEditingController();
  TextEditingController carbController = TextEditingController();
  TextEditingController fatsController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final size = context.mediaQuerySize;
    return Scaffold(
        body: SingleChildScrollView(
            child: Form(
                key: _formKey,
                child: Column(
                  children: [
                    Container(
                      height: size.height * 0.2,
                      width: double.infinity,
                      padding: const EdgeInsets.all(20),
                      decoration: const BoxDecoration(
                        color: Color.fromRGBO(224, 52, 64, 1),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'User Profile',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 20, vertical: 30),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text('Test  :3',
                                style: Theme.of(context).textTheme.bodySmall),
                          ]),
                    )
                  ],
                ))));
  }
}
