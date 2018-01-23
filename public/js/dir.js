var directionsMarkers = [];

function getNextClass(schedule) {
  var d = DEBUG ? new Date('Mon Jan 22 2018 08:30:23 GMT-0800 (PST)') : new Date();
  var day = (d.getDay() + 6) % 7;
  var hour = d.getHours();
  var minute = d.getMinutes();
  var nextClass = null;

  for (var section of schedule) {
    if (section.days[day]) {
      var classStart = section['start-time'].split(':').map(n => Number(n));

      if (classStart[0] > hour || (classStart[0] === hour && classStart[1] > minute)) {
        nextClass = section;
        break;
      }
    }
  }

  return nextClass;
}

function routeToBuilding(building) {
  getLocation(function(position) {
    var request = {
      origin: DEBUG
        ? new google.maps.LatLng(37.969048, -122.070668) // DVC
        : new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      destination: building,
      travelMode: 'WALKING'
    };
    directionsService.route(request, function(result, status) {
      for (var marker of directionsMarkers) {
        marker.setMap(null);
      }

      if (status == 'OK') {
        var route = result.routes[0].legs[0];
        directionsMarkers = [
          new google.maps.Marker({
            position: route.start_location,
            map: map,
            icon: '/img/pin_a.png'
          }),
          new google.maps.Marker({
            position: route.end_location,
            map: map,
            icon: '/img/pin_b1.png'
          })
        ];

        directionsDisplay.setDirections(result);
      } else {
        alert(`Could not find route to building "${building}"`);
      }
    });
  });
}
