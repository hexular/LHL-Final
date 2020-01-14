import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));



export default function Completed({ serviceType, userName, streetAddress, hourlyRate, timeEstimate, description, status }) {

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
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel >
  )
}

