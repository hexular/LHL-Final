import React from 'react';
import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import User from './components/User'
import Info from './components/Job/Info'
import axios from 'axios'
import NewJobPost from './components/NewJobPost'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  axios.get("/users")
  .then((val) => {
    console.log(val.data)
  });
  return (   
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/user" component={User} />
      <Route path="/info" component={Info} />
      <Route path="/newjobpost" component={NewJobPost} />
    </BrowserRouter>   
  );
}

export default App;
