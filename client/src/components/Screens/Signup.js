import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import M from "materialize-css"
const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])

    const uploadPic = () => {
        const data = new FormData();
        data.append('file', image)
        data.append('upload_preset', "instaClone")
        data.append('cloud_name', "dfnoivn3s")

        fetch('	https://api.cloudinary.com/v1_1/dfnoivn3s/image/upload', {
            method: 'post',
            body: data
        })
            .then(response => response.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const uploadFields = () => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
            setName("")
            setEmail("")
            setPassword("")
            return
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pic: url
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
    const postData = () => {
        if (image) {
            uploadPic()
        } else {
            uploadFields()
        }

    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="name"
                    value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="file-field input-field">
                    <div className="btn #1e88e5 blue darken-1">
                        <span>Upload File</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #1e88e5 blue darken-1" onClick={() => postData()}>
                    Signup
            </button>
                <h5><Link to="/signin">Already Signed In?</Link></h5>
            </div>
        </div>
    )
}

export default Signup
