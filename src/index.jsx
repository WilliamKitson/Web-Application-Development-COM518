import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from "./components/loginPage";
import RegionLandmarks from "./components/regionLandmarks";
import AddPOI from "./components/addPOI";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Fragment>
        <div>
            <LoginPage />
            <RegionLandmarks />
            <AddPOI/>
        </div>
    </Fragment>
);