import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard.js';
import { Store } from './components/Store.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

const App = () => {
  /*const [users, updateUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
    .then(response => {
      console.log(response)
      console.log(response.json())
    })
    .then(data => updateUsers(data))
  });*/
  
  const [route, changeRoute] = useState('login');

  const displayRoute = (route, changeRoute) => {
    switch(route) {
      case 'login':
        return <Login changeRoute={changeRoute}/>;
      case 'register':
        return <Register changeRoute={changeRoute}/>;
      case 'dashboard':
        return(
          <Store>
            <Dashboard />
          </Store>
        ); 
      default:
        throw new Error();
    }
  }

  return (
    <div className="App">
      {
        displayRoute(route, changeRoute)
      }
    </div>
  );
}

export default App;
