// To parse this JSON data, do
//
//     final favoriteModel = favoritesModelFromJson(jsonString);

import 'dart:convert';

List<String> favoritesModelFromJson(String str) =>
    List<String>.from(json.decode(str).map((x) => x));

String favoritesModelToJson(List<String> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x)));
