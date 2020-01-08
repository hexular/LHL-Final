import React, { Component } from 'react';
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
import Appbar from './components/Appbar';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export class App extends Component {
  componentDidMount() {
    axios.get("/auth")
    .then((res) => {
      console.log(res.data)
    });
    this.ws = new WebSocket("ws://localhost:8080");
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({type: 'job', message: 'hello'}))
      
    }
    this.ws.onmessage = event => {
      const message = JSON.parse(event.data)
      console.log(message)
    }
  }

  render(){
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
        <Route path="/test" component={Appbar} />
        <Route path="/myjobs" component={MyJobs} />
      </BrowserRouter>   
    );
  }
}

export default App;
