import React from 'react';
import Open from './Job/Open'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'

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

  const jobs = [
    {
      name: "Job 1",
      user: "User 1",
      distance: "1.5km",
      tags: ["Construction", "Cleaning"]
    },
    {
      name: "Job 2",
      user: "User 2",
      distance: "2.5km",
      tags: ["Cleaning"]
    },
    {
      name: "Job 3",
      user: "User 3",
      distance: "5.5km",
      tags: ["Landscaping", "Computer Science", "Legal Advice"]
    },

  ]
  const tagsList = (job) => job.tags.map(tag => {
    return (
      <li>{tag}</li>
    )
  })

  const openJobs = jobs.map(job => {
    return (
      <Open
        job={job.name}
        user={job.user}
        distance={job.distance}
        tags={tagsList(job)} />
    )
  })

  return (
    <MuiThemeProvider>
      <React.Fragment>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Open Jobs
            </Typography>
          </Toolbar>
        </AppBar>
        {openJobs}
      </React.Fragment>
    </MuiThemeProvider>
  )
}