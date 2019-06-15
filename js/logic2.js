var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap = L.map("map-id", {
    center: [45.52, -122.67],
    zoom: 13
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
var tiles = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    // maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);


// d3.json(queryUrl, function (data) {
//     // console.log(data)
//     createFeatures(data.features);
// });

function createFeatures(earthquakedata) {

    // console.log(earthquakedata);


    function onEachFeature(features, layer) {
        layer.bindPopup("<h3>" + features.properties.place +
            "</h3><hr><p>" + new Date(features.properties.time) + "</p>");
    }


    // use swich case 
    function getColor(d) {
        return d < 3 ? '#008000' :
            d < 4 ? '#FFFF00' :
                d < 5 ? '#FFA500' :
                    d < 6 ? '#FF0000' :
                        '#f08b5c';

    }

    var earthquake = L.geoJson(earthquakedata, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {




            var geojsonMarkerOptions = {
                radius: 5 * feature.properties.mag,
                fillColor: getColor(feature.properties.mag),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8

            };

            return L.circleMarker(latlng, geojsonMarkerOptions);

        }
    });

    // createMap(earthquake);
    // This gets inserted into the div with an id of 'map'



};

function createMap(earthquake) {


    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 5,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    var baseMap = {
        "street Map": streetmap,
    };

    var overlayMaps = {
        Earthquake: earthquake
    };


    var myMap = L.map("map-id", {
        center: [
            39.73, -104.98
        ],
        zoom: 7,
        layers: [streetmap, earthquake]
    });




    L.control.layers(baseMap, overlayMaps, {
        collapsed: false

    }).addTo(myMap);


    function getColor(d) {
        return d < 3 ? '#008000' :
            d < 4 ? '#FFFF00' :
                d < 5 ? '#FFA500' :
                    d < 6 ? '#FF0000' :
                        '#f08b5c';

    }

    // var legend = L.control({ position: 'topright' });

    // legend.onAdd = function (map) {

    //     var div = L.DomUtil.create('div', 'info legend'),
    //         grades = [0, 1, 2, 3, 4, 5];
    //     div.innerHTML += '<h4>Magnitude</h4><hr>'

    //     for (var i = 0; i < grades.length; i++) {
    //         div.innerHTML +=
    //             '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
    //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    //     }

    //     return div;
    // };

    // legend.addTo(myMap)



}



