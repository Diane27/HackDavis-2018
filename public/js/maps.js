var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 38.544907, lng: -121.740517},
  zoom: 8
});
}