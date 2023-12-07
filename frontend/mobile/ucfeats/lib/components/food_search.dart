import 'package:flutter/material.dart';
import 'package:ucfeats/models/food_model.dart';
import 'package:ucfeats/models/login_model.dart';
import 'package:ucfeats/utils/api_functions.dart';

class SearchFoods extends SearchDelegate {
  @override
  ThemeData appBarTheme(BuildContext context) {
    return ThemeData(
      appBarTheme: const AppBarTheme(
          color: Color.fromRGBO(
              224, 52, 64, 1), // affects AppBar's background color
          titleTextStyle: TextStyle(
              color: Colors.white,
              fontSize: 16.0,
              fontWeight: FontWeight.bold)),
      inputDecorationTheme: const InputDecorationTheme(
        hintStyle: TextStyle(color: Colors.white), // Change the text color here
        labelStyle: TextStyle(color: Colors.white), // Color of the input text
        border: InputBorder.none, // Remove the underline
      ),
    );
  }

  List<String> options = [
    "None",
    "Chick-fil-a",
    "Dunkin' Donuts",
    "Einstein Bros. Bagels",
    "Huey Magoo's",
    "Panda Express",
    "Qdoba",
    "Smoothie King",
    "Steak 'n Shake",
    "Starbucks"
  ];
  String locationFilter = "";
  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      PopupMenuButton<String>(
        icon: const Icon(Icons.more_vert), // Icon for the button
        onSelected: (String result) {
          locationFilter = result;
        },
        itemBuilder: (BuildContext context) {
          return options.map((String option) {
            return PopupMenuItem<String>(
              value: option,
              child: Text(option),
            );
          }).toList();
        },
      ),
      IconButton(
          onPressed: () {
            query = '';
          },
          icon: const Icon(Icons.close))
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.arrow_back_ios),
      onPressed: () {
        Navigator.pop(context);
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return FutureBuilder<List<FoodModel>>(
      future: ApiFunctions().searchFoodsSorted(query, locationFilter),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
        List<FoodModel>? data = snapshot.data;
        return ListView.builder(
          itemCount: data?.length,
          itemBuilder: (context, index) {
            return ListTile(
                title: Text(
                  '${data?[index].name}',
                ),
                subtitle: Text(
                    '${data?[index].locationName}\t\t|\t\t${data?[index].calories} calories'),
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
                        ApiFunctions().addEat(data?[index].name);
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            duration: const Duration(seconds: 1),
                            content: Text(
                                '${data?[index].name} added to your eats')));
                      },
                    ),
                    IconButton(
                      icon: const Icon(
                        Icons.favorite,
                        color: Colors.black,
                        size: 15,
                      ),
                      onPressed: () {
                        ApiFunctions().addFavorite(data?[index].name);
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            duration: const Duration(seconds: 1),
                            content: Text(
                                '${data?[index].name} added to your favorites!')));
                      },
                    ),
                  ],
                ));
          },
        );
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    switch (locationFilter) {
      case "None":
        return const Center(
          child: Text('Searching All Foods'),
        );
      case "Chick-fil-a":
        return const Center(
          child: Text('Searching Chick-fil-a'),
        );
      case "Dunkin' Donuts":
        return const Center(
          child: Text('Searching Dunkin\' Donuts'),
        );
      case "Einstein Bros. Bagels":
        return const Center(
          child: Text('Searching Einstein Bros. Bagels'),
        );
      case "Huey Magoo's":
        return const Center(
          child: Text('Searching Huey Magoo\'s'),
        );
      case "Panda Express":
        return const Center(
          child: Text('Searching Panda Express'),
        );
      case "Qdoba":
        return const Center(
          child: Text('Searching Qdoba'),
        );
      case "Smoothie King":
        return const Center(
          child: Text('Searching Smoothie King'),
        );
      case "Steak 'n Shake":
        return const Center(
          child: Text('Searching Steak \'n Shake'),
        );
      case "Starbucks":
        return const Center(
          child: Text('Searching Starbucks'),
        );
      default:
        return const Center(
          child: Text('Searching All Foods'),
        );
    }
  }
}
