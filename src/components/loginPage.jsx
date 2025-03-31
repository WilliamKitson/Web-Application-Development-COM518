import React, {Fragment} from "react";

function LoginPage() {
    const user = getLoggedIn()

    if (user) {
        return (
            <Fragment>
                NAME is logged in!
                <br/>
                <button onClick={logout}>
                    Logout
                </button>
            </Fragment>
        )
    }

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

    async function getLoggedIn() {
        try {
            const response = await fetch("http://localhost:3000/authentication/user");
            const data = await response.json();
            alert(data.username);
            return data.username;

        } catch(e) {
            alert(e);
        }
    }

    function login() {
        alert(`${document.getElementById("username").value} ${document.getElementById("password").value}`);
    }

    function logout() {
        alert("Logged out!")
    }
}

export default LoginPage;