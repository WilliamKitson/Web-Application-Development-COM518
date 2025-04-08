import React, {Fragment, useEffect} from "react";
import 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapScreen() {
    useEffect(() => {
        initialiseLeaflet()
    })

    return (
        <Fragment>
            <div id={"map1"} style={{width: "800px", height: "600px"}}>
                Map
            </div>
            <br/>
        </Fragment>
    )

    function initialiseLeaflet() {
        const map = L.map ("map1");
        const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

        L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);

        map.setView(
            [50.908,-1.4],
            14
        );

        map.on("click", function (event) {
            const text = prompt("Who lives in a house like this?");
            const marker = L.marker(event.latlng).addTo(map);
            marker.bindPopup(`${text} (${event.latlng.lat}, ${event.latlng.lng})`);
        })

        fetch(`http://localhost:3000/landmark/Southampton`).then(response => {
            if (response.status === 200) {
                return response.json();
            }

            throw new Error(response.statusText);

        }).then(data => {
            data.forEach(function(each){
                const marker = L.marker([
                    each.lat,
                    each.lon
                ]).addTo(map);

                marker.bindPopup(`${each.name} ${each.description}`);
            })

        }).catch(error => {
            console.log(error);
        })
    }
}

export default MapScreen;