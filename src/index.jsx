import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import SearchRegion from "./components/searchRegion";
import PointsOfInterest from "./components/pointsOfInterest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Fragment>
        <div>
            Hello World from React!
            <SearchRegion/>
            <PointsOfInterest/>
        </div>
    </Fragment>
);