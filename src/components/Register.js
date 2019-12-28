import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class Register extends Component {
  render(){
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Register! #Lit-Final"/>
          <TextField
            hintText="Name"
            floatingLabelText="Enter Name"
          />   
          <br/>
          <TextField
            hintText="Email"
            floatingLabelText="Enter Email"
          />   
          <br/>
          <TextField
            hintText="Phone Number"
            floatingLabelText="Enter Phone Number"
          />   
          <br/>
          <TextField
            hintText="Password"
            floatingLabelText="Enter Password"
          />   
          <br/>
          <TextField
            hintText="Confirm Password"
            floatingLabelText="Enter Password Again"
          />   
          <br/>
          <RaisedButton
            label="Register"
            primary={true}
            style={styles.button}
            onClick={() => 
              {
                console.log("perfom post request to server for register");
                this.props.history.replace("/user");
              }
            }
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

export default Register