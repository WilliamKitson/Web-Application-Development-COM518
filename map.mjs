import 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = L.map ("map1");
const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { attribution: attrib } ).addTo(map);

const pos = [50.908,-1.4]

map.setView(pos, 14);
L.marker(pos).addTo(map);

map.on("click", function (event) {
    const text = prompt("Who lives in a house like this?");
    const marker = L.marker(event.latlng).addTo(map);
    marker.bindPopup(`${text} (${event.latlng.lat}, ${event.latlng.lng})`);
})