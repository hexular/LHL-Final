import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Marker from './Marker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class SimpleMap extends Component {

  constructor(props) {
    super(props);
    this.state = { response: [], goBack: false, accepted: false, loading: false, job: null };
  }

  acceptJob = function (jobId) {
    console.log(jobId)
    axios.put(
      `/jobs/`,
      {
        params: {
          id: jobId,
          dropJob: false,
        }
      }
    )
      .then(
        (res) => {
          console.log("HERE", jobId)
          this.setState({ accepted: jobId });
          this.props.updateAllJobs();
        }
      )
      .catch(err => console.log(err))
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  componentDidMount() {
    const loadJobs = () => {
      axios.get(`/jobs?lat=${this.props.lat}&lng=${this.props.long}`)
        .then((res) => {
          console.log('in component did mount res', res)
          this.setState({ response: res.data })
        });
    }
    loadJobs()
  }

  render = () => {



    console.log('RESPONSE HERE WOOOOHOOO', this.state.response)

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

    const styles = {
      button: {
        margin: 15
      }
    }

    console.log(this.props.long)
    console.log(this.props.lat)
    if (this.state.job) return <Redirect to={{
      pathname: `/jobs/${this.state.job}`,
      map: true,
      lat: this.props.lat,
      long: this.props.long
    }} />
    else return this.state.goBack ?
      <Redirect to={'/jobs'} /> :
      (
        // Important! Always set the container height explicitly
        <MuiThemeProvider>

          <AppBar title="Main Portal #Lit-Final" user={true} />
          <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyA0FZO0N4sb2MrGhmSgv8WD872-D9-lmnE' }}
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
          <Button
            variant="contained"
            onClick={() => this.setState({ goBack: true })}
            // color={'primary'}
            style={useStyles.button}
          >Back</Button>
        </MuiThemeProvider>
      );
  }
}

export default SimpleMap;

const useStyles = {
  button: {    
    margin: 20,
    width: 100    
  }
};