import React, { useState, useEffect } from "react";
import Button from "./Button";
import AppBar from './Appbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { makeStyles } from '@material-ui/core/styles';
import RaisedButton from 'material-ui/RaisedButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Display(props) {
  const classes = useStyles();
  const [goBack, setGoBack] = useState(false)
  const [response, setResponse] = useState([]);
  const { id } = useParams();

  const dropJob = function () {
    axios.put(
      `/jobs/`,
      {
        params: {
          id: id,
          dropJob: true
        }
      }
    )
      .then(() => {
        setGoBack(true)
      })
      .catch(err => console.log("error", err));
  }

  const markComplete = function () {
    axios.put(
      `/jobs/`,
      {
        params: {
          id: id,
          markComplete: true
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

  useEffect(() => {
    axios.get(`/jobs?id=${id}`)
      .then((res) => {
        setResponse(res.data[0])
        console.log(res)
      })
      .catch(err => console.log("error", err));
  }, [])

  return !goBack ?
    (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Job Info #Lit-Final" user={true} />
          <Button name="message icon"></Button>
          <Button name="navbar icon"></Button>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{response.service_type}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                <Typography>Description: {response.description}</Typography>
                <Typography>Requested By: User #{response.user_id}</Typography>
                <Typography>Address: {response.street_address}</Typography>
                <Typography>Payout: ${response.hourly_rate * response.time_estimate}</Typography>
                <Typography>Status: {jobStatus(response)}</Typography>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <RaisedButton
            label="Cancel"
            onClick={() => dropJob()}
            primary={true}
            style={styles.button}
          />
          <RaisedButton
            label="Back"
            onClick={() => setGoBack(true)}
            primary={true}
            style={styles.button}
          />
          <RaisedButton
            label="Mark Complete"
            onClick={() => markComplete()}
            primary={true}
            style={styles.button}
          />
        </React.Fragment>
      </MuiThemeProvider>
    )
    : <Redirect to="/jobs" />;
}

const styles = {
  button: {
    margin: 15
  }
}