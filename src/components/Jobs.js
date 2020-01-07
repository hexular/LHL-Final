import React, { useState, useEffect } from 'react'
import Open from './Job/Open'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
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
      });
  }, [])

  console.log(response)

  const jobs = response


  const openJobs = jobs.map(job => {
    return (
      <Open
        job={job.name}
        user={job.user}
        distance={job.distance}
        service={job.service_type} />
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