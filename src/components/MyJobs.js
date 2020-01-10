import React, { useState, useEffect } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import UserJob from './UserJob';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Redirect } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("thisss", props)
    axios.get("/myjobs")
      .then(res => {
        setResponse(res.data)
        if (props.change) {
          props.finished()
      }
    });

    axios.get('/auth', {withCredentials: true})
    .then((response) => {
      if (response.data.result !== "user") {
        props.history.replace("/")
        props.history.go()
      } else {
        setLoading(false)
      }
    });

  }, [props.change, props.update])

  const markComplete = function (id) {
    axios.put(
      `/jobs/`,
      {
        params: {
          id: id,
          confirmComplete: true
        }
      }
    )
      .catch(err => console.log("error", err));
  }

  const jobStatus = function (job) {
    if (job.jobber_id === null) {
      return "Open"
    } else if (job.jobber_id !== null && job.jobber_confirm === false && job.user_confirm === false) {
      return "In Progress"
    } else if (job.jobber_confirm === true && job.user_confirm === false) {
      return "Marked Complete. Awaiting User Confirmation"
    } else if (job.jobber_confirm === true && job.user_confirm === true) {
      return "Completed"
    }
  }

  const jobsFilter = function (jobs, status) {
    const filtered = jobs.filter(job => jobStatus(job) === status)

    return filtered.map(job => {
      return (
        <UserJob
          key={job.id}
          job={job}
          jobStatus={jobStatus}
          updateMyJobs={props.updateMyJobs}
          updateAllJobs={props.updateAllJobs}
          markComplete={markComplete}
        />
      )
    })
  }

  const openJobs = jobsFilter(response, "Open");
  const progressJobs = jobsFilter(response, "In Progress");
  const userConfirmJobs = jobsFilter(response, "Marked Complete. Awaiting User Confirmation");
  const completeJobs = jobsFilter(response, "Completed");

  return loading ? null : (newJob ?
    <Redirect to="/newjobpost" /> :
    !goBack ?
      (response.length !== 0 ? (
        <MuiThemeProvider>
          <AppBar title="My Jobs #Lit-Final" user={true} />
          <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
            alignItems="center"
            wrap="nowrap"
            spacing={2}
          >
            <Typography className={classes.heading}>
              Open Jobs
            </Typography>
            {openJobs.length ? openJobs : <Typography>None</Typography>}
            <Typography className={classes.heading}>
              Jobs In Progress
            </Typography>
            {progressJobs.length ? progressJobs : <Typography>None</Typography>}
            <Typography className={classes.heading}>
              Jobs Awaiting User Confirmation
            </Typography>
            {userConfirmJobs.length ? userConfirmJobs : <Typography>None</Typography>}
            <Typography className={classes.heading}>
              Completed Jobs
            </Typography>
            {completeJobs.length ? completeJobs : <Typography>None</Typography>}
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
  <Redirect to="/" />)
}

const styles = {
  button: {
    margin: 15
  }
}