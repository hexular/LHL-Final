import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
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



export default function Open({ jobId, serviceType, userName, streetAddress, hourlyRate, timeEstimate, description, acceptJob, distance, time, updateMyJobs, updateAllJobs }) {

  const classes = useStyles()

  return (
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
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              acceptJob(jobId)
            }
            }
          >
            Accept
          </Button>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel >
  )
}

