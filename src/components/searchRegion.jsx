import React from "react";
import {Fragment} from "react";

function SearchRegion() {
    return (
        <Fragment>
            <div>
                <label>
                    Region
                    <input id="region" type="text" />
                </label>
                <button id="searchRegion">
                    Search
                </button>
                <br/>
                <div id="results"></div>
            </div>
        </Fragment>
    )
}

export default SearchRegion;