import 'dart:developer';
import 'package:ucfeats/models/food_model.dart';
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

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
  static List<FoodModel>? getDailyEats() {}
}

class _HomePageState extends State<HomePage> {
  final _formKey = GlobalKey<FormState>();
  List<FoodModel>? dailyEats;

  double calorieGoal = 2000, proteinGoal = 200, carbGoal = 150, fatGoal = 80;
  double calorieTotal = 0, proteinTotal = 0, carbTotal = 0, fatTotal = 0;

  @override
  void initState() {
    super.initState();

    getDailyEats();
  }

  getDailyEats() async {
    try {
      final dailyEats = await ApiFunctions().getDailyEats();
      setState(() {
        this.dailyEats = dailyEats;
        for (int i = 0; i < dailyEats.length; i++) {
          this.calorieTotal += dailyEats![i].calories;
          this.proteinTotal += dailyEats![i].protein;
          this.carbTotal += dailyEats![i].carbs;
          this.fatTotal += dailyEats![i].fat;
        }
      });
    } catch (e) {
      debugPrint("Error during daily search");
      debugPrint('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = context.mediaQuerySize;

    return Scaffold(
      appBar: AppBar(
          backgroundColor: const Color.fromRGBO(224, 52, 64, 1),
          title: const Text("Home", style: TextStyle(color: Colors.white))),
      body: Column(
        children: [
          Container(
            height: size.height * .30,
            width: double.infinity,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                    flex: 3,
                    child: PieChart(PieChartData(
                        sectionsSpace: 0,
                        centerSpaceRadius: 0,
                        sections: macroSections()))),
                Expanded(
                    flex: 2,
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                              "Calorie Goal: ${calorieGoal.toInt().toString()}",
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold)),
                          const SizedBox(
                            height: 4,
                          ),
                          Text(
                              "Current Calories: ${calorieTotal.toInt().toString()}",
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold)),
                          const SizedBox(
                            height: 16,
                          ),
                          const Indicator(
                            color: Color(0xFFFF9F40),
                            text: 'Protein',
                            isSquare: true,
                          ),
                          const SizedBox(
                            height: 4,
                          ),
                          const Indicator(
                            color: Color(0xFFFF6182),
                            text: 'Carbohydrates',
                            isSquare: true,
                          ),
                          const SizedBox(
                            height: 4,
                          ),
                          const Indicator(
                            color: Color(0xFF35A1EC),
                            text: 'Fats',
                            isSquare: true,
                          ),
                        ]))
              ],
            ),
          ),
          const Divider(
            color: Color.fromRGBO(224, 224, 224, 1),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: dailyEats?.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text('${dailyEats?[index].name}'),
                  subtitle: Text(
                    '${dailyEats?[index].locationName}\t\t|\t\t${dailyEats?[index].calories} calories - ${dailyEats?[index].protein}g protein - ${dailyEats?[index].carbs}g carbs - ${dailyEats?[index].fat}g fat',
                  ),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(
                          Icons.delete,
                          color: Colors.black,
                          size: 15,
                        ),
                        onPressed: () {
                          setState(() async {
                            await ApiFunctions()
                                .deleteEat(dailyEats?[index].name);
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                duration: const Duration(seconds: 1),
                                content: Text(
                                  '${dailyEats?[index].name} deleted from your eats',
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
            ),
          ),
        ],
      ),
    );
  }

  List<PieChartSectionData> macroSections() {
    return List.generate(3, (i) {
      switch (i) {
        case 0:
          return PieChartSectionData(
            color: Color(0xFFFF9F40),
            value: proteinTotal,
            title: "${proteinTotal.toInt()}\n(of ${proteinGoal.toInt()})",
            radius: 55,
            titlePositionPercentageOffset: 1.6,
            titleStyle: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
            ),
          );
        case 1:
          return PieChartSectionData(
            color: Color(0xFFFF6182),
            value: carbTotal,
            title: "${carbTotal.toInt()}\n(of ${carbGoal.toInt()})",
            radius: 55,
            titlePositionPercentageOffset: 1.6,
            titleStyle: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
            ),
          );
        case 2:
          return PieChartSectionData(
            color: Color(0xFF35A1EC),
            value: fatTotal,
            title: "${fatTotal.toInt()}\n(of ${fatGoal.toInt()})",
            radius: 55,
            titlePositionPercentageOffset: 1.6,
            titleStyle: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
            ),
          );
        default:
          throw Error();
      }
    });
  }
}
