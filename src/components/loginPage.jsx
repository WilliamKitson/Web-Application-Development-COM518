import React, {Fragment, useState, useEffect} from "react";

function LoginPage() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/authentication/user")
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }
                throw new Error("Unable to login");
            })
            .then(data => {
                setUsername(data.username);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    if (username) {
        return (
            <Fragment>
                {username} is logged in!
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

    async function login() {
        try {
            await fetch("/authentication/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value
                })
            }).then(response => {
                if(response.status === 200){
                    return response.json();
                }
                throw new Error("Unable to login");
            })
                .then(data => {
                    setUsername(data.username);
                })
                .catch(error => {
                    console.log(error);
                })

        } catch (error) {
            alert(error);
        }
    }

    async function logout() {
        try {
            await fetch("/authentication/logout", {
                method: "POST",
                headers: {"Content-Type" : "application/json"}
            });

            setUsername("");

        } catch (error) {
            alert(error);
        }
    }
}

export default LoginPage;