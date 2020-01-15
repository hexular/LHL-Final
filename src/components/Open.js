import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { FaPeopleCarry, FaBroom, FaHammer, FaTractor, FaPaintBrush, FaDog, FaTools, FaRegSnowflake } from "react-icons/fa";
import { DiTerminal } from 'react-icons/di';
import { GiRake, GiBalloonDog, GiSherlockHolmes, GiCatapult, GiHighGrass, GiHealthNormal } from 'react-icons/gi';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  submit: {
    backgroundColor: '#28a745',
    color: 'white'
  }
}));



export default function Open({ jobId, serviceType, userName, streetAddress, hourlyRate, timeEstimate, description, acceptJob, distance, time, updateMyJobs, updateAllJobs }) {

  const classes = useStyles()
  let content;
  switch (serviceType) {
    case 'Moving':
      content = <FaPeopleCarry />
      break;
    case 'Cleaning':
      content = <FaBroom />
      break;
    case 'Snow Plow':
      content = <FaRegSnowflake />
      break;
    case 'Farm Work':
      content = <FaTractor />
      break;
    case 'Investigation':
      content = <GiSherlockHolmes />
      break;
    case 'Yard Work':
      content = <GiRake />
      break;
    case 'Clowning':
      content = <GiBalloonDog />
      break;
    case 'Siege':
      content = <GiCatapult />
      break;
    case 'Painting':
      content = <FaPaintBrush />
      break;
    case 'Pet Sitting':
      content = <FaDog />
      break;
    case 'Construction':
      content = <FaTools />
      break;
    case 'Lawn Mow':
      content = <GiHighGrass />
      break;
    case 'Health':
      content = <GiHealthNormal />
      break;
    case 'Code':
      content = <DiTerminal />
      break;
    default:
      content = <FaHammer />
      break;
  }

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
          <Grid item xs={6}>
            <Typography className={classes.heading}>
              <b>{content}  {serviceType}</b>
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
          <Typography>Requested By: {userName}</Typography>
          <br />
          <Typography>Description: {description}</Typography>
          <Typography>Address: {streetAddress}</Typography>
          <Typography>Time Estimate: {timeEstimate} hr{timeEstimate > 1 ? 's' : ''}</Typography>
          <Typography>Payout: ${hourlyRate * timeEstimate}</Typography>
          <br />
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

