import React, { useState, useEffect } from 'react'
import AppBar from './Appbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function UserSignup(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {    
    axios.get('/auth', {withCredentials: true})
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

  const validate = () => {
    if (name.trim().length === 0 || email.trim().length === 0 || phone.trim().length === 0 || password.length === 0 || (password !== confirmPassword)) {
      return false;
    }
    return true;
  }

  const submit = () => {
    if (validate()) {
      console.log('validated')
      const newUserInfo = {
        name: name.trim(),
        password: password,
        email: email.trim().toLowerCase(),
        phone: phone.trim()
      }

      axios.post('/auth/signup', newUserInfo, {withCredentials: true})
        .then(function (response) {
          console.log(response)
          if (response.data.result) {
            alert("Registration successful, please login");
            setSubmitted(true)
          } else {
            alert("something went wrong, try again");
          }
        });
    }
    else {
      alert("one or more field is invalid. try again");
    }
  }

  return loading ? null 
  : (
    submitted ? <Redirect to="/userlogin" /> :
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar position="static" user={false} title="Enter Details">
            <Toolbar variant="dense">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                User Signup
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
                User Sign up
            </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      type="phone"
                      id="phone"
                      autoComplete="current-phone"
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submit}
                >
                  Sign Up
              </Button>
                <Grid container justify="space-between">
                  <Grid item>
                    <Link href="/userlogin" variant="body2">
                      Already have an account? Sign in
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