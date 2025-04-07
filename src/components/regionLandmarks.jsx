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
            setRegions(
                <option>
                    {data[0].region}
                </option>
            );

        }).catch(error => {
            console.log(error);
        })
    })

    return (
        <Fragment>
            <label>
                Region
                <select>
                    {regions}
                </select>
            </label>
        </Fragment>
    )
}

export default RegionLandmarks;