import 'dart:async';
import 'dart:developer';
import 'package:ucfeats/components/food_search.dart';
import 'package:ucfeats/models/food_model.dart';
import 'package:ucfeats/models/login_model.dart';
import 'package:ucfeats/utils/api_functions.dart';
import 'package:ucfeats/utils/indicator.dart';

import 'dashboard_page.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:ucfeats/pages/dashboard_page.dart';

import '../utils/extensions.dart';
import '../utils/api_endpoints.dart';
import '../values/app_colors.dart';
import '../values/app_constants.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();

  static List<FoodModel>? getFavorites() {}
  static List<FoodModel>? getRecents() {}
}

class _SearchPageState extends State<SearchPage> {
  final _formKey = GlobalKey<FormState>();
  SearchController searchQuery = SearchController();
  List<FoodModel>? favorites;
  List<FoodModel>? recents;
  bool recentView = false;
  bool favoritesView = true;
  var isLoaded = false;

  @override
  void initState() {
    super.initState();

    getFavorites();
    getRecents();
  }

  getFavorites() async {
    try {
      final favorites = await ApiFunctions().searchFavorites();
      setState(() {
        this.favorites = favorites;
        isLoaded = true;
      });
    } catch (e) {
      debugPrint("Error during favorites search");
      debugPrint('Error: $e');
    }
  }

  getRecents() async {
    try {
      final recents = await ApiFunctions().getRecents();
      setState(() {
        this.recents = recents;
        isLoaded = true;
      });
    } catch (e) {
      debugPrint("Error during recents search");
      debugPrint('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = context.mediaQuerySize;
    return Scaffold(
      appBar: AppBar(
          backgroundColor: const Color.fromRGBO(224, 52, 64, 1),
          title: const Text(
            "Add Foods",
            style: TextStyle(color: Colors.white),
          ),
          actions: [
            IconButton(
                color: Colors.white,
                onPressed: () {
                  showSearch(context: context, delegate: SearchFoods());
                },
                icon: const Icon(Icons.search))
          ]),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 15),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              ElevatedButton(
                style: favoritesView == true
                    ? ElevatedButton.styleFrom(
                        backgroundColor: const Color.fromRGBO(224, 52, 64, 1),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust border radius as needed
                          side: const BorderSide(color: Colors.transparent),
                        ))
                    : ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: Colors.black,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust border radius as needed
                          side: const BorderSide(
                              color: Color.fromRGBO(224, 52, 64, 1)),
                        )),
                onPressed: () {
                  getFavorites();
                  setState(() {
                    recentView = false;
                    favoritesView = true;
                  });
                },
                child: const Text('Favorites'),
              ),
              const SizedBox(width: 20),
              ElevatedButton(
                style: recentView == true
                    ? ElevatedButton.styleFrom(
                        backgroundColor: const Color.fromRGBO(224, 52, 64, 1),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust border radius as needed
                          side: const BorderSide(color: Colors.transparent),
                        ))
                    : ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: Colors.black,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust border radius as needed
                          side: const BorderSide(
                              color: Color.fromRGBO(224, 52, 64, 1)),
                        )),
                onPressed: () {
                  getRecents();
                  setState(() {
                    recentView = true;
                    favoritesView = false;
                  });
                },
                child: const Text("Recents"),
              ),
            ],
          ),
          Expanded(
            child:
                favoritesView == true ? favoritesDisplay() : recentsDisplay(),
          ),
        ],
      ),
    );
  }

  favoritesDisplay() {
    return ListView.builder(
      itemCount: favorites?.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text('${favorites?[index].name}'),
          subtitle: Text(
            '${favorites?[index].locationName}\t\t|\t\t${favorites?[index].calories} calories',
          ),
          trailing: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              IconButton(
                icon: const Icon(
                  Icons.add,
                  color: Colors.black,
                  size: 15,
                ),
                onPressed: () {
                  setState(() async {
                    await ApiFunctions().addEat(favorites?[index].name);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        duration: const Duration(seconds: 1),
                        content: Text(
                          '${favorites?[index].name} added to your eats',
                        ),
                      ),
                    );
                  });
                },
              ),
              IconButton(
                icon: const Icon(
                  Icons.favorite,
                  color: Color.fromRGBO(224, 52, 64, 1),
                  size: 15,
                ),
                onPressed: () {
                  setState(() async {
                    await ApiFunctions().deleteFavorite(favorites?[index].name);
                    await getFavorites(); // Wait for getFavorites to complete
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        duration: const Duration(seconds: 1),
                        content: Text(
                          '${favorites?[index].name} deleted from your favorites!',
                        ),
                      ),
                    );
                  });
                },
              ),
            ],
          ),
        );
      },
    );
  }

  recentsDisplay() {
    return ListView.builder(
      itemCount: recents?.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text('${recents?[index].name}'),
          subtitle: Text(
            '${recents?[index].locationName}\t\t|\t\t${recents?[index].calories} calories',
          ),
          trailing: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              IconButton(
                icon: const Icon(
                  Icons.add,
                  color: Colors.black,
                  size: 15,
                ),
                onPressed: () {
                  setState(() async {
                    await ApiFunctions().addEat(recents?[index].name);
                    await getRecents();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        duration: const Duration(seconds: 1),
                        content: Text(
                          '${recents?[index].name} added to your eats',
                        ),
                      ),
                    );
                  });
                },
              ),
              IconButton(
                icon: const Icon(
                  Icons.favorite,
                  color: Colors.black,
                  size: 15,
                ),
                onPressed: () {
                  setState(() async {
                    await ApiFunctions().addFavorite(recents?[index].name);
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                        duration: const Duration(seconds: 1),
                        content: Text(
                            '${recents?[index].name} added to your favorites!')));
                  });
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
