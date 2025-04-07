import React, {Fragment, useEffect} from "react";

function RegionLandmarks() {
    useEffect(() => {
        fetch("http://localhost:3000/landmark/regions").then(response => {
            if (response.status === 200) {
                return response.json();
            }

        }).then(data => {
            for (const i of data) {
                alert(i.region);
            }

        }).catch(error => {
            console.log(error);
        })
    })

    return (
        <Fragment>
            TEST
        </Fragment>
    )
}

export default RegionLandmarks;