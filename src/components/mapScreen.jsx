import React, {Fragment, useEffect, useRef} from "react";
import 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapScreen(props) {
    const mapRef = useRef(null);

    useEffect(() => {
        initialiseLeaflet()
        loadLandmarks(props.region)
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
        if (mapRef.current && mapRef.current.remove) {
            mapRef.current.off();
            mapRef.current.remove();
        }

        mapRef.current = L.map ("map1");
        const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

        L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(mapRef.current);

        mapRef.current.setView(
            [50.908,-1.4],
            10
        );

        mapRef.current.on("click", function (event) {
            writeLandmark(event)
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
            setCamera(data);

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

            const domDiv = document.createElement('div');
            domDiv.innerHTML = `${each.name}<br/><input type='text' placeholder='Please leave your review'><br/><button>Submit</button>`;

            marker.bindPopup(domDiv);
        })
    }

    function setCamera(data) {
        let latitude = 0.0;
        let longitude = 0.0;

        data.forEach(function(each){
            latitude += each.lat;
            longitude += each.lon;
        })

        latitude /= data.length;
        longitude /= data.length;

        mapRef.current.setView(
            [latitude, longitude],
            10
        );
    }

    function writeLandmark(event) {
        const marker = L.marker([
            event.latlng.lat,
            event.latlng.lng
        ]).addTo(mapRef.current);

        const domDiv = document.createElement('div');
        domDiv.innerHTML = "";

        marker.bindPopup(domDiv);
    }
}

export default MapScreen;