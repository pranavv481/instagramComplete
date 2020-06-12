import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../../App";
import M from "materialize-css";
import { Link } from "react-router-dom";
const Home = () => {
    const { state, dispatch } = useContext(UserContext)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data.posts)
                setData(data.posts)

            })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(response => response.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(response => response.json())
            .then(result => {
                // console.log(result)a
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const makeComment = (text, postId) => {
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const deletepost = (postid) => {
        fetch(`/deletePost/${postid}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
                M.toast({ html: "successfully Deleted Post", classes: "#2e7d32 green darken-3" })
            });
    }
    return (
        <div className="home">
            {
                data.map(item =>
                    (
                        <div className="card home-card" key={item._id}>
                            <h5><Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>{item.postedBy.name}</Link>
                                {item.postedBy._id === state._id &&
                                    <i className="material-icons" onClick={() => { deletepost(item._id) }} style={{ float: "right", cursor: "pointer" }}>delete</i>}</h5>
                            <div className="card-image">
                                <img src={item.photo} alt="" />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {item.likes.includes(state._id)
                                    ? <i className="material-icons" onClick={() => { unlikePost(item._id) }} style={{ cursor: "pointer" }}>thumb_down</i>
                                    : <i className="material-icons" style={{ cursor: "pointer" }} onClick={() => { likePost(item._id) }}>thumb_up</i>
                                }


                                <h6>{item.likes.length}</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record => (
                                        <h6 key={record._id}>
                                            <span style={{ fontWeight: "bold" }}>
                                                {record.postedBy.name}: </span>
                                            <span>{record.text}</span>
                                        </h6>
                                    ))
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="Add A Comment" />
                                </form>
                            </div>
                        </div>
                    )
                )
            }




        </div>
    )
}

export default Home
