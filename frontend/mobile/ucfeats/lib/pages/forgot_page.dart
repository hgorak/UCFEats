import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ucfeats/values/app_routes.dart';

import '../components/app_text_form_field.dart';
import '../utils/extensions.dart';
import '../values/app_colors.dart';
import '../values/app_constants.dart';
import '../utils/api_endpoints.dart';

class ForgotPasswordPage extends StatefulWidget {
  const ForgotPasswordPage({super.key});

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController firstNameController = TextEditingController();
  TextEditingController lastNameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController confirmPasswordController = TextEditingController();
  // Future<RegisterModel>? _newUser;

  // FocusNode confirmFocusNode = FocusNode();

  bool isObscure = true;
  bool isConfirmPasswordObscure = true;

  // Future<RegisterModel> register(
  //     String email, password, firstname, lastname) async {
  //   final response = await http.post(
  //     Uri.parse(ApiConstants.baseUrl + ApiConstants.registerEndpoint),
  //     headers: <String, String>{
  //       'Content-Type': 'application/json',
  //     },
  //     body: jsonEncode(<String, String>{
  //       'email': email,
  //       'password': password,
  //       'first_name': firstname,
  //       'last_name': lastname
  //     }),
  //   );

  //   if (response.statusCode == 200) {
  //     debugPrint("Register successful");
  //     // ignore: use_build_context_synchronously
  //     ScaffoldMessenger.of(context)
  //         .showSnackBar(const SnackBar(content: Text('Register Successful')));
  //     return RegisterModel.fromJson(
  //         jsonDecode(response.body) as Map<String, dynamic>);
  //   } else {
  //     debugPrint(response.body.toString());
  //     // ignore: use_build_context_synchronously
  //     ScaffoldMessenger.of(context)
  //         .showSnackBar(const SnackBar(content: Text('Register Failed')));
  //     throw Exception('Register failed :(');
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    final size = context.mediaQuerySize;
    return Scaffold(
      body: Form(
        key: _formKey,
        child: ListView(
          children: [
            Container(
              height: size.height * 0.24,
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: Color.fromRGBO(224, 52, 64, 1),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Padding(
                    padding: EdgeInsets.only(
                      top: 15,
                    ),
                  ),
                  Column(
                    children: [
                      Text(
                        'Forgot your password?',
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(
                        height: 6,
                      ),
                      Text(
                        "No worries! Enter your email address below and we'll send you a reset link pronto.",
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 20,
                vertical: 30,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  AppTextFormField(
                    labelText: 'Email',
                    keyboardType: TextInputType.emailAddress,
                    textInputAction: TextInputAction.next,
                    onChanged: (_) => _formKey.currentState?.validate(),
                    validator: (value) {
                      return value!.isEmpty
                          ? 'Please, Enter Email Address'
                          : AppConstants.emailRegex.hasMatch(value)
                              ? null
                              : 'Invalid Email Address';
                    },
                    controller: emailController,
                  ),
                  FilledButton(
                    onPressed: () {
                      // setState(() {
                      //   _newUser = register(
                      //       emailController.text.toString(),
                      //       passwordController.text.toString(),
                      //       firstNameController.text.toString(),
                      //       lastNameController.text.toString());
                      // });
                      // debugPrint(passwordController.text.toString());
                    },
                    child: const Text('Submit'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
