import React, { useState, useEffect } from 'react'
import Open from './Open'
import AppBar from './Appbar';
import Loading from './Loading';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Grid } from '@material-ui/core';

export default function Jobs(props) {
  const [response, setResponse] = useState([])
  const [accepted, setAccepted] = useState(false);
  const [back, setBack] = useState(false);

  const acceptJob = function (jobId) {
    axios.put(
      `/jobs/`,
      {
        params: {
          id: jobId,
          dropJob: false,
        }
      }, { withCredentials: true }
    )
      .then(
        (res) => {
          setAccepted(jobId);
          props.updateMyJobs();
          props.updateAllJobs();

        }
      )
      .catch(err => console.log("acceptJob Error: ", err))
  }

  useEffect(() => {
    console.log('inside useeffct jobs')
    const loadJobs = () => {axios.get(`/jobs?lat=${props.lat}&lng=${props.long}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setResponse(res.data)
        // if (props.change) {
        //   props.finished()
        // }
      })
      .catch(error => console.log(error))
      
    }
    loadJobs()
    // setResponse(response);

    axios.get('/auth', { withCredentials: true })

      .then((response) => {
        if (response.data.result !== "jobber") {
          props.history.replace("/")
          props.history.go()
        }
      });
  }, [props.update, props.change])

  const jobs = response

  const openJobs = jobs.map(job => {
    return (
      <Open
        key={job.id}
        jobId={job.id}
        serviceType={job.service_type}
        userName={job.name}
        streetAddress={job.street_address}
        hourlyRate={job.hourly_rate}
        timeEstimate={job.time_estimate}
        description={job.description}
        distance={job.distance}
        time={job.time}
        updateAllJobs={props.updateAllJobs}
        updateMyJobs={props.updateMyJobs}
        acceptJob={(id) => acceptJob(id)}
        lat={props.lat}
        long={props.long}
        post={job.post_code}
      />
    )

  })

  if (accepted) {
    return <Redirect to={`/jobs/${accepted}`} />
  } else if (back) {
    return <Redirect to={'/jobber'} />
  } else {
    return (
      <MuiThemeProvider>
        <AppBar title="Open Jobs" user={true} jobber={true} history={props.history} />

        {openJobs.length === 0 ? <Loading /> : openJobs}

        <Grid
          container
          direction="row"
          justify="space-around"
        >
          <Button
            onClick={() => setBack(true)}
            style={styles.button}
            variant="contained"
            color="primary"
          >
            Home
          </Button>

        </Grid>
      </MuiThemeProvider>
    )
  }

}

const styles = {
  button: {
    margin: 15
  }
}