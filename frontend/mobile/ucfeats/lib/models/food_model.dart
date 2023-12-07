// To parse this JSON data, do
//
//     final foodModel = foodModelFromJson(jsonString);

import 'dart:convert';

List<FoodModel> foodModelFromJson(String str) =>
    List<FoodModel>.from(json.decode(str).map((x) => FoodModel.fromJson(x)));

String foodModelToJson(List<FoodModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class FoodModel {
  String id;
  String name;
  double price;
  num calories;
  double fat;
  double carbs;
  double protein;
  String locId;
  String locationName;

  FoodModel({
    required this.id,
    required this.name,
    required this.price,
    required this.calories,
    required this.fat,
    required this.carbs,
    required this.protein,
    required this.locId,
    required this.locationName,
  });

  factory FoodModel.fromJson(Map<String, dynamic> json) {
    try {
      return FoodModel(
        id: json["_id"],
        name: json["Name"],
        price: json["Price"]?.toDouble() ?? 0.0,
        calories: _parseDynamicAsNum(json["Calories"]) ??
            0, // Change to _parseDynamicAsNum
        fat:
            json["Fat"]?.toDouble() ?? 0.0, // Ensure fat is converted to double
        carbs: json["Carbs"]?.toDouble() ??
            0.0, // Ensure carbs is converted to double
        protein: json["Protein"]?.toDouble() ??
            0.0, // Ensure protein is converted to double
        locId: json["loc_id"],
        locationName: json["locationName"],
      );
    } catch (e, stackTrace) {
      print("Error parsing JSON: $e");
      print("Stack Trace: $stackTrace");
      print("JSON that caused the error: $json");
      rethrow;
    }
  }

  static num? _parseDynamicAsNum(dynamic value) {
    if (value is int) {
      return value;
    } else if (value is double) {
      return value;
    }
    return null;
  }

  Map<String, dynamic> toJson() => {
        "_id": id,
        "Name": name,
        "Price": price,
        "Calories": calories,
        "Fat": fat,
        "Carbs": carbs,
        "Protein": protein,
        "loc_id": locId,
        "locationName": locationName,
      };
}
