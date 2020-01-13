import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
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
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const styles = {
  button: {
    margin: 15
  }
}

export default function UserJob(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} key={props.job.id}>
      <Grid item key={props.job.id}>
        <h2>{props.job.serviceType}</h2>

        <p>Description: {props.job.description}</p>
        <p>Estimate Time: {props.job.time_estimate} hours</p>
        <p>Location: {props.job.street_address}</p>
        <p>Status: {props.jobStatus(props.job)}</p>
        {
          props.jobStatus(props.job) === "Open" || props.jobStatus(props.job) === "In Progress" ?
            <RaisedButton
              label="Delete"
              onClick={() => {
                axios.put(`/myjobs`, [props.job.id], {withCredentials: true})
                // props.finished()
                props.updateMyJobs()
                props.updateAllJobs()
              }
              }
              primary={false}
            /> : null
        }
        {
          props.jobStatus(props.job) === "Marked Complete. Awaiting User Confirmation" ?
            <RaisedButton
              label="Mark Complete"
              onClick={() => {
                props.markComplete(props.job.id)
                props.updateMyJobs()
                props.updateAllJobs()
              }}
              primary={true}
              style={styles.button}
            /> : null
        }
      </Grid>
    </Paper>
  )
}