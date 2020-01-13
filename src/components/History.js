import React, { useState, useEffect } from 'react'
import Open from './Open'
import AppBar from './Appbar';
import Loading from './Loading';
import { makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Redirect } from 'react-router';
import { getGeoCoordinates } from '../helpers/getLocation'

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

const History = () => {
  const classes = useStyles();
  const [response, setResponse] = useState([])
  const [goBack, setGoBack] = useState(false)
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/history")
  })

  return (
    <h1>History</h1>
  );
}

export default History;