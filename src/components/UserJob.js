import React from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
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
    width: "80%",
    marginTop: 15,
    padding: theme.spacing(2),
    marginLeft: 50,
    marginRight: 50
  },
  button: {
    width: "100%",
    padding: "auto"
  },
  container: {
    width: "100%",
    wordWrap: "break-word"
  },
  serviceType: {
    textAlign: "center",
    marginTop: 0
  },
  progress: {
    width: "100%",
    padding: "auto",
    backgroundColor: '#28a745',
    color: 'white'
  }
}));

export default function UserJob(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} key={props.job.id}>
      <Grid item key={props.job.id}>
        <h2 className={classes.serviceType}>{props.job.service_type}</h2>
        <section className={classes.container}>
          <p>Description: {props.job.description}</p>
          <p>Estimate Time: {props.job.time_estimate} hours</p>
          <p>Location: {props.job.street_address}</p>
          <p>Status: {props.jobStatus(props.job)}</p>
          {
            props.jobStatus(props.job) === "Open" ?
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  axios.put(`/myjobs`, [props.job.id], { withCredentials: true })
                  props.updateMyJobs()
                  props.updateAllJobs()
                }
                }>
                DELETE
              </Button> : null
          }
          {
            props.jobStatus(props.job) === "Marked Complete. Awaiting User Confirmation" ?
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  props.markComplete(props.job.id)
                  props.updateMyJobs()
                  props.updateAllJobs()
                }}
                className={classes.button}
              >
                Mark Complete
              </Button> : null
          }
          {
            props.jobStatus(props.job) === "In Progress" ?
              <Button
                variant="contained"

                className={classes.progress}
              >
                In Progress
              </Button> : null
          }
        </section>
      </Grid>
    </Paper>
  )
}
