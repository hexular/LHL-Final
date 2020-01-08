import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

export class Home extends Component {
  render(){
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Main Portal #Lit-Final"/>
          <RaisedButton
            label="Customer Login"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/userlogin")}
          />
          <RaisedButton
            label="Jobber Login"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/jobberlogin")}
          />
          <br/><br/>
          <RaisedButton
            label="Customer Signup"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/usersignup")}
          />
          <RaisedButton
            label="Jobber Signup"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/jobbersignup")}
          />
          <br/><br/>
          <RaisedButton
            label="My Jobs"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/myjobs")}
          />
          <RaisedButton
            label="New Job"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/newjobpost")}
          />
          <br/><br/>
          <RaisedButton
            label="View Jobs"
            primary={true}
            style={styles.button}
            onClick={() => this.props.history.push("/jobs")}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }  
}

const styles = {
  button: {
    margin: 15,
    width: 200
  }
}

export default Home

