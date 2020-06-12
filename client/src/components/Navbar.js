import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from "../App";
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            console.log(state)
            return [
                <li key="1"><Link to="/create">CreatePost</Link></li>,
                <li key="2"><Link to="/profile">Profile</Link></li>,
                <li key="6"><Link to="/myfollowingpost">MyFollowingPost</Link></li>,
                <li key="5">
                    <button className="btn #c62828 red darken-3"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push('/signin')
                        }}
                    >
                        Logout
            </button>
                </li>
            ]
        } else {
            console.log(state)
            return [
                <li key="3"><Link to="/signin">Signin</Link></li>,
                <li key="4"><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (

        <nav >
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav >
    )
}

export default Navbar
