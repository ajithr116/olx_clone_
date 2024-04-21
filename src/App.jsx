import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, {useEffect, useContext} from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Create from './pages/Create.jsx';
import Signup from './pages/Signup.jsx';
import Viewpost from './pages/ViewPost.jsx';
import {AuthContext, FirebaseContext} from './store/Context.jsx'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from './store/postContext.jsx';

function App() {

  const {setUser} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);

  const auth = getAuth(firebase);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
    return () => unsubscribe();
  }, [auth, setUser])
  
  return (
    <Post>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/viewpost" element={<Viewpost/>} />
        </Routes>
      </Router>
    </Post>
  )
}

export default App;
