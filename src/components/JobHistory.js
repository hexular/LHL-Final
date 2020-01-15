import React, { useState, useEffect } from 'react'
import Completed from './Completed'
import AppBar from './Appbar';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import { Redirect } from 'react-router';
import Grid from '@material-ui/core/Grid';

const styles = {
  button: {
    margin: 15
  },
  title: {
    display: "flex",
    justifyContent: "center"
  }
}

const JobHistory = (props) => {
  const [response, setResponse] = useState([])
  const [goBack, setGoBack] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isJobber, setIsJobber] = useState(true);

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

    axios.get('/auth', { withCredentials: true })
      .then((response) => {
        if (response.data.result !== "jobber") {
          setIsJobber(false)
        };
        if (response.data.result === "none") {
          props.history.replace('/')
          props.history.go()
        } else {
          axios.get("/history", { withCredentials: true })
            .then((res) => {
              setResponse(res.data)
            });
          setLoading(false)
        }
      });

  }, [])

  const completedJobs = response.map(job => {
    return (
      <Completed
        key={job.id}
        jobId={job.id}
        serviceType={job.service_type}
        userName={job.name}
        streetAddress={job.street_address}
        hourlyRate={job.hourly_rate}
        timeEstimate={job.time_estimate}
        status={jobStatus(job)}
        description={job.description}
        history={props.history}
      />
    )
  })

  return loading ? null : (!goBack ?
    <MuiThemeProvider>
      <AppBar title="My Jobs" user={true} jobber={isJobber} client={!isJobber} />

      {completedJobs}
      <br />
      <Grid
        container
        direction="row"
        justify="space-around"
      >
        <Button
          onClick={() => setGoBack(true)}
          style={styles.button}
          variant="contained"
          color="primary"
        >
          Home
      </Button>
      </Grid>
    </MuiThemeProvider> : <Redirect to="/" />
  );
}

export default JobHistory;