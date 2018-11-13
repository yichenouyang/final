'use strict'
mapboxgl.accessToken = 'pk.eyJ1Ijoib3l5YyIsImEiOiJjam43dzZqYjIwM3RvM3FwZjg2emVmeXFnIn0.r4AOJghdRp7zMMppmH58aQ';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/oyyc/cjoet1wk65cc02rma9r5w9xs6',
    zoom: 9.78,
    center: [-73.846007,40.719522]
});

//Create base map 
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})
map.addControl(navigation, 'top-left')
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})
map.addControl(geolocate, 'top-left')
let legendlayers = ['D "Hazardous', 'C "Definitely Declinning"', 'B "Still Desirable"', 'A "Best"'];
let colors = ['#eb4242', '#ffe205', '#4e4ee4', '#438e43'];
for (i = 0; i < legendlayers.length; i++) {
  var legendlayer = legendlayers[i];
  var color = colors[i];
  var item = document.createElement('div');
  var key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  var value = document.createElement('span');
  value.innerHTML = legendlayer;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
}

//Show and hide maps 
map.on('load', function () {
    map.addSource('holc', {
        type: 'vector',
        url: 'mapbox://oyyc.1rcu2rw4'
    });
    map.addLayer({
        'id': 'HOLC Map',
        'type': 'fill',
        'source': 'holc',
        'source-layer': 'holcALLgeojason-4xl0ff',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': {
                property: 'Grade1',
                stops: [[1, '#eb4242'], [2, '#ffe205'], [3, '#4e4ee4'], [4, '#438e43']]
            },
        'fill-opacity': 0.9
        }
    });

    map.addSource('holc2016', {
        type: 'vector',
        url: 'mapbox://oyyc.4f7vt50c'
    });
    map.addLayer({
        'id': 'Grade in 2016',
        'type': 'fill',
        'source': 'holc2016',
        'source-layer': 'holc2016census-ahlf64',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': {
                property: 'grade',
                stops: [[1, '#eb4242'], [2, '#ffe205'], [3, '#4e4ee4'], [4, '#438e43']]
            },
        'fill-opacity': 0.9
        }
    });
});

let toggleableLayerIds = [ 'Grade in 2016', 'HOLC Map' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

//Query information 
map.on('click', function(event) {

    let features = map.queryRenderedFeatures(event.point)
    console.log(features)
    const {'0':{properties:{grade}}}=features
    const {'0':{properties:{minority_R}}}=features
    const {'0':{properties:{poverty_R}}}=features
    const {'0':{properties:{unemploy_R}}}=features
    const {'0':{properties:{vacancy_R}}}=features
    document.getElementById('pd').innerHTML = 'Grade in 2016 is: '+ grade +
     '</br>Minority rate is: ' + minority_R.toFixed(2) + '</br>Poverty rate is: ' + poverty_R.toFixed(2) + '</br>Unemployment rate is: ' + unemploy_R.toFixed(2) + '</br>Vacancy rate is: ' + vacancy_R.toFixed(2)
});


