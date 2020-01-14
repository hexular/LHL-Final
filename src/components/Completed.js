import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router';
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



export default function Completed({ jobId, serviceType, userName, streetAddress, hourlyRate, timeEstimate, description, status, history }) {
  const [viewDetails, setViewDetails] = useState(false);
  const [isJobber, setIsJobber] = useState(true);

  const classes = useStyles()
  console.log("completed jobid", jobId)

  useEffect(() => {
    axios.get('/auth', { withCredentials: true })
      .then((response) => {
        if (response.data.result !== "jobber") {
          setIsJobber(false)
        };
      });
  }, []);

  return (viewDetails ?
    <Redirect to={`/jobs/${jobId}`} /> :
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <Typography className={classes.heading}>
              {serviceType}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.heading}>
              Status: {status}
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary >
      <ExpansionPanelDetails>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Typography>Description: {description}</Typography>
          <Typography>Requested By: {userName}</Typography>
          <Typography>Address: {streetAddress}</Typography>
          <Typography>Payout: ${hourlyRate * timeEstimate}</Typography>
          {isJobber ?
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                setViewDetails(true)
              }
              }>
              View Job Details
          </Button>
            : null
          }
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel >
  )
}