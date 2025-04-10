import React, {Fragment} from "react";

function AddLandmark() {
    return (
        <Fragment>
            <label>
                Name
                <input type={"text"} id={"name"} />
            </label>
            <br/>
            <label>
                Type
                <input type={"text"} id={"type"} />
            </label>
            <br/>
            <label>
                Country
                <input type={"text"} id={"country"} />
            </label>
            <br/>
            <label>
                Region
                <input type={"text"} id={"region"} />
            </label>
            <br/>
            <label>
                Longitude
                <input type={"number"} id={"longitude"} />
            </label>
            <br/>
            <label>
                Latitude
                <input type={"number"} id={"latitude"} />
            </label>
            <br/>
            <label>
                Description
                <input type={"text"} id={"description"} />
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
                "name": "will",
                "type": "will",
                "country": "will",
                "region": "will",
                "lon": 0.0,
                "lat": 0.0,
                "description": "will"
            })
        }).catch(error => {
            console.log(error);
        })
    }
}

export default AddLandmark