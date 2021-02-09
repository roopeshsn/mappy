const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidGhlcm9vcGVzaCIsImEiOiJja2t1eWJ2bjIwejA3MzFsbWo0Mmt5b3hxIn0.CVI29oMR3N-po-cNuBal-w'

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
})

// Location that is captured by location sensor
function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

// Error Location
function errorLocation() {
  errorMap()
}

function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: centerPosition,
    zoom: 14,
  })

  var geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: centerPosition,
        },
        properties: {
          title: 'Mapbox',
          description: 'Your Location',
        },
      },
    ],
  }

  geojson.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement('div')
    el.className = 'marker'

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            '<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'
          )
      )
      .addTo(map)
  })
}

function errorMap() {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', //'mapbox://styles/mapbox/light-v10',
    center: [78.6569, 11.1271],
    zoom: 6,
  })
}
