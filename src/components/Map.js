import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import { geolocated } from "react-geolocated";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  

  render = () => {
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
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.long}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;