import React, {Fragment} from "react";

function AddPOI() {
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
            <button onClick={postPOI}>
                Save
            </button>
        </Fragment>
    )

    async function postPOI() {
        const POI = {
            name: document.getElementById("name").value,
            type: document.getElementById("type").value,
            country: document.getElementById("country").value,
            region: document.getElementById("region").value,
            longitude: document.getElementById("longitude").value,
            latitude: document.getElementById("latitude").value,
            description: document.getElementById("description").value,
        }

        try {
            await fetch("/pointsofinterest/create", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(POI)
            });

        } catch (error) {
            alert(error);
        }
    }
}

export default AddPOI