import React, { useState, useEffect } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Redirect } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function MyJobs(props) {
  const [response, setResponse] = useState([])
  const [goBack, setGoBack] = useState(false)
  const [newJob, setNewJob] = useState(false)
  const classes = useStyles();
  
  useEffect(() => {
    
    console.log(props.update)
    axios.get("/myjobs")
    .then((res) => {
      setResponse(res.data)
    });
    if (props.update) {
        props.finished()
    }
  }, [props.update])
  
  const jobs = response.map(job => {
    console.log(job)
    return (
      <Paper className={classes.paper} key={job.id}>
        <Grid item key={job.id}>
          <h2>{job.service_type}</h2>

          <p>Description: {job.description}</p>
          <p>Estimate Time: {job.time_estimate} hours</p>
          <p>Location: {job.street_address}</p>
          <RaisedButton
            label="Delete"
            onClick={() => {
              axios.put(`/myjobs`, [job.id])
              props.finished()
              }
            }
            primary={false}
          />
        </Grid>
      </Paper>
      )
  })

  console.log(response.length)
  return newJob ? 
  <Redirect to="/newjobpost" /> :
  !goBack ? 
  (response.length !== 0 ? (
    <MuiThemeProvider>
      <AppBar title="My Jobs #Lit-Final" user={true}/>
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="center"
          alignItems="center"
          wrap="nowrap"
          spacing={2}
        >
          {jobs}
          <Grid container direction="row" justify="center" alignItems="center">
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
          </Grid>
        </Grid> 
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