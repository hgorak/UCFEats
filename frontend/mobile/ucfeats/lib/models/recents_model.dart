// To parse this JSON data, do
//
//     final recentModel = recentModelFromJson(jsonString);

import 'dart:convert';

List<RecentModel> recentModelFromJson(String str) => List<RecentModel>.from(
    json.decode(str).map((x) => RecentModel.fromJson(x)));

String recentModelToJson(List<RecentModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class RecentModel {
  DateTime timestamp;
  String itemName;
  String locationName;

  RecentModel({
    required this.timestamp,
    required this.itemName,
    required this.locationName,
  });

  factory RecentModel.fromJson(Map<String, dynamic> json) => RecentModel(
        timestamp: DateTime.parse(json["timestamp"]),
        itemName: json["itemName"],
        locationName: json["locationName"],
      );

  Map<String, dynamic> toJson() => {
        "timestamp": timestamp.toIso8601String(),
        "itemName": itemName,
        "locationName": locationName,
      };
}
