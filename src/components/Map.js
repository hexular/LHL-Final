import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

// const geocoder = new google.maps.Geocoder();
// import Open from './Job/Open'
// import { geolocated } from "react-geolocated";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// var lat = '';
// var lng = '';
// var address = 'L4E3T6';
// geocoder.geocode( { 'address': address}, function(results, status) {
//   if (status == google.maps.GeocoderStatus.OK) {
//      lat = results[0].geometry.location.lat();
//      lng = results[0].geometry.location.lng();
//   } else {
//     alert("Geocode was not successful for the following reason: " + status);
//   }
// });
// alert('Latitude: ' + lat + ' Logitude: ' + lng);

class SimpleMap extends Component {
  
  // response = []

  constructor(props) {
    super(props);
    this.state = { response: [], goBack: false, accepted: false, loading: false };
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
      axios.get("/jobs")
        .then((res) => {
          console.log(res)
          this.setState({response: res.data})
        });
    }
    loadJobs()
  }

  render = () => {

    console.log(this.state.response)

     const openJobs = this.state.response.map(job => {
      return (
        <div
          lat={44.123}
          lng={-80.112}
          text={job.service_type}
        > 
          {job.service_type}
        </div>
      )
    });
  
    console.log(this.props.long)
    console.log(this.props.lat)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '80%' }}>
        <GoogleMapReact
          // add key here for deployment
          defaultCenter={{lat: this.props.lat, lng: this.props.long}}
          defaultZoom={this.props.zoom}
        >
          {openJobs}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;