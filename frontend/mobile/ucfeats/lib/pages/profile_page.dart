import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ucfeats/models/login_model.dart';

import '../components/app_text_form_field.dart';
import '../utils/extensions.dart';
import '../utils/api_endpoints.dart';
import '../values/app_colors.dart';
import '../values/app_constants.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();

  static LoginModel? getUser() {}
}

class _ProfilePageState extends State<ProfilePage> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController calorieController = TextEditingController();
  TextEditingController proteinController = TextEditingController();
  TextEditingController carbController = TextEditingController();
  TextEditingController fatsController = TextEditingController();
  LoginModel? loadedUser;

  bool isObscure = true;
  bool isConfirmPasswordObscure = true;

  @override
  void initState() {
    super.initState();

    getUser();
  }

  getUser() async {
    loadedUser = await LoginModel.loadFromSharedPreferences('user_key');
  }

  @override
  Widget build(BuildContext context) {
    final size = context.mediaQuerySize;
    return Scaffold(
        appBar: AppBar(
            backgroundColor: const Color.fromRGBO(224, 52, 64, 1),
            title: const Text("User profile",
                style: TextStyle(color: Colors.white))),
        body: SingleChildScrollView(
            child: Form(
                key: _formKey,
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(30),
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          //mainAxisSize: MainAxisSize.min,
                          children: [
                            Text('User Information',
                                style: Theme.of(context).textTheme.titleMedium),
                            const Divider(
                              height: 12,
                              thickness: 0.5,
                            ),
                            Text('Email: ${loadedUser?.email}',
                                style: TextStyle(color: Colors.black)),
                            const SizedBox(
                              height: 18,
                            ),
                            Text('First Name: ${loadedUser?.firstName}',
                                style: TextStyle(color: Colors.black)),
                            const SizedBox(
                              height: 18,
                            ),
                            Text('Last Name: ${loadedUser?.lastName}',
                                style: TextStyle(color: Colors.black)),
                            const SizedBox(
                              height: 26,
                            ),
                            Text('Macro Goals',
                                style: Theme.of(context).textTheme.titleMedium),
                            const Divider(
                              height: 12,
                              thickness: 0.5,
                            ),
                            SizedBox(height: 10),
                            AppTextFormField(
                              keyboardType: TextInputType.number,
                              labelText: 'Calories',
                              autofocus: true,
                              textInputAction: TextInputAction.next,
                              controller: calorieController,
                            ),
                            AppTextFormField(
                              keyboardType: TextInputType.number,
                              labelText: 'Protein',
                              autofocus: true,
                              textInputAction: TextInputAction.next,
                              controller: proteinController,
                            ),
                            AppTextFormField(
                              keyboardType: TextInputType.number,
                              labelText: 'Carbohydrates',
                              autofocus: true,
                              textInputAction: TextInputAction.next,
                              controller: carbController,
                            ),
                            AppTextFormField(
                              keyboardType: TextInputType.number,
                              labelText: 'Total Fats',
                              autofocus: true,
                              textInputAction: TextInputAction.next,
                              controller: fatsController,
                            ),
                            FilledButton(
                                onPressed: () {
                                  setState(() {});
                                },
                                child: const Text('Update Goals')),
                          ]),
                    )
                  ],
                ))));
  }
}
