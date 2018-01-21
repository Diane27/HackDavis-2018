var DEBUG = true;

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
  getLocation(function showPosition(position) {
    console.log('Latitude: ' + position.coords.latitude + '\nLongitude: ' + position.coords.latitude);

    var request = {
      origin: DEBUG
        ? new google.maps.LatLng(38.541687, -121.759801)
        : new google.maps.LatLng(position.coords.latitude, position.coords.latitude),
      destination: building,
      travelMode: 'WALKING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
        scrollUp();
      } else {
        debugger;
      }
    });
  });
}
