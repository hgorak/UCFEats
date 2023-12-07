import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:ucfeats/models/favorites_model.dart';
import 'package:ucfeats/models/food_model.dart';
import 'package:ucfeats/models/login_model.dart';
import 'package:ucfeats/models/recents_model.dart';
import 'package:ucfeats/utils/api_endpoints.dart';
import 'package:http/http.dart' as http;

class ApiFunctions {
  Future<LoginModel> login(String email, password) async {
    final response = await http.post(
      Uri.parse(ApiConstants.baseUrl + ApiConstants.loginEndpoint),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final dynamic data = json.decode(response.body);
      return LoginModel.fromJson(data as Map<String, dynamic>);
    } else {
      throw Exception('Login failed :(');
    }
  }

  Future<List<FoodModel>> searchFoods() async {
    final response = await http
        .get(Uri.parse(ApiConstants.baseUrl + ApiConstants.searchEndpoint));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return List<FoodModel>.from(data.map((item) => FoodModel.fromJson(item)));
    } else {
      throw Exception('Failed to load food data');
    }
  }

  List<FoodModel> sortedFoods = [];
  Future<List<FoodModel>> searchFoodsSorted(
      String? query, String location) async {
    final response = await http
        .get(Uri.parse(ApiConstants.baseUrl + ApiConstants.searchEndpoint));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      sortedFoods =
          List<FoodModel>.from(data.map((item) => FoodModel.fromJson(item)));
      if (location == "None") {
        if (query != null) {
          sortedFoods = sortedFoods
              .where((element) =>
                  element.name!.toLowerCase().contains((query.toLowerCase())))
              .toList();
        }
      } else {
        if (query != null) {
          sortedFoods = sortedFoods
              .where((element) =>
                  element.name!.toLowerCase().contains((query.toLowerCase())))
              .toList();
        }
        sortedFoods = sortedFoods
            .where((element) => element.locationName.contains((location)))
            .toList();
      }
      return sortedFoods;
    } else {
      throw Exception('Failed to load food data');
    }
  }

  Future<void> addEat(String? foodName) async {
    LoginModel? loadedUser =
        await LoginModel.loadFromSharedPreferences('user_key');
    final apiUrl = Uri.parse(ApiConstants.baseUrl + ApiConstants.addEndpoint);

    try {
      final response = await http.post(
        apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${loadedUser?.token}',
        },
        body: jsonEncode({
          'name': foodName,
        }),
      );
      print('API Response: ${response.body}');

      if (response.statusCode == 200) {
        // If server returns an OK response, you can handle the success here
        print('Data added successfully');
      } else {
        // If the server did not return a 200 OK response,
        // throw an exception.
        throw Exception('Failed to add data');
      }
    } catch (e, stackTrace) {
      print('Error: $e');
      print('Stack Trace: $stackTrace');
    }
  }

  Future<void> addFavorite(String? foodName) async {
    LoginModel? loadedUser =
        await LoginModel.loadFromSharedPreferences('user_key');

    try {
      final response = await http.post(
        Uri.parse(ApiConstants.baseUrl + ApiConstants.favoriteEndpoint),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${loadedUser?.token}',
        },
        body: jsonEncode({'name': foodName}),
      );

      if (response.statusCode == 200) {
        print("Favorite added successfully");
      } else {
        print(response.body);
        throw Exception(
            'Failed to add favorite. Server responded with status code ${response.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
      throw Exception('Failed to add favorite. Error: $e');
    }
  }

  Future<List<String>> getFavorites() async {
    LoginModel? loadedUser =
        await LoginModel.loadFromSharedPreferences('user_key');
    final response = await http.get(
      Uri.parse(ApiConstants.baseUrl + ApiConstants.favoriteEndpoint),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${loadedUser?.token}',
      },
    );

    if (response.statusCode == 200) {
      List<String> favorites = favoritesModelFromJson(response.body);
      return favorites;
    }
    throw Exception('Failed to fetch favorites');
  }

  List<FoodModel> favoritesBase = [];
  List<FoodModel> favoritesSorted = [];
  Future<List<FoodModel>> searchFavorites() async {
    List<String>? favorites = await getFavorites();
    final response = await http
        .get(Uri.parse(ApiConstants.baseUrl + ApiConstants.searchEndpoint));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      favoritesBase =
          List<FoodModel>.from(data.map((item) => FoodModel.fromJson(item)));

      // Sort favoritesBase based on the order of IDs in the favorites list
      favoritesSorted = favorites
          .map((favoriteId) =>
              favoritesBase.firstWhere((element) => element.id == favoriteId))
          .toList();

      return favoritesSorted;
    } else {
      throw Exception('Failed to load food data');
    }
  }

  Future<void> deleteFavorite(String? foodName) async {
    LoginModel? loadedUser =
        await LoginModel.loadFromSharedPreferences('user_key');

    try {
      final response = await http.delete(
        Uri.parse(ApiConstants.baseUrl + ApiConstants.favoriteEndpoint),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${loadedUser?.token}',
        },
        body: jsonEncode({'name': foodName}),
      );

      if (response.statusCode == 200) {
        print("Favorite deleted successfully");
      } else {
        print(response.body);
        throw Exception(
            'Failed to add favorite. Server responded with status code ${response.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
      throw Exception('Failed to add favorite. Error: $e');
    }
  }

  Future<List<RecentModel>> getRecentsNames() async {
    LoginModel? loadedUser =
        await LoginModel.loadFromSharedPreferences('user_key');
    final response = await http.get(
      Uri.parse(ApiConstants.baseUrl + ApiConstants.recentEndpoint),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${loadedUser?.token}',
      },
    );

    if (response.statusCode == 200) {
      List<RecentModel> recents = recentModelFromJson(response.body);
      return recents;
    }
    throw Exception('Failed to fetch favorites');
  }

  List<FoodModel> recentEats = [];

  Future<List<FoodModel>> getRecents() async {
    List<RecentModel>? recentNames = await getRecentsNames();
    final response = await http
        .get(Uri.parse(ApiConstants.baseUrl + ApiConstants.searchEndpoint));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      recentEats =
          List<FoodModel>.from(data.map((item) => FoodModel.fromJson(item)));

      // Create a map to quickly look up the indices of recentNames
      Map<String, int> indexMap = {
        for (var recentName in recentNames!)
          recentName.itemName: recentNames.indexOf(recentName)
      };

      // Sort recentEats based on the order of names in recentNames
      recentEats.sort((a, b) {
        int indexA = indexMap[a.name] ?? recentEats.length;
        int indexB = indexMap[b.name] ?? recentEats.length;

        return indexA.compareTo(indexB);
      });

      // Return only the first 10 items
      return recentEats.take(10).toList();
    } else {
      throw Exception('Failed to load food data');
    }
  }

  Future<List<RecentModel>> getDailyEatsName() async {
    LoginModel? loadedUser =
        await LoginModel.loadFromSharedPreferences('user_key');
    final response = await http.get(
      Uri.parse(ApiConstants.baseUrl + ApiConstants.dayEndpoint),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${loadedUser?.token}',
      },
    );

    if (response.statusCode == 200) {
      List<RecentModel> recents = recentModelFromJson(response.body);
      print(recents.length);
      return recents;
    }
    throw Exception('Failed to fetch favorites');
  }

  List<FoodModel> dailyEats = [];

  Future<List<FoodModel>> getDailyEats() async {
    List<RecentModel>? dailyNames = await getDailyEatsName();
    final response = await http
        .get(Uri.parse(ApiConstants.baseUrl + ApiConstants.searchEndpoint));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);

      // Remove the type declaration before dailyEats
      dailyEats =
          List<FoodModel>.from(data.map((item) => FoodModel.fromJson(item)));

      // Create a map to quickly look up the indices of dailyNames
      Map<String, int> indexMap = {
        for (var dailyName in dailyNames!)
          dailyName.itemName: dailyNames.indexOf(dailyName),
      };

      // Sort dailyEats based on the order of names in dailyNames
      dailyEats.sort((a, b) {
        int indexA = indexMap[a.name] ?? dailyEats.length;
        int indexB = indexMap[b.name] ?? dailyEats.length;

        return indexA.compareTo(indexB);
      });

      print(dailyEats.length);
      return dailyEats.take(dailyNames.length).toList();
    } else {
      throw Exception('Failed to load food data');
    }
  }

  Future<void> deleteEat(String? foodName) async {
    LoginModel? loadedUser =
        await LoginModel.loadFromSharedPreferences('user_key');

    try {
      final response = await http.delete(
        Uri.parse(ApiConstants.baseUrl + ApiConstants.deleteEat),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${loadedUser?.token}',
        },
        body: jsonEncode({'name': foodName}),
      );

      if (response.statusCode == 200) {
        print("Eat deleted successfully");
      } else {
        print(response.body);
        throw Exception(
            'Failed to delete eat. Server responded with status code ${response.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
      throw Exception('Failed to add Eat. Error: $e');
    }
  }
}
