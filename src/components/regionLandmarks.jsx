import React, {Fragment, useEffect, useState} from "react";

const defaultRegions = (
    <option>
        No Region
    </option>
)

const defaultLandmarks = (
    <tr>
        <td>
            None
        </td>
        <td>
            None
        </td>
        <td>
            None
        </td>
        <td>
            Lat: None, Lon: None
        </td>
        <td>
            None
        </td>
        <td>
            <button>
                0
            </button>
        </td>
    </tr>
)

function RegionLandmarks() {
    const [regions, setRegions] = useState(defaultRegions);
    const [landmarks, setLandmarks] = useState(defaultLandmarks)

    useEffect(() => {
        loadRegions()
    })

    return (
        <Fragment>
            <label>
                Region
                <select id="region" onChange={loadLandmarks}>
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
                    {landmarks}
                </tbody>
            </table>
            <br/>
        </Fragment>
    )

    function loadRegions() {
        fetch("/landmark/regions").then(response => {
            if (response.status === 200) {
                return response.json();
            }

            throw new Error(response.statusText);

        }).then(data => {
            let formattedData = []
            formattedData.push((
                <option>
                    No Region
                </option>
            ))

            data.forEach(function(each){
                formattedData.push(
                    <option>
                        {each.region}
                    </option>
                )
            })

            setRegions(formattedData);

        }).catch(error => {
            setRegions(defaultRegions)
        })
    }

    function loadLandmarks() {
        fetch(`/landmark/${document.getElementById("region").value}`).then(response => {
            if (response.status === 200) {
                return response.json();
            }

            throw new Error(response.statusText);

        }).then(data => {
            let formattedData = []

            data.forEach(function(each){
                formattedData.push(
                    <tr>
                        <td>
                            {each.name}
                        </td>
                        <td>
                            {each.type}
                        </td>
                        <td>
                            {each.country}
                        </td>
                        <td>
                            Lat: {each.lat}, Lon: {each.lon}
                        </td>
                        <td>
                            {each.description}
                        </td>
                        <td>
                            <button onClick={() => recommend(each.id)}>
                                {each.recommendations}
                            </button>
                        </td>
                    </tr>
                )
            })

            setLandmarks(formattedData);

        }).catch(error => {
            setLandmarks(defaultLandmarks)
        })
    }

    function recommend(id) {
        fetch(`/landmark/recommend/${id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"}
        }).then(data => {
            loadLandmarks();

        }).catch(error => {
            console.log(error);
        })

    }
}

export default RegionLandmarks;