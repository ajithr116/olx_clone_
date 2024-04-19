import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, {useEffect, useContext} from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Create from './pages/Create.jsx';
import Signup from './pages/Signup.jsx';
import Viewpost from './pages/ViewPost.jsx';
import {AuthContext, FirebaseContext} from './store/Context.jsx'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {

  const {setUser} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const auth = getAuth();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  })
  
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App;
