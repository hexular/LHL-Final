import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class Login extends Component {
  render(){
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Login! #Lit-Final"/>
          <TextField
            hintText="Email"
            floatingLabelText="Enter Email"
          />   
          <br/>
          <TextField
            hintText="Password"
            floatingLabelText="Enter Password"
          />   
          <br/>
          <RaisedButton
            label="Log In"
            primary={true}
            style={styles.button}
            onClick={() => 
              {
                console.log("perfom get request to server for login");
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

export default Login

