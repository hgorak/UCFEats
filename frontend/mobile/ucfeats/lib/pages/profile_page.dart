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
  TextEditingController passwordController = TextEditingController();
  TextEditingController confirmPasswordController = TextEditingController();
  TextEditingController calorieController = TextEditingController();
  TextEditingController proteinController = TextEditingController();
  TextEditingController carbController = TextEditingController();
  TextEditingController fatsController = TextEditingController();

  bool isObscure = true;
  bool isConfirmPasswordObscure = true;

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
                        color: AppColors.red,
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
                            Text('Email: [Insert the user email in here]',
                                style: Theme.of(context).textTheme.bodySmall),
                            const SizedBox(
                              height: 18,
                            ),

// Beginning of Password thingy
                            AppTextFormField(
                              labelText: 'Change Password',
                              keyboardType: TextInputType.visiblePassword,
                              textInputAction: TextInputAction.next,
                              onChanged: (_) =>
                                  _formKey.currentState?.validate(),
                              validator: (value) {
                                return value!.isEmpty
                                    ? 'Please, Enter Password'
                                    : AppConstants.passwordRegex.hasMatch(value)
                                        ? null
                                        : 'Invalid Password';
                              },
                              controller: passwordController,
                              obscureText: isObscure,
                              // onEditingComplete: () {
                              //   FocusScope.of(context).unfocus();
                              //   FocusScope.of(context).requestFocus(confirmFocusNode);
                              // },
                              suffixIcon: Padding(
                                padding: const EdgeInsets.only(right: 15),
                                child: Focus(
                                  /// If false,
                                  ///
                                  /// disable focus for all of this node's descendants
                                  descendantsAreFocusable: false,

                                  /// If false,
                                  ///
                                  /// make this widget's descendants un-traversable.
                                  // descendantsAreTraversable: false,
                                  child: IconButton(
                                    onPressed: () => setState(() {
                                      isObscure = !isObscure;
                                    }),
                                    style: ButtonStyle(
                                      minimumSize: MaterialStateProperty.all(
                                        const Size(48, 48),
                                      ),
                                    ),
                                    icon: Icon(
                                      isObscure
                                          ? Icons.visibility_off_outlined
                                          : Icons.visibility_outlined,
                                      color: Colors.black,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            AppTextFormField(
                              labelText: 'Confirm Password',
                              keyboardType: TextInputType.visiblePassword,
                              textInputAction: TextInputAction.done,
                              // focusNode: confirmFocusNode,
                              onChanged: (value) {
                                _formKey.currentState?.validate();
                              },
                              validator: (value) {
                                return value!.isEmpty
                                    ? 'Please, Re-Enter Password'
                                    : AppConstants.passwordRegex.hasMatch(value)
                                        ? passwordController.text ==
                                                confirmPasswordController.text
                                            ? null
                                            : 'Password not matched!'
                                        : 'Invalid Password!';
                              },
                              controller: confirmPasswordController,
                              obscureText: isConfirmPasswordObscure,
                              suffixIcon: Padding(
                                padding: const EdgeInsets.only(right: 15),
                                child: Focus(
                                  /// If false,
                                  ///
                                  /// disable focus for all of this node's descendants.
                                  descendantsAreFocusable: false,

                                  /// If false,
                                  ///
                                  /// make this widget's descendants un-traversable.
                                  // descendantsAreTraversable: false,
                                  child: IconButton(
                                    onPressed: () {
                                      setState(() {
                                        isConfirmPasswordObscure =
                                            !isConfirmPasswordObscure;
                                      });
                                    },
                                    style: ButtonStyle(
                                      minimumSize: MaterialStateProperty.all(
                                        const Size(48, 48),
                                      ),
                                    ),
                                    icon: Icon(
                                      isConfirmPasswordObscure
                                          ? Icons.visibility_off_outlined
                                          : Icons.visibility_outlined,
                                      color: Colors.black,
                                    ),
                                  ),
                                ),
                              ),
                            ),

                            // Password reset button
                            FilledButton(
                                onPressed: () {
                                  setState(() {});
                                },
                                child: const Text('Reset Password')),

                            const SizedBox(
                              height: 26,
                            ),
                            Text('Macro Goals',
                                style: Theme.of(context).textTheme.titleMedium),
                            const Divider(
                              height: 12,
                              thickness: 0.5,
                            ),
                            Text('Calories [Form that has Cal Goal]',
                                style: Theme.of(context).textTheme.bodySmall),
                            const SizedBox(
                              height: 18,
                            ),
                            Text('Protein [Form that has Protein Goal]',
                                style: Theme.of(context).textTheme.bodySmall),
                            const SizedBox(
                              height: 18,
                            ),
                            Text('Carbohydrates [Form that has Carb Goal]',
                                style: Theme.of(context).textTheme.bodySmall),
                            const SizedBox(
                              height: 18,
                            ),
                            Text('Total Fats [Form that has Fat Goal]',
                                style: Theme.of(context).textTheme.bodySmall),
                          ]),
                    )
                  ],
                ))));
  }
}
