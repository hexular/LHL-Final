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
    this.state = {change: true, connected: false, update: false};
  }

  connect = () => {
    this.ws = new WebSocket("ws://localhost:8080")
    this.setState({connected: true})
  }

  componentDidMount() {

    axios.get("/auth")
    .then((res) => {
      console.log(res.data)
    });

    this.connect();
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({type: 'newJob', message: 'hello'}))
    }
    this.ws.onmessage = event => {
      const message = JSON.parse(event.data)
      if (message.type === 'update') this.setState({update: true});
      console.log(message)
    }
  }

  

  finished = () => {
    this.setState({change: false})
  }

  updateMyJobs = () => {
    this.ws.send(JSON.stringify({type: 'update', message: 'new'}))
  }

  updateAllJobs = () => {
    this.ws.send(JSON.stringify({type: 'update', message: 'all'}))
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
        <Route path="/jobs" 
          component={() => <Jobs 
            updateAllJobs={this.updateAllJobs}
            update={this.state.update}
            history={history}
          />} 
          exact />
        <Route path="/jobs/:id" component={Display} />
        <Route path="/info" component={Info} />
        <Route path="/newjobpost" component={() => <NewJobPost history={history} updateMyJobs={this.updateMyJobs}/>} />
        <Route path="/test" component={Appbar} />
        <Route path="/myjobs" 
          component={() => <MyJobs 
            connect={this.connect}
            change={this.state.change} 
            connected={this.state.connected}
            finished={this.finished} 
            updateMyJobs={this.updateMyJobs}
            update={this.state.update}
            history={history}
          />} 
        />
      </BrowserRouter>   
    );
  }
}

export default App;
