import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';
import axios from 'axios';
import Marker from './Marker';
import { Grid } from '@material-ui/core';



class SimpleMap extends Component {

  constructor(props) {
    super(props);
    this.state = { response: [], goBack: false, accepted: false, job: null, loading: true };
  }

  acceptJob = function (jobId) {
    axios.put(
      `/jobs/`,
      {
        params: {
          id: jobId,
          dropJob: false,
        }
      }, { withCredentials: true }
    )
      .then(
        (res) => {
          this.setState({ accepted: jobId });
          this.props.updateAllJobs();
        }
      )
      .catch(err => console.log("acceptJob error: ", err))
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  componentDidMount() {
    axios.get('/auth', { withCredentials: true })
      .then((response) => {
        if (response.data.result !== "jobber") {
          this.props.history.replace("/")
          this.props.history.go();
        } else {
          const loadJobs = () => {
            axios.get(`/jobs?lat=${this.props.lat}&lng=${this.props.long}`, { withCredentials: true })
              .then((res) => {
                this.setState({ response: res.data })
              });
          }
          loadJobs()
          this.setState({
            loading: false
          })
        }
      });
  }

  render = () => {

    if (this.state.loading) {
      return null
    }

    const openJobs = this.state.response.map(job => {
      return (
        <Marker
          text={job.service_type}
          pay={job.hourly_rate}
          time={job.time_estimate}
          desc={job.description}
          lat={job.lat}
          lng={job.long}
          onClick={() =>
            this.setState({ job: job.id }) &&
            this.props.history.push("/map")
          }
        >

        </Marker>
      )
    });

    if (this.state.job) return <Redirect to={{
      pathname: `/jobs/${this.state.job}`,
      map: true,
      lat: this.props.lat,
      long: this.props.long
    }} />
    else return this.state.goBack ?
      <Redirect to={'/jobber'} /> :
      (
        // Important! Always set the container height explicitly
        <MuiThemeProvider>
          <AppBar title="Map View" user={true} jobber={true} />
          <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.bootstrapURLKeys }}
              defaultCenter={{ lat: this.props.lat, lng: this.props.long }}
              defaultZoom={this.props.zoom}
            >
              {openJobs}

              <Marker
                text={'me'}
                lat={this.props.lat}
                lng={this.props.long}
              ></Marker>
            </GoogleMapReact>
          </div>
          <Grid
            container
            direction="row"
            justify="space-around"
          >
            <Button
              variant="contained"
              onClick={() => this.setState({ goBack: true })}
              color='primary'
              style={useStyles.button}
            >Home</Button>
          </Grid>
        </MuiThemeProvider>
      );
  }
}

export default SimpleMap;

const useStyles = {
  button: {
    margin: 15
  }
};
