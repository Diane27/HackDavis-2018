function getLocation(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      showPosition(position);
      cb(position);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  console.log('Latitude: ' + position.coords.latitude + '\nLongitude: ' + position.coords.longitude);
}
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var DEBUG = false;
var map;
var directionsService;
var directionsDisplay;

function initMap() {
  // Create the map after getting current location

  getLocation(function(position) {
    var pyrmont = DEBUG
      ? { lat: 37.969048, lng: -122.070668 }
      : { lat: position.coords.latitude, lng: position.coords.longitude };
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 17,
      minZoom: 15,
      maxZoom: 19,
      fullscreenControl: false,
      styles: [
        { featureType: 'poi.school', elementType: 'geometry.fill', stylers: [{ color: '#78be20' }] },
        { featureType: 'landscape.man_made', elementType: 'geometry.fill', stylers: [{ color: '#ECD47F' }] }
      ]
    });

    // Create the places service.
    var service = new google.maps.places.PlacesService(map);

    // Perform a nearby search.
    service.nearbySearch({ location: pyrmont, radius: 500, type: ['campus building'] }, function(
      results,
      status,
      pagination
    ) {
      if (status !== 'OK') return;

      createMarkers(results);
      // moreButton.disabled = !pagination.hasNextPage;
      // getNextPage = pagination.hasNextPage && function() {
      // pagination.nextPage();
      // };
    });

    // Create the directions service
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsDisplay.setMap(map);
  });
}

function createMarkers(places) {
  // var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; (place = places[i]), i < 10; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    var li = document.createElement('li');
    li.innerHTML = `<a href="#map">${place.name}</a>`;
    $(li).click(
      (function(place) {
        return function() {
          // works but not the best way --Jesse
          routeToBuilding(place);
        };
      })(place.geometry.location)
    );

    placesList.appendChild(li);

    // bounds.extend(place.geometry.location);
  }
  // map.fitBounds(bounds);
}
