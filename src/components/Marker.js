import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router';
import axios from 'axios';

  const K_WIDTH = 30;
  const K_HEIGHT = 30;

class Marker extends Component {

  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  toggleHover() {
    this.setState({hover: !this.state.hover})
  }

  regular = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
  
    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 4
  };

  onHover = {
    ...this.regular,
    border: '5px solid #3f51b5',
    color: 'blue',
    width: K_WIDTH * 2,
    height: K_HEIGHT * 2,
  };

  render() {
    let linkStyle;
    let content;
   if (!this.state.hover) {
     linkStyle = this.regular
     content = this.props.text
   } else {
     linkStyle = this.onHover
     content = 
     <div>
       {this.props.text}
       <br/>
       {this.props.time} hr{this.props.time > 1 ? 's' : ''}
       <br/>
       ${this.props.pay}/hr

     </div>
   }
	return(
    <div 
      style={linkStyle} 
      onMouseEnter={() => this.toggleHover()} 
      onMouseLeave={() => this.toggleHover()}
      onClick={this.props.onClick}
    >
      {content}
      
    </div>
	)
  }

}

export default Marker;