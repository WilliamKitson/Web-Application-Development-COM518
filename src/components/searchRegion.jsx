import React, {Fragment} from "react";

function SearchRegion() {
    return (
        <Fragment>
            <div>
                <label>
                    Region
                    <input id={"region"} type={"text"} />
                </label>
                <button onClick={searchRegion}>
                    Search
                </button>
                <br/>
                <div id={"results"}></div>
            </div>
        </Fragment>
    )

    async function searchRegion() {
        try {
            const regionInput = document.getElementById("region").value;
            const response = await fetch(`http://localhost:3000/pointsofinterest/${regionInput}`);
            const regions = await response.json();

            document.getElementById("results").innerHTML = ""

            for (const region of regions) {
                const paragraph = document.createElement("p");
                const paragraphText = document.createTextNode(region.name);

                paragraph.appendChild(paragraphText);
                document.getElementById("results").appendChild(paragraph);
            }
        } catch(e) {
            alert(e);
        }
    }
}

export default SearchRegion;