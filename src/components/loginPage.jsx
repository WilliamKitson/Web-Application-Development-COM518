import React, {Fragment} from "react";

function LoginPage() {
    return (
        <Fragment>
            <label>
                Username
                <input type={"text"} placeholder={"Username"} />
            </label>
            <br/>
            <label>
                Password
                <input type={"password"} placeholder={"Password"}/>
            </label>
        </Fragment>
    )
}

export default LoginPage;