import React, { useState, useEffect } from 'react'
import Open from './Job/Open'
import AppBar from './Appbar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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

  useEffect(() => {
    axios.get("/jobs")
      .then((res) => {
        setResponse(res.data)
        console.log(res.data)
      });
  }, [])

  const jobs = response

  const openJobs = jobs.map(job => {
    return (
      <Open
        key={job.id}
        jobId={job.id}
        serviceType={job.service_type}
        userId={job.user_id}
        streetAddress={job.street_address}
        hourlyRate={job.hourly_rate}
        timeEstimate={job.time_estimate}
        description={job.description} />
    )
  })

  return (
    <React.Fragment>
      <AppBar title="Open Jobs" user={true} />
      {openJobs}
    </React.Fragment>
  )
}