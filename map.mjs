import 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = L.map ("map1");
const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { attribution: attrib } ).addTo(map);

map.setView(
    [50.908,-1.4],
    14
);

const landmarks = [
    {
        name: "1",
        type: "1",
        country: "1",
        latitude: 1.0,
        longitude: 1.0,
        description: "1",
        recommendations: 1
    },
    {
        name: "2",
        type: "2",
        country: "2",
        latitude: 2.0,
        longitude: 2.0,
        description: "2",
        recommendations: 2
    }
]

landmarks.forEach(landmark => {
    const marker = L.marker([
        landmark.latitude,
        landmark.longitude
    ]).addTo(map);

    marker.bindPopup(`${landmark.name} (${landmark.latitude}, ${landmark.longitude})`);
})