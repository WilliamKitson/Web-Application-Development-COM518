import React, {Fragment, useEffect, useRef} from "react";
import 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapScreen() {
    const mapRef = useRef(null);

    useEffect(() => {
        initialiseLeaflet()
        loadLandmarks("Southampton")
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
        mapRef.current = L.map ("map1");
        const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

        L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(mapRef.current);

        mapRef.current.setView(
            [50.908,-1.4],
            14
        );

        mapRef.current.on("click", function (event) {
            const text = prompt("Who lives in a house like this?");
            const marker = L.marker(event.latlng).addTo(mapRef.current);
            marker.bindPopup(`${text} (${event.latlng.lat}, ${event.latlng.lng})`);
        })
    }

    function loadLandmarks(region) {
        fetch(`http://localhost:3000/landmark/${region}`).then(response => {
            if (response.status === 200) {
                return response.json();
            }

            throw new Error(response.statusText);

        }).then(data => {
            setMarkers(data);

            let xpos = 0.0;
            let ypos = 0.0;

            data.forEach(function(each){
                xpos += each.lat;
                ypos += each.lon;
            })

            xpos /= data.length;
            ypos /= data.length;

            mapRef.current.setView(
                [xpos, ypos],
                14
            );

        }).catch(error => {
            console.log(error);
        })
    }

    function setMarkers(data) {
        data.forEach(function(each){
            const marker = L.marker([
                each.lat,
                each.lon
            ]).addTo(mapRef.current);

            marker.bindPopup(`${each.name} ${each.description}`);
        })
    }
}

export default MapScreen;