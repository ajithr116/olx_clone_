import React,{useState,useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


import Logo from '../../../public/olx-logo.svg';
import './Login.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {Firebase} = useContext(FirebaseContext);

  const navigate = useNavigate();
  const auth = getAuth(Firebase);

   // Check if user is already logged in
  //  onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     navigate('/home');  
  //   }
  // });

  const handleLogin = (e)=>{
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert('All fields are required.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log(userCredential);
      alert("Logged success fully ");
      navigate('/home');  
    })
    .catch((error)=>{
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('Invalid email or password.'); 
      }
      else{
        console.error('Error signing in:', error);
        alert('Not Exist ');
      }
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input" type="email" id="fname" name="email"/>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className="input" type="password" id="lname" name="password" />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
