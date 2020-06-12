import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from "../App";
import M from "materialize-css";
const Navbar = () => {
    const searchModal = useRef(null)
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])
    const renderList = () => {
        if (state) {
            // console.log(state)
            return [
                <li key="7"> <i data-target="modal1" className="large material-icons modal-trigger" style={{ color: "black", cursor: "pointor" }}>search</i></li>,
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
            // console.log(state)
            return [
                <li key="3"><Link to="/signin">Signin</Link></li>,
                <li key="4"><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/search-users', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setUserDetails(result.user)
            })
    }
    return (

        <nav >
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>

            <div id="modal1" className="modal" ref={searchModal} style={{ color: "black" }}>
                <div className="modal-content">
                    <input type="text"
                        placeholder="Search Users"
                        value={search}
                        onChange={(e) => fetchUsers(e.target.value)} />

                    <ul className="collection">
                        {
                            userDetails.map(item =>
                                (
                                    <Link to={item._id !== state._id ? "/profile/" + item._id : '/profile'} onClick={() => {
                                        M.Modal.getInstance(searchModal.current).close()
                                        setSearch('')
                                    }} ><li key={item._id} className="collection-item">{item.email}</li></Link>
                                ))}

                    </ul>
                </div>
                {/* <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div> */}
            </div>
        </nav >
    )
}

export default Navbar
