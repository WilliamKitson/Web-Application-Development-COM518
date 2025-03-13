import React, {Fragment} from "react";

function AddPOI() {
    return (
        <Fragment>
            <label>
                Name
                <input type={"text"} />
            </label>
            <br/>
            <label>
                Type
                <input type={"text"} />
            </label>
            <br/>
            <label>
                Country
                <input type={"text"} />
            </label>
            <br/>
            <label>
                Region
                <input type={"text"} />
            </label>
            <br/>
            <label>
                Longitude
                <input type={"number"} />
            </label>
            <br/>
            <label>
                Latitude
                <input type={"number"} />
            </label>
            <br/>
            <label>
                Description
                <input type={"text"} />
            </label>
            <br/>
            <button onClick={savePOI}>
                Save
            </button>
        </Fragment>
    )

    function savePOI() {
        alert("Save POI")
    }
}

export default AddPOI