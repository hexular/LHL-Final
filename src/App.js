import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import JobberLogin from './components/JobberLogin';
import JobberSignup from './components/JobberSignup';
import MyJobs from './components/MyJobs';
import User from './components/User';
import Jobs from './components/Jobs';
import Map from './components/Map';
import Display from './components/Display';
import JobHistory from './components/JobHistory';
import axios from 'axios';
import NewJobPost from './components/NewJobPost';
import { BrowserRouter, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = { change: true, connected: false, update: false, long: 0, lat: 0 };
  }

  showPosition = (pos) => {
    this.setState({ long: pos.coords.longitude, lat: pos.coords.latitude })
  }

  track = () => {
    navigator.geolocation.getCurrentPosition(this.showPosition)
  }

  connect = () => {
    this.ws = new WebSocket("ws://localhost:8080")
    this.setState({ connected: true })
  }

  componentDidMount() {

    axios.get("/auth")
      .then((res) => {
        console.log(res.data)
      });

    this.connect();
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({ type: 'newJob', message: 'hello' }))
    }
    this.ws.onmessage = event => {
      const message = JSON.parse(event.data)
      if (message.type === 'update') this.setState({ update: true });
      // console.log(message)
    }
  }

  finished = () => {
    this.setState({ change: false })
  }

  updateMyJobs = () => {
    this.ws.send(JSON.stringify({ type: 'update', message: 'new' }))
  }

  updateAllJobs = () => {
    this.ws.send(JSON.stringify({ type: 'update', message: 'all' }))
  }

  render() {
    return (
      <BrowserRouter history={history} >
        <Route path="/" component={Home} exact />
        <Route path="/map" component={() => <Map
          track={this.track()}
          long={this.state.long}
          lat={this.state.lat}
          updateAllJobs={this.updateAllJobs}
          update={this.state.update}
          history={history}
        />}
        />
        <Route path="/userlogin" component={UserLogin} />
        <Route path="/usersignup" component={UserSignup} />
        <Route path="/jobberlogin" component={JobberLogin} />
        <Route path="/jobbersignup" component={JobberSignup} />
        <Route path="/user" component={User} />
        <Route path="/jobs"
          component={() => <Jobs
            updateAllJobs={this.updateAllJobs}
            updateMyJobs={this.updateMyJobs}
            update={this.state.update}
            history={history}
          />}

          exact />
        <Route path="/jobs/:id" component={() => <Display
          updateAllJobs={this.updateAllJobs}
          updateMyJobs={this.updateMyJobs}
          update={this.state.update}
          history={history}
        />}
        />
        <Route path="/newjobpost" component={() => <NewJobPost
          updateMyJobs={this.updateMyJobs}
          updateAllJobs={this.updateAllJobs}
          finished={this.finished}
          connect={this.connect}
          change={this.state.change}
          connected={this.state.connected}
          update={this.state.update}
          history={history}
        />}
        />
        <Route path="/test" component={Appbar} />
        <Route path="/myjobs"
          component={() => <MyJobs
            connect={this.connect}
            change={this.state.change}
            connected={this.state.connected}
            finished={this.finished}
            updateAllJobs={this.updateAllJobs}
            updateMyJobs={this.updateMyJobs}
            update={this.state.update}
            history={history}
          />}
        />
        <Route path="/history"
          component={() => <JobHistory
            updateAllJobs={this.updateAllJobs}
            updateMyJobs={this.updateMyJobs}
            change={this.state.change}
            history={history}
          />}

          exact />
      </BrowserRouter>
    );
  }
}

export default App;
