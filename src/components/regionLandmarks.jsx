import React, {Fragment, useEffect, useState} from "react";

function RegionLandmarks() {
    const [regions, setRegions] = useState((
        <option>
            No Region
        </option>
    ));

    const [landmarks, setLandmarks] = useState((
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
                <button onClick={recommend}>
                    None
                </button>
            </td>
        </tr>
    ))

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
        fetch("http://localhost:3000/landmark/regions").then(response => {
            if (response.status === 200) {
                return response.json();
            }

        }).then(data => {
            let options = []
            options.push((
                <option>
                    No Region
                </option>
            ))

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
    }

    function loadLandmarks() {
        fetch(`http://localhost:3000/landmark/${document.getElementById("region").value}`).then(response => {
            if (response.status === 200) {
                return response.json();
            }

        }).then(data => {
            let temp = []

            data.forEach(function(each){
                temp.push(
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
                            <button onClick={recommend}>
                                {each.recommendations}
                            </button>
                        </td>
                    </tr>
                )
            })

            setLandmarks(temp);

        }).catch(error => {
            console.log(error);
        })
    }

    function recommend() {
        alert("recommend");
    }
}

export default RegionLandmarks;