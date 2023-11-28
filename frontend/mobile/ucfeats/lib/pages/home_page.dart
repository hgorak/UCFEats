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

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _formKey = GlobalKey<FormState>();

  double calorieGoal = 2000, proteinGoal = 200, carbGoal = 100, fatGoal = 80;
  double calorieTotal = 1800, proteinTotal = 100, carbTotal = 50, fatTotal = 80;

  @override
  Widget build(BuildContext context) {
    final size = context.mediaQuerySize;

    return Scaffold(
      appBar: AppBar(
          backgroundColor: const Color.fromRGBO(224, 52, 64, 1),
          title: const Text("Testing")),
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
                            color: Colors.blue,
                            text: 'Protein',
                            isSquare: true,
                          ),
                          const SizedBox(
                            height: 4,
                          ),
                          const Indicator(
                            color: Colors.yellow,
                            text: 'Carbohydrates',
                            isSquare: true,
                          ),
                          const SizedBox(
                            height: 4,
                          ),
                          const Indicator(
                            color: Colors.purple,
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
            child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: Column(
                  children: [
                    ElevatedButton(
                        onPressed: () {
                          setState(() {
                            proteinTotal += 5;
                          });
                        },
                        child: const Text("Press me")),
                    const Text(
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."),
                    const Text(
                        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.")
                  ],
                )),
          )
        ],
      ),
    );
  }

  List<PieChartSectionData> macroSections() {
    return List.generate(3, (i) {
      switch (i) {
        case 0:
          return PieChartSectionData(
            color: Colors.blue,
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
            color: Colors.yellow,
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
            color: Colors.purple,
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
