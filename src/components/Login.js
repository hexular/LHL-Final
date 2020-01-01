import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = input => e => {
    this.setState({[input]: e.target.value});
  }

  submit = () => {
    console.log(this);
    const parent = this;
    const loginInfo = {
      email: this.state.email.trim().toLowerCase(),
      password: this.state.password
    }
    axios.post('/auth/login', loginInfo)
    .then(function (response) {
      response.data.result ? parent.props.history.replace("/user") : alert("account does not exist or invalid email/pw");
      console.log(response);
    });
  }

  render(){
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Login! #Lit-Final"/>
          <TextField
            hintText="Email"
            floatingLabelText="Enter Email"
            onChange={this.handleChange('email')}
          />   
          <br/>
          <TextField
            type="password"
            hintText="Password"
            floatingLabelText="Enter Password"
            onChange={this.handleChange('password')}
          />
          <br/>
          <RaisedButton
            label="Log In"
            primary={true}
            style={styles.button}
            onClick={this.submit}
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={() => this.props.history.goBack()}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }  
}

const styles = {
  button: {
    margin: 15
  }
}

export default Login

