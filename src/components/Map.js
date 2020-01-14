import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router';
import axios from 'axios';
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
          this.setState({accepted: jobId});
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
          this.setState({response: res.data})
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
            this.setState({job: job.id}) &&
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
      map: true
    }}/>
    else return this.state.goBack ? 
      <Redirect to={'/jobs'} /> : 
    (
      // Important! Always set the container height explicitly
      <MuiThemeProvider>
      
        <AppBar title="Main Portal #Lit-Final" user={true}/>
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          // add key here for deployment
          defaultCenter={{lat: this.props.lat, lng: this.props.long}}
          defaultZoom={this.props.zoom}
        >
          {openJobs}
        </GoogleMapReact>
      </div>
      <RaisedButton
            label="Back"
            onClick={() => this.setState({goBack: true})}
            primary={true}
            style={styles.button}
          />
      </MuiThemeProvider>
    );
  }
}
 
export default SimpleMap;