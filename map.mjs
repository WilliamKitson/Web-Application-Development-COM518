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

loadLandmarks("Southampton")

async function loadLandmarks(region) {
    try {
        const response = await fetch(`http://localhost:3000/landmark/${region}`);
        const landmarks = await response.json();

        for (const landmark of landmarks) {
            const marker = L.marker([
                landmark.lat,
                landmark.lon
            ]).addTo(map);

            marker.bindPopup(`${landmark.name} (${landmark.lat}, ${landmark.lon})`);
        }

    } catch (e) {
        alert(`There was an error: ${e}`);
    }
}