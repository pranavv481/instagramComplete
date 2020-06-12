import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../App";
const Profile = () => {
    const [myPics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    // console.log(state)

    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                setPics(result.mypost)
            });
    }, [])
    useEffect(() => {
        if (image) {
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
                    console.log(data)

                    fetch('/updatepic', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                        })

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [image])

    const updatePhoto = (file) => {
        setImage(file)
    }

    return (
        <div className="profileContainer">
            <div className="profileWrapper">
                <div>
                    <img src={state ? state.pic : "loading"} alt="" className="profilePic" />
                    <div style={{ margin: "20px 5px" }}>
                        <div className="file-field input-field">
                            <div className="btn #1e88e5 blue darken-1">
                                <span>Update Pic</span>
                                <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>{state ? state.name : "loading"}</h4>
                    <h5>{state ? state.email : "loading"}</h5>
                    <div className="profileContent">
                        <h6>{myPics.length} post</h6>
                        <h6>{state ? state.followers.length : "loading"} Follower</h6>
                        <h6>{state ? state.following.length : "loading"} Following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    myPics.map(item => (
                        <img key={item._id} src={item.photo} alt={item.title} className="item" />
                    ))
                }

            </div>
        </div>
    )
}

export default Profile
