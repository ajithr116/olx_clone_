import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {FirebaseContext} from './store/Context.jsx'; 
import {Firebase} from './Firebase/config.js'
import Context from './store/Context.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>      
    <FirebaseContext.Provider value={{Firebase}}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
)
