import React, { useState } from "react";
import Button from "./Button";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router';

export default function Display(props) {
  const [goBack, setGoBack] = useState(false)

  return !goBack ? 
  (
    <MuiThemeProvider>
      <AppBar title="Job Info #Lit-Final"/>
      <React.Fragment>
        <Button name="message icon"></Button>
        <Button name="navbar icon"></Button>
        <h1>New Job</h1>
        <form>
          <p>{props.category}</p>
          <p>{props.time}</p>
          <p>{props.number}</p>
          <p>{props.payment}</p>
          <p>{props.location}</p>
        </form>
        <RaisedButton 
          label="Delete"
          primary={true}
          style={styles.button}
        />
        <RaisedButton 
          label="Back" 
          onClick={() => setGoBack(true)}
          primary={true}
          style={styles.button}
        />
      </React.Fragment>
    </MuiThemeProvider>
  ) 
  : <Redirect to="/" />;
}

const styles = {
  button: {
    margin: 15
  }
}