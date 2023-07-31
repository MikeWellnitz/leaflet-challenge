let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function(data) {
    console.log(data);
    createFeatures(data.features);



});

function getColor(depth) {
    if (
        depth > 90
    ) {return "red"} 
    else if (
        depth > 70
    ) {return "orangered"}
    else if (
        depth > 50
    ) {return "orange"}
    else if (
        depth > 30
    ) {return "yellow"}
    else if (
        depth > 10
    ) {return "green"}
    else if (
        depth > -10
    ) {return "limegreen"}
};

function createFeatures(earthquakeData) {

    let markerOptions = {
        
    };



    function onEachFeature(features, layer) {
        layer.bindPopup(`<h2>Location: ${features.properties.place}</h2> <hr> <h3>Magnitude: ${features.properties.mag}</h3>`);
    }
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 5,
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8 
            })
               ;
        }
    })

    createMap(earthquakes);
}; 

function createMap(earthquakes) {

     let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [earthquakes]
    });








    
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

            let div = L.DomUtil.create('div', 'info legend'),
                grades = [-10, 10, 30, 50, 70, 90]
            
            for (let i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            return div;
    };

    legend.addTo(myMap);







  
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
    
  
}




function markerSize(magnitude) {
    return Math.sqrt(magnitude) * 50;
  }
  

  for (let i = 0; i < earthquakes.length; i++) {
    L.circle(earthquakes[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      
      radius: markerSize(earthquakes[i].mag)
    }).bindPopup(`<h1>${features.properties.placeearthquakes[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  }
  