import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    axios.get('/auth')
      .then((response) => {
        console.log(response)
        if (response.data.result !== "user") {
          console.log(true)
          this.props.history.replace("/")
        } else {
          this.setState({
            loading: false
          })
        }
      });
  }

  render() {
    return this.state.loading ? null
      : (
        <MuiThemeProvider>
          <AppBar title="Job Info #Lit-Final" user={true} />
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
              label="History"
              onClick={() => this.props.history.push('/history')}
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