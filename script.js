const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidGhlcm9vcGVzaCIsImEiOiJja2t1eWJ2bjIwejA3MzFsbWo0Mmt5b3hxIn0.CVI29oMR3N-po-cNuBal-w'

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
})

function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: centerPosition,
    zoom: 14,
  })

  const navigationControls = new mapboxgl.NavigationControl()
  map.addControl(navigationControls)

  const directionControls = new MapboxDirections({
    accessToken: MAPBOX_ACCESS_TOKEN,
  })
  map.addControl(directionControls, 'top-left')
}

//Location that is captured by location sensor
function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
  console.log(position.coords.longitude)
  console.log(position.coords.latitude)
}

// Error Location
function errorLocation() {
  setupMap([80.2707, 13.0827])
}
