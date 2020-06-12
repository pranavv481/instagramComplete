import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import M from "materialize-css";
import { UserContext } from "../../App";
const Signin = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const postData = () => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })

            setEmail("")
            setPassword("")
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(data => {

                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: "successfully Signin", classes: "#2e7d32 green darken-3" })
                    history.push("/")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #1e88e5 blue darken-1" onClick={() => postData()}>
                    Signin
            </button>
                <h5><Link to="/signup">Create A New Account</Link></h5>
            </div>
        </div>
    )
}

export default Signin
