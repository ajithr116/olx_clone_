import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../public/olx-logo.svg';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";


export default function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');

  const {Firebase} = useContext(FirebaseContext);
  const db = getFirestore(Firebase);
  const navigate = useNavigate();

  const loginButton = ()=>{
    navigate('/login')
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!username || !email || !phoneNo || !password){
      alert("All fields are required");
      return;
    }

    if(username.length<3){
      alert("username must be at least 3 charateres long");
      return ;
    }

    if (phoneNo.length !== 10) {
      alert('Phone number must be 10 digits long.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    const auth = getAuth(Firebase);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Set the user's display name
        return updateProfile(userCredential.user, {
          displayName: username
        });
      })
      .then(() => {
        // User's display name is set, now add user data to Firestore
        return addDoc(collection(db, "users"), {
          id: auth.currentUser.uid,
          username: username,
          phone: phoneNo,
          email: email,
        });
      })
      .then(() => {
        console.log('User data added to Firestore');
        navigate('/login');  // Redirect to login page
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
        alert("Server not reachable ");
      });
    }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input  className="input" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} id="fname"  name="name" />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input  className="input" type="email" id="fname" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input className="input" type="number" id="lname" name="phone" value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input className="input" type="password" id="lname" name="password" value={password}onChange={(e)=>setPassword(e.target.value)}/>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={loginButton}>Login</a>
      </div>
    </div>
  );
}

