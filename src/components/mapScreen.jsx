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

            const domDivReview = document.createElement("input");
            domDivReview.id = `review_${each.id}`;
            domDivReview.type = "text";
            domDivReview.placeholder = "Please leave a review";

            const domDivSubmit = document.createElement("button");
            domDivSubmit.innerHTML = "Submit";
            domDivSubmit.setAttribute("id", each.id);
            domDivSubmit.onclick = function () {
                writeReview(domDivSubmit.id);
            }

            const domDiv = document.createElement("div");
            domDiv.innerHTML = each.name;
            domDiv.appendChild(domDivReview);
            domDiv.appendChild(domDivSubmit);
            marker.bindPopup(domDiv);
        })
    }

    function writeReview(id) {
        fetch(`/landmark/review/${id}`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "review": document.getElementById(`review_${id}`).value
            })
        }).catch(error => {
            console.log(error);
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

        const domDivName = document.createElement("input");
        domDivName.id = `addName_${event.id}`;
        domDivName.placeholder = "name";

        const domDivType = document.createElement("input");
        domDivType.id = `addType_${event.id}`;
        domDivType.placeholder = "type";

        const domDivCountry = document.createElement("input");
        domDivCountry.id = `addCountry_${event.id}`;
        domDivCountry.placeholder = "country";

        const domDivRegion = document.createElement("input");
        domDivRegion.id = `addRegion_${event.id}`;
        domDivRegion.placeholder = "region";

        const domDivDescription = document.createElement("input");
        domDivDescription.id = `addDescription_${event.id}`;
        domDivDescription.placeholder = "description";

        const domDiv = document.createElement('div');
        domDiv.innerHTML = `Please define this landmark at lat: ${event.latlng.lat}, lon: ${event.latlng.lng}`;
        domDiv.appendChild(document.createElement("br"));
        domDiv.appendChild(domDivName);
        domDiv.appendChild(document.createElement("br"));
        domDiv.appendChild(domDivType);
        domDiv.appendChild(document.createElement("br"));
        domDiv.appendChild(domDivCountry);
        domDiv.appendChild(document.createElement("br"));
        domDiv.appendChild(domDivRegion);
        domDiv.appendChild(document.createElement("br"));
        domDiv.appendChild(domDivDescription);

        marker.bindPopup(domDiv);
    }
}

export default MapScreen;