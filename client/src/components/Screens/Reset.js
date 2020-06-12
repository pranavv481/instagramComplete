import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import M from "materialize-css";

const Reset = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")

    const postData = () => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })

            setEmail("")
            return
        }
        fetch("/reset-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#2e7d32 green darken-3" })
                    history.push("/signin")
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
                <button className="btn waves-effect waves-light #1e88e5 blue darken-1" onClick={() => postData()}>
                    Reset Password
            </button>

            </div>
        </div>
    )
}

export default Reset
