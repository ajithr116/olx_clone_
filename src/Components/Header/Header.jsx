import { useState, useContext } from 'react';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

function Header() {
  
  const [language, setLanguage] = useState('ENGLISH');
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const{firebase} = useContext(FirebaseContext);
  const languages = ['ENGLISH', 'SPANISH', 'FRENCH']; // Add more languages as needed
  const navigate = useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {/* <Arrow></Arrow> */}
        </div>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        <div className="loginPage">
          {user ? (
            <>
              <span>{user.displayName}</span>
              <button className='signout' onClick={() => {
                if (window.confirm('Are you sure you want to sign out?')) {
                  const auth = getAuth();
                  signOut(auth).then(() => {
                    navigate('/home');
                  }).catch((error) => {
                    console.log("error while signout: " + error);
                  });
                }
              }}>Logout</button>
            </>
          ) : (
            <a href="/login">Login</a>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
}

export default Header;
