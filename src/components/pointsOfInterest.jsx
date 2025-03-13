import React, {Fragment} from "react";

function PointsOfInterest(props) {
    getPointsOfInterest(props.region)

    return (
        <Fragment>
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
                    {tableBody()}
                </tbody>
            </table>
        </Fragment>
    )

    function tableBody() {
        const points = [
            {
                name: "1",
                type: "1",
                country: "1",
                latitude: 1.0,
                longitude: 1.0,
                description: "1",
                recommendations: 1
            },
            {
                name: "2",
                type: "2",
                country: "2",
                latitude: 2.0,
                longitude: 2.0,
                description: "2",
                recommendations: 2
            }
        ];

        return points.map(point =>
            <tr>
                <td>
                    {point.name}
                </td>
                <td>
                    {point.type}
                </td>
                <td>
                    {point.country}
                </td>
                <td>
                    Lat: {point.latitude}, Lon: {point.longitude}
                </td>
                <td>
                    {point.description}
                </td>
                <td>
                    <button onClick={recommend}>
                        {point.recommendations}
                    </button>
                </td>
            </tr>
        );
    }

    async function getPointsOfInterest(region) {
        try {
            const response = await fetch(`http://localhost:3000/pointsofinterest/${region}`);

            for (const i in await response.json()) {
                alert(i.name)
            }

        } catch(e) {
            alert(e);
        }
    }

    function recommend() {
        alert("recommend");
    }
}

export default PointsOfInterest;