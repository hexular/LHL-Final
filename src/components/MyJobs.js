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
import Button from '@material-ui/core/Button';

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
  jobContainer: {
    margin: 20
  },
  noJobMessage: {
    fontSize: "2rem",
    marginTop: 200,
    marginBottom: 200,
    fontWeight: "bold"
  },
  button: {
    margin: 20,
    width: 100
  }
}));

export default function MyJobs(props) {
  const [response, setResponse] = useState([])
  const [goBack, setGoBack] = useState(false)
  const [newJob, setNewJob] = useState(false)
  const classes = useStyles();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("thisss", props)
    axios.get("/myjobs", { withCredentials: true })
      .then(res => {
        setResponse(res.data)
        if (props.change) {
          props.finished()
        }
      });

    axios.get('/auth', { withCredentials: true })
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
      }, { withCredentials: true }
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
  // const completeJobs = jobsFilter(response, "Completed");

  return loading ? null : (newJob ?
    <Redirect to="/newjobpost" /> :
    !goBack ?
      (response.length !== 0 ? (
        <MuiThemeProvider>
          <AppBar title="Active Job Board" user={true} />
          <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
            alignItems="center"
            wrap="nowrap"
            spacing={2}
          >

            {openJobs.length ? openJobs : null}
            {progressJobs.length ? progressJobs : null}
            {userConfirmJobs.length ? userConfirmJobs : null}

            {(openJobs.length || progressJobs.length || userConfirmJobs.length) ? null :
              <Typography className={classes.noJobMessage}>No Active Job(s)</Typography>}
            <Grid container direction="row" justify="center" alignItems="center">
              <Button
                onClick={() => setGoBack(true)}
                className={classes.button}
                variant="contained"
              >BACK</Button>

              <Button
                onClick={() => setNewJob(true)}
                className={classes.button}
                variant="contained"
                color="primary"
              >NEW JOB</Button>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      ) :
        null) : <Redirect to="/" />)
}

const styles = {
  button: {
    margin: 15
  }
}