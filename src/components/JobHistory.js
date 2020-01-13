import React, { useState, useEffect } from 'react'
import Completed from './Completed'
import AppBar from './Appbar';
import RaisedButton from 'material-ui/RaisedButton';
import { makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import { Redirect } from 'react-router';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const styles = {
  button: {
    margin: 15
  }
}

const JobHistory = () => {
  const classes = useStyles();
  const [response, setResponse] = useState([])
  const [goBack, setGoBack] = useState(false)

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

  useEffect(() => {
    axios.get("/history")
      .then((res) => {
        setResponse(res.data)
        console.log("JOB", res.data)
      });
  }, [])

  const completedJobs = response.map(job => {
    return (
      <Completed
        key={job.id}
        obId={job.id}
        serviceType={job.service_type}
        userName={job.name}
        streetAddress={job.street_address}
        hourlyRate={job.hourly_rate}
        timeEstimate={job.time_estimate}
        status={jobStatus(job)}
        description={job.description}
      />
    )
  })

  return (!goBack ?
    <MuiThemeProvider>
      <AppBar title="Job Info #Lit-Final" user={true} />
      <h1>History</h1>
      {completedJobs}
      <RaisedButton
        label="Back"
        onClick={() => setGoBack(true)}
        primary={true}
        style={styles.button}
      />
    </MuiThemeProvider> : <Redirect to="/jobs" />
  );
}

export default JobHistory;