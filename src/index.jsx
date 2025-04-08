import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from "./components/loginPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Fragment>
        <div>
            <LoginPage />
        </div>
    </Fragment>
);