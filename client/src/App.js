import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/Screens/Home';
import Signin from './components/Screens/Signin';
import Signup from './components/Screens/Signup';
import Profile from './components/Screens/Profile';
import Create from './components/Screens/Create';
import { reducer, initialState } from "./reducers/UserReducers";
import UserProfile from "./components/Screens/UserProfile";
import SubscribedUserPost from './components/Screens/SubscribedUserPost';


export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      //history.push("/")
    } else {
      history.push("/signin")
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/create" component={Create} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route path="/myfollowingpost" component={SubscribedUserPost} />
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routing />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
