import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class LoginModel {
  String email;
  String firstName;
  String lastName;
  String token;

  LoginModel({
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.token,
  });

  factory LoginModel.fromJson(Map<String, dynamic> json) => LoginModel(
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

  // Serialize the LoginModel to a JSON string
  String toSharedPreferencesString() => jsonEncode(toJson());

  // Deserialize a JSON string from SharedPreferences into a LoginModel
  factory LoginModel.fromSharedPreferencesString(String jsonString) =>
      LoginModel.fromJson(jsonDecode(jsonString));

  // Save the LoginModel to SharedPreferences
  Future<void> saveToSharedPreferences(String key) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(key, toSharedPreferencesString());
  }

  // Load a LoginModel from SharedPreferences
  static Future<LoginModel?> loadFromSharedPreferences(String key) async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(key);
    return jsonString != null
        ? LoginModel.fromSharedPreferencesString(jsonString)
        : null;
  }
}
