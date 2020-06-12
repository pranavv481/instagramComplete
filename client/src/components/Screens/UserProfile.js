import React, { useEffect, useState, useContext, Fragment } from 'react';
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const [userProfile, setProfile] = useState(null)

    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userid) : true)
    console.log(state)

    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                setProfile(result)
            });
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
                setShowFollow(false)
            })
    }
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item !== data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })
                setShowFollow(true)
            })
    }

    return (
        <Fragment>
            {userProfile ?
                <div className="profileContainer">
                    <div className="profileWrapper">
                        <div>
                            <img src={userProfile.user.pic} alt="" className="profilePic" />
                        </div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>
                            <div className="profileContent">
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length} Follower</h6>
                                <h6>{userProfile.user.following.length} Following</h6>

                            </div>
                            {showFollow ?
                                <button style={{ margin: "10px" }} className="btn waves-effect waves-light #1e88e5 blue darken-1" onClick={() => followUser()}>
                                    Follow
                                </button>
                                : <button style={{ margin: "10px" }} className="btn waves-effect waves-light #1e88e5 blue darken-1" onClick={() => unfollowUser()}>
                                    UnFollow
                                </button>
                            }


                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.map(item => (
                                <img key={item._id} src={item.photo} alt={item.title} className="item" />
                            ))
                        }

                    </div>
                </div>
                : <h2>!Loading</h2>}

        </Fragment>
    )
}

export default UserProfile
