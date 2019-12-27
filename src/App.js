import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import User from './components/User'
import Info from './components/Job/Info'
import axios from 'axios'
import NewJobPost from './components/NewJobPost'

function App() {
  axios.get("/users")
  .then((val) => {
    console.log(val.data)
  });
  return (
    <div className="App">
      <Home></Home>      
      <Login></Login>
      <Register></Register>
      <User></User>
      <Info></Info>
      <NewJobPost></NewJobPost>
    </div>
  );
}

export default App;
