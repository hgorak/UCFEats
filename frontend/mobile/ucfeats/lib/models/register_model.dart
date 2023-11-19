// To parse this JSON data, do
//
//     final registerModel = registerModelFromJson(jsonString);

import 'dart:convert';

RegisterModel registerModelFromJson(String str) =>
    RegisterModel.fromJson(json.decode(str));

String registerModelToJson(RegisterModel data) => json.encode(data.toJson());

class RegisterModel {
  String email;
  String firstName;
  String lastName;
  String token;

  RegisterModel({
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.token,
  });

  factory RegisterModel.fromJson(Map<String, dynamic> json) => RegisterModel(
        email: json["email"],
        firstName: json["first_name"],
        lastName: json["last_name"],
        token: json["token"],
      );

  Map<String, dynamic> toJson() => {
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "token": token,
      };
}
