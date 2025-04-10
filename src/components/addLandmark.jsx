import React, {Fragment} from "react";

function AddLandmark() {
    return (
        <Fragment>
            <label>
                Name
                <input type={"text"} id={"landmarkName"} />
            </label>
            <br/>
            <label>
                Type
                <input type={"text"} id={"landmarkType"} />
            </label>
            <br/>
            <label>
                Country
                <input type={"text"} id={"landmarkCountry"} />
            </label>
            <br/>
            <label>
                Region
                <input type={"text"} id={"landmarkRegion"} />
            </label>
            <br/>
            <label>
                Longitude
                <input type={"number"} id={"landmarkLongitude"} />
            </label>
            <br/>
            <label>
                Latitude
                <input type={"number"} id={"landmarkLatitude"} />
            </label>
            <br/>
            <label>
                Description
                <input type={"text"} id={"landmarkDescription"} />
            </label>
            <br/>
            <button onClick={writeLandmark}>
                Save
            </button>
        </Fragment>
    )

    function writeLandmark() {
        fetch("/landmark/create", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "name": document.getElementById("landmarkName").value,
                "type": document.getElementById("landmarkType").value,
                "country": document.getElementById("landmarkCountry").value,
                "region": document.getElementById("landmarkRegion").value,
                "lon": document.getElementById("landmarkLongitude").value,
                "lat": document.getElementById("landmarkLatitude").value,
                "description": document.getElementById("landmarkDescription").value
            })
        }).catch(error => {
            console.log(error);
        })
    }
}

export default AddLandmark