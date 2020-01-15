import React, { useState, useEffect } from 'react'
import Open from './Open'
import AppBar from './Appbar';
import Loading from './Loading';
import { makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect } from 'react-router';
<<<<<<< HEAD
//import { getGeoCoordinates } from '../helpers/getLocation'
=======
import { Grid } from '@material-ui/core';
>>>>>>> master

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
<<<<<<< HEAD
  const [loading, setLoading] = useState(true)

  const getGeoCoordinates = (defaultCoords) => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return resolve(defaultCoords);
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
        (error) => resolve(defaultCoords),
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 30000
        }
      );
    });
  };

  const fetchJobWithCoords = () => {
    const defaultCoords = { latitude: 43.644272, longitude: -79.402242 };
    if (!navigator.geolocation) return defaultCoords;
    else {
      navigator.geolocation.getCurrentPosition((result) => {
        const lat = result.coords.latitude;
        const lon = result.coords.longitude;
        axios.get(`/jobs?lat=${lat}&lng=${lon}`, {withCredentials: true})
        .then((res) => {
          setResponse(res.data)
          if (props.change) {
            props.finished()
          }
        })
      })
    }
  }
=======
  const [back, setBack] = useState(false);
>>>>>>> master

  // const fetchJobWithCoords = async function () {
  //   try {
  //     const { latitude: lat, longitude: lng } = await getGeoCoordinates({ latitude: 43.644272, longitude: -79.402242 });
      
  //     console.log("From Jobs.js - fetchJobWithCoords: ", lat, lng)
  //     if (lat) {
  //       console.log("CALLED")
  //       axios.get(`/jobs?lat=${lat}&lng=${lng}`, {withCredentials: true})
  //       .then((res) => {
  //         setResponse(res.data)
  //         if (props.change) {
  //           props.finished()
  //         }
  //       });
  //     }
  //   } catch (err) {
  //     console.log("Failed to retrieve location data. Distance mapping unavailable. Error: ", err)
  //   }
  // }

  

  const acceptJob = function (jobId) {
    console.log(jobId)
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
      .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log("~~~~~~~~~ACCEPTED: ", accepted)
    axios.get(`/jobs?lat=${props.lat}&lng=${props.long}`, { withCredentials: true })
      .then((res) => {
        setResponse(res.data)
        if (props.change) {
          props.finished()
          
        }
      });

<<<<<<< HEAD
    axios.get('/auth', {withCredentials: true})
=======
    axios.get('/auth', { withCredentials: true })

>>>>>>> master
      .then((response) => {
        if (response.data.result !== "jobber") {
          props.history.replace("/")
          props.history.go()
<<<<<<< HEAD
        } else {
          setLoading(false)
          fetchJobWithCoords();
=======
>>>>>>> master
        }
      });
  }, [props.update, props.change])

  const jobs = response

  const openJobs = jobs.map(job => {
    console.log('from map', job)

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

  if (goHistory) {
    return <Redirect to="/history" />
  } else if (accepted) {
    console.log("TRYING TO REDIRECT TO ", accepted)
    return <Redirect to={`/jobs/${accepted}`} />
  } else if (map) {
    return <Redirect to={'/map'} />
  } else if (back) {
    return <Redirect to={'/jobber'} />
  } else {
    return (
      <MuiThemeProvider>
        <AppBar title="Open Jobs" user={true} jobber={true} history={props.history}/>

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
            color="secondary"
          >
            Home
          </Button>
          {/* <Button
            onClick={() => setGoHistory(true)}
            style={styles.button}
            variant="contained"
            color="secondary"
          >
            History
          </Button>
          <Button
            onClick={() => setMap(true)}
            style={styles.button}
            variant="contained"
            color="secondary"
          >
            Map View
          </Button> */}
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