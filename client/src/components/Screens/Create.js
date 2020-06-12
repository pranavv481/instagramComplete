import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import M from "materialize-css"
const Create = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    }
                    else {
                        M.toast({ html: "successfully Added Post", classes: "#2e7d32 green darken-3" })
                        history.push("/")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [url])
    const postDetails = () => {
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
    return (
        <div className="card auth-card input-field">
            <input type="text" placeholder="title"
                value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
            <div className="file-field input-field">
                <div className="btn #1e88e5 blue darken-1">
                    <span>Upload File</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #1e88e5 blue darken-1" onClick={() => postDetails()}>
                Submit Post
            </button>
        </div>
    )
}

export default Create
