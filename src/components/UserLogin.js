import React, { useState, useEffect } from 'react'
import AppBar from './Appbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect } from 'react-router';


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserLogin(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {    
    axios.get('/auth')
    .then((response) => {
      if (response.data.result === "user") {
        props.history.replace("/user")
      } else if (response.data.result === "jobber") {
        props.history.replace("/jobs")
      } else {
        setLoading(false)
      }
    });
  }, [])

  const submit = () => {
    const loginInfo = {
      email: email.trim().toLowerCase(),
      password: password
    }
    axios.post('/auth/login', loginInfo)
      .then(function (response) {
        if (response.data.result) {
          setSubmitted(true)
        } else {
          alert("account does not exist or invalid email/pw");
        }
      })
      .catch(
        console.log("error")
      );
  }

  return loading ? null 
  : (
    submitted ? <Redirect to="/user" /> :
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar position="static" user={false}>
            <Toolbar variant="dense">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                User Login
            </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
            </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submit}
                >
                  Sign In
              </Button>
                <Grid container justify="space-between">
                  <Grid item>
                    <Link href="/usersignup" variant="body2">
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/" variant="body2">
                      Go back
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </React.Fragment>
      </MuiThemeProvider>
  );
}


