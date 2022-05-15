import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; // for using json.decode()

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // Hide the debug banner
      debugShowCheckedModeBanner: false,
      title: 'Kindacode.com',
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // The list that contains information about photos
  List _loadedPhotos = [];

  // The function that fetches data from the API
  Future<void> _fetchData() async {
    const API_URL = 'http://localhost:8000/subscribe';

    final response = await http.get(Uri.parse(API_URL));
    final data = json.decode(response.body);

    setState(() {
      _loadedPhotos = data;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Get Data from an API!'),
      ),
      body: SafeArea(
          child: _loadedPhotos.length == 0
              ? Center(
                  child: ElevatedButton(
                    child: Text('Get player List!'),
                    onPressed: _fetchData,
                  ),
                )
              // The ListView that displays photos
              : ListView.builder(
                  itemCount: _loadedPhotos.length,
                  itemBuilder: (BuildContext ctx, index) {
                    return ListTile(
                      leading: Image.network(
                        _loadedPhotos[index]["img"].toString(),
                        width: 50,
                        height: 50,
                        // fit: BoxFit.cover,
                      ),
                      title: Text(
                          ' Nom : ${_loadedPhotos[index]["nom"].toString()}'
                          '\n Prenom: ${_loadedPhotos[index]["prenom"].toString()}'),
                      subtitle: Text(
                          ' Club : ${_loadedPhotos[index]["Club"].toString()}'
                          '\n Age: ${_loadedPhotos[index]["Age"]}'
                          '\n Taille: ${_loadedPhotos[index]["Taille"]}'
                          '\n Sexe: ${_loadedPhotos[index]["Sexe"].toString()}'
                          '\n PiedFort: ${_loadedPhotos[index]["PiedFort"].toString()}'
                          '\n Description: ${_loadedPhotos[index]["Description"].toString()}'),
                    );
                  },
                )),
    );
  }
}
