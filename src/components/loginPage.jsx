import React, {Fragment} from "react";

function LoginPage() {
    if (true) {
        return (
            <Fragment>
                <label>
                    Username
                    <input type={"text"} id={"username"} placeholder={"Username"} />
                </label>
                <br/>
                <label>
                    Password
                    <input type={"password"} id={"password"} placeholder={"Password"}/>
                </label>
                <br/>
                <button onClick={login}>
                    Login
                </button>
            </Fragment>
        )
    }

    return (
        <Fragment>
            NAME is logged in!
            <br/>
            <button onClick={logout}>
                Logout
            </button>
        </Fragment>
    )

    function login() {
        alert(`${document.getElementById("username").value} ${document.getElementById("password").value}`);
    }

    function logout() {
        alert("Logged out!")
    }
}

export default LoginPage;