import React from 'react';
import './App.css';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import JobberLogin from './components/JobberLogin';
import JobberSignup from './components/JobberSignup';
import MyJobs from './components/MyJobs';
import User from './components/User';
import Info from './components/Job/Info';
import Jobs from './components/Jobs';
import axios from 'axios';
import NewJobPost from './components/NewJobPost';
import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

function App() {
  axios.get("/auth")
  .then((res) => {
    console.log(res.data)
  });
  return (   
    <BrowserRouter history = { history }>
      <Route path="/" component={Home} exact />
      <Route path="/userlogin" component={UserLogin} />
      <Route path="/usersignup" component={UserSignup} />
      <Route path="/jobberlogin" component={JobberLogin} />
      <Route path="/jobbersignup" component={JobberSignup} />
      <Route path="/user" component={User} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/info" component={Info} />
      <Route path="/newjobpost" component={NewJobPost} />
      <Route path="/myjobs" component={MyJobs} />
    </BrowserRouter>   
  );
}

export default App;
