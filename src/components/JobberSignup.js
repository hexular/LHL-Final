import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export class JobberSignup extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = input => e => {
    this.setState({[input]: e.target.value});
  }

  validate = () => {
    if (this.state.name.trim().length === 0 || this.state.email.trim().length === 0 || this.state.phone.trim().length === 0 || this.state.password.length === 0 || (this.state.password !== this.state.confirmPassword)) {
      return false;
    }

    return true;
  }

  submit = () => {
    if (this.validate()) {
      console.log(this.state);
      const newUserInfo = {
        jobber: true,
        name: this.state.name.trim(),
        password: this.state.password,
        email: this.state.email.trim().toLowerCase(),
        phone: this.state.phone.trim()
      }
      const parent = this;
      axios.post('/auth/signup', newUserInfo)
      .then(function(response) {
        if (response.data.result) {
          alert("Registration successful, please login");
          parent.props.history.push("/jobberlogin");
        } else {
          alert("something went wrong, try again");
        }
        console.log(response);
      });
    }
    else {
      alert("one or more field is invalid. try again");
    }
  }

  render(){
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Jobber Signup! #Lit-Final" user={false}/>
          <TextField
            hintText="Name"
            floatingLabelText="Enter Name"
            onChange={this.handleChange('name')}
          />   
          <br/>
          <TextField
            hintText="Email"
            floatingLabelText="Enter Email"
            onChange={this.handleChange('email')}
          />   
          <br/>
          <TextField
            hintText="Phone Number"
            floatingLabelText="Enter Phone Number"
            onChange={this.handleChange('phone')}
          />   
          <br/>
          <TextField
            type="password"
            hintText="Password"
            floatingLabelText="Enter Password"
            onChange={this.handleChange('password')}
          />   
          <br/>
          <TextField
            type="password"
            hintText="Confirm Password"
            floatingLabelText="Enter Password Again"
            onChange={this.handleChange('confirmPassword')}
          />   
          <br/>
          <RaisedButton
            label="Register"
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

export default JobberSignup