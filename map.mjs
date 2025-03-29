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

        for (const landmark of await response.json()) {
            const marker = L.marker([
                landmark.lat,
                landmark.lon
            ]).addTo(map);

            marker.bindPopup(`${landmark.name} ${landmark.description}`);
        }

    } catch (e) {
        alert(`There was an error: ${e}`);
    }
}

map.on("click", function (event) {
    const text = prompt("Who lives in a house like this?");
    const marker = L.marker(event.latlng).addTo(map);
    marker.bindPopup(`${text} (${event.latlng.lat}, ${event.latlng.lng})`);
})