import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';

export class Home extends Component {
  render(){
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="WELCOME! #Lit-Final">
            <Button color="inherit" onClick={() => this.props.history.push("/login")}>Login</Button>
            <Button color="inherit" onClick={() => this.props.history.push("/register")}>Register</Button>
          </AppBar>
          What do you like better? on nav bar or separated btn?
          <br/>
          If we are going mobile view then off nav bar is cleaner
          <br/>
          <RaisedButton
            label="Log In"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/login")}
          />
          <RaisedButton
            label="Register"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/register")}
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

export default Home

