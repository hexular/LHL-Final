import React, { useState, useEffect } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Redirect } from 'react-router';

export default function MyJobs(props) {
  const [response, setResponse] = useState([])
  const [goBack, setGoBack] = useState(false)
  const [newJob, setNewJob] = useState(false)


  useEffect(() => {
    axios.get("/myjobs")
    .then((res) => {
      console.log(res.data)
      setResponse(res.data)
    });
  }, [])

  const jobs = response.map(job => {
    return (
      <article>
        <h2>{job.name}</h2>
        <p>Description: {job.description}</p>
        <p>Estimate Time: {job.time_estimate} hours</p>
        <p>Location: {job.street_address}</p>
      </article>)
  })
  
  return newJob ? 
  <Redirect to="/newjobpost" /> :
  !goBack ? 
  (response.length !== 0 ? (
    <MuiThemeProvider>
      <AppBar title="My Jobs #Lit-Final"/>
      <React.Fragment>
        {jobs}
      </React.Fragment>
      <RaisedButton 
        label="Back" 
        onClick={() => setGoBack(true)}
        primary={true}
        style={styles.button}
      />
      <RaisedButton 
        label="New Job" 
        onClick={() => setNewJob(true)}
        primary={true}
        style={styles.button}
      />
    </MuiThemeProvider>
  ) : 
    <MuiThemeProvider>
      <AppBar title="My Jobs #Lit-Final"/>
      <React.Fragment>
        <p>no jobs</p>
      </React.Fragment>
      <RaisedButton 
        label="Back" 
        onClick={() => setGoBack(true)}
        primary={true}
        style={styles.button}
      />
  </MuiThemeProvider>) :
  <Redirect to="/" />;
}

const styles = {
  button: {
    margin: 15
  }
}