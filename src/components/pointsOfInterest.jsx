import React, {Fragment} from "react";

function PointsOfInterest() {
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
                            <button onClick={recommend}>
                                Recommendations
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )

    function recommend() {
        alert("recommend");
    }
}

export default PointsOfInterest;