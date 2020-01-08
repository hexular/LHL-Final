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
import Display from './components/Display';
import axios from 'axios';
import NewJobPost from './components/NewJobPost';
import { BrowserRouter, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {change: true};
  }

  componentDidMount() {

    axios.get("/auth")
    .then((res) => {
      console.log(res.data)
    });

    this.ws = new WebSocket("ws://localhost:8080");
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({type: 'newJob', message: 'hello'}))
    }
    this.ws.onmessage = event => {
      const message = JSON.parse(event.data)
      if (message.type === 'newJob') this.setState({change: true});
      console.log(message)
    }

  }

  finished = () => {
    this.setState({change: false})
  }

  render(){
    return (   
      <BrowserRouter history = { history } >
        <Route path="/" component={Home} exact />
        <Route path="/userlogin" component={UserLogin} />
        <Route path="/usersignup" component={UserSignup} />
        <Route path="/jobberlogin" component={JobberLogin} />
        <Route path="/jobbersignup" component={JobberSignup} />
        <Route path="/user" component={User} />
        <Route path="/jobs" component={Jobs} exact />
        <Route path="/jobs/:id" component={Display} />
        <Route path="/info" component={Info} />
        <Route path="/newjobpost" component={NewJobPost} />
        <Route path="/test" component={Appbar} />
        <Route path="/myjobs" component={() => <MyJobs update={this.state.change} finished={this.finished} />} />
      </BrowserRouter>   
    );
  }
}

export default App;
