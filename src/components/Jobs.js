import React, { useState, useEffect } from 'react'
import Open from './Open'
import AppBar from './Appbar';
import Loading from './Loading';
import { makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Redirect } from 'react-router';
import { getGeoCoordinates } from '../helpers/getLocation'

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

export default function Jobs(props) {
  const classes = useStyles();
  const [response, setResponse] = useState([])
  const [goHistory, setGoHistory] = useState(false)
  const [accepted, setAccepted] = useState(false);
  const [map, setMap] = useState(false);
  const [loading, setLoading] = useState(true)

  const fetchJobWithCoords = async function () {
    try {
      const { latitude: lat, longitude: lng } = await getGeoCoordinates({ latitude: 23.644272, longitude: -59.402242 });
      axios.get(`/jobs?lat=${lat}&lng=${lng}`)
        .then((res) => {
          setResponse(res.data)
          if (props.change) {
            props.finished()
          }
        });
    } catch (err) {
      console.log("Failed to retrieve location data. Distance mapping unavailable. Error: ", err)
    }
  }

  const acceptJob = function (jobId) {
    console.log(jobId)
    axios.put(
      `/jobs/`,
      {
        params: {
          id: jobId,
          dropJob: false,
        }
      }
    )
      .then(
        (res) => {
          setAccepted(jobId);
          props.updateMyJobs();
          props.updateAllJobs();

        }
      )
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchJobWithCoords();


    // axios.get(`/jobs?lat=${lat}&long=${lng}`)
    //   .then((res) => {
    //     setResponse(res.data)
    //     if (props.change) {
    //       props.finished()
    //     }
    //   });

    axios.get('/auth')
      .then((response) => {
        if (response.data.result !== "jobber") {
          props.history.replace("/")
          props.history.go()
        } else {
          setLoading(false)
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
        acceptJob={(id) => acceptJob(id)} />
    )
  })

  if (loading) {
    return null
  } else if (goHistory) {
    return <Redirect to="/history" />
  } else if (accepted) {
    console.log("TRYING TO REDIRECT TO ", accepted)
    return <Redirect to={`/jobs/${accepted}`} />
  } else if (map) {
    return <Redirect to={'/map'} />
  } else {
    return (
      <MuiThemeProvider>
        <AppBar title="Open Jobs" user={true} />
        {openJobs.length === 0 ? <Loading /> : openJobs}
        <RaisedButton
          label="History"
          onClick={() => setGoHistory(true)}
          primary={true}
          style={styles.button}
        />
        <RaisedButton
          label="Map View"
          onClick={() => setMap(true)}
          primary={true}
          style={styles.button}
        />
      </MuiThemeProvider>
    )
  }

}

const styles = {
  button: {
    margin: 15
  }
}