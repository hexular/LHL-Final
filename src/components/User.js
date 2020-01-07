import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

export class User extends Component {
  render(){
    return (
      <MuiThemeProvider>
      <AppBar title="Job Info #Lit-Final"/>
      <React.Fragment>
        <p>profile goes here</p>
        <RaisedButton 
          label="New Job" 
          onClick={() => this.props.history.push("/newjobpost")}
          primary={true}
          style={styles.button}
        />
        <RaisedButton 
          label="Active Jobs"
          onClick={() => this.props.history.push('/myjobs')}
          primary={false}
          style={styles.button}
        />
        <RaisedButton 
          label="Messages"
          primary={false}
          style={styles.button}
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

export default User