import 'dart:developer';
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
}

class _SearchPageState extends State<SearchPage> {
  final _formKey = GlobalKey<FormState>();
  SearchController searchQuery = SearchController();

  void add(search) {}

  @override
  Widget build(BuildContext context) {
    final size = context.mediaQuerySize;
    int testing = 0;

    Testing() {
      testing += 5;
    }

    return Scaffold(
        appBar: AppBar(
          backgroundColor: const Color.fromRGBO(224, 52, 64, 1),
          title: const Text("Add Food", style: TextStyle(color: Colors.white)),
          actions: [
            SearchAnchor(
                viewBackgroundColor: Colors.white,
                isFullScreen: true,
                key: _formKey,
                builder: (BuildContext context, SearchController searchQuery) {
                  return IconButton(
                    color: Colors.black,
                    icon: const Icon(Icons.search),
                    onPressed: () {
                      searchQuery.openView();
                    },
                  );
                },
                suggestionsBuilder:
                    (BuildContext context, SearchController controller) {
                  return List<ListTile>.generate(25, (int index) {
                    final String item = 'item $index';
                    return ListTile(
                      title: Text(item),
                      onTap: () {
                        setState(() {
                          controller.closeView(item);
                        });
                      },
                    );
                  });
                }),
            IconButton(
                color: Colors.black,
                onPressed: () {
                  Testing();
                },
                icon: const Icon(Icons.add))
          ],
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SingleChildScrollView(
              child: Column(children: [
                SizedBox(height: 30),
                Text(
                  "Favorite Eats",
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                Divider(color: Colors.grey),
                Text(
                  "No Favorites Currently",
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 50),
                Text(
                  "Recent Eats",
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                Divider(color: Colors.grey),
                Text(
                  "No Recents Currently",
                  textAlign: TextAlign.center,
                ),
              ]),
            )
          ],
        ));
  }
}
