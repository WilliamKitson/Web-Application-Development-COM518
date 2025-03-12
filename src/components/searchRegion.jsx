import React, {Fragment} from "react";

function SearchRegion() {
    return (
        <Fragment>
            <div>
                <label>
                    Region
                    <select id={"region"} onClick={getRegions}></select>
                </label>
                <button onClick={searchRegion}>
                    Search
                </button>
                <br/>
                <div id={"results"}></div>
            </div>
        </Fragment>
    )

    async function getRegions() {
        try {
            const response = await fetch("http://localhost:3000/pointsofinterest/regions");
            buildRegions(await response.json())

        } catch(e) {
            alert(e);
        }
    }

    function buildRegions(regions) {
        document.getElementById("region").innerHTML = regions;

        for (const region of regions) {
            const option = document.createElement("option")
            option.innerHTML = region.region;

            document.getElementById("region").appendChild(option)
        }
    }

    async function searchRegion() {
        try {
            const regionInput = document.getElementById("region").value;
            const response = await fetch(`http://localhost:3000/pointsofinterest/${regionInput}`);
            buildResults(await response.json());

        } catch(e) {
            alert(e);
        }
    }

    function buildResults(regions) {
        document.getElementById("results").innerHTML = ""

        for (const region of regions) {
            const paragraph = document.createElement("p");
            const paragraphText = document.createTextNode(region.name);

            paragraph.appendChild(paragraphText);
            document.getElementById("results").appendChild(paragraph);
        }
    }
}

export default SearchRegion;