// Initialize map centered on Bloemfontein CBD
var map = L.map("map").setView([-29.1183, 26.2299], 14);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Marker: Bloem CBD
var cbdMarker = L.marker([-29.1183, 26.2299]).addTo(map);
cbdMarker.bindPopup("<b>Bloemfontein CBD</b>").openPopup();

// CUSTOM ICON for Rosebank 🎓
var rosebankIcon = L.icon({
  iconUrl: "images/rosebank-icon.png", // make sure this path is correct!
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

// Rosebank marker with custom icon
var rosebankMarker = L.marker([-29.1055, 26.2166], {
  icon: rosebankIcon,
}).addTo(map);
rosebankMarker.bindPopup(
  "<b>Rosebank College</b><br>Your final destination 🎓"
);

// Polyline route between points
var route = L.polyline(
  [
    [-29.1183, 26.2299], // CBD
    [-29.1055, 26.2166], // Rosebank
  ],
  {
    color: "deeppink",
    weight: 4,
    dashArray: "6, 6",
  }
).addTo(map);

// Geolocation: Find user
map.locate({ setView: true, maxZoom: 14 });

function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map).bindPopup("You are here 📍").openPopup();

  L.circle(e.latlng, radius, {
    color: "blue",
    fillColor: "#3f51b5",
    fillOpacity: 0.3,
  }).addTo(map);
}

map.on("locationfound", onLocationFound);

function onLocationError(e) {
  alert("We couldn't find your location 😢");
}

map.on("locationerror", onLocationError);
