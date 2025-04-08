import React, {Fragment, useEffect, useState} from "react";

function RegionLandmarks() {
    const [regions, setRegions] = useState((
        <option>
            No Region
        </option>
    ));

    useEffect(() => {
        fetch("http://localhost:3000/landmark/regions").then(response => {
            if (response.status === 200) {
                return response.json();
            }

        }).then(data => {
            let options = []

            data.forEach(function(each){
                options.push(
                    <option>
                        {each.region}
                    </option>
                )
            })

            setRegions(options);

        }).catch(error => {
            console.log(error);
        })
    })

    return (
        <Fragment>
            <label>
                Region
                <select id="region" onChange={searchRegion}>
                    {regions}
                </select>
            </label>
            <br/>
            <table>
                <thead>
                <tr>
                    <td>
                        Name
                    </td>
                    <td>
                        Type
                    </td>
                    <td>
                        Country
                    </td>
                    <td>
                        Coordinates
                    </td>
                    <td>
                        Description
                    </td>
                    <td>
                        Recommendations
                    </td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            TEMP
                        </td>
                        <td>
                            TEMP
                        </td>
                        <td>
                            TEMP
                        </td>
                        <td>
                            Lat: TEMP, Lon: TEMP
                        </td>
                        <td>
                            TEMP
                        </td>
                        <td>
                            <button onClick={recommend}>
                                TEMP
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
        </Fragment>
    )

    function searchRegion() {
        alert(`search ${document.getElementById("region").value}`);
    }

    function recommend() {
        alert("recommend");
    }
}

export default RegionLandmarks;