import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import SearchRegion from "./components/searchRegion";
import PointsOfInterest from "./components/pointsOfInterest";
import AddPOI from "./components/addPOI";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Fragment>
        <div>
            <SearchRegion/>
            <PointsOfInterest region={"Southampton"}/>
            <AddPOI/>
        </div>
    </Fragment>
);