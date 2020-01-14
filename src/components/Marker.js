import React, { Component } from 'react';
import classnames from 'classnames';
import './Marker.css'
import { FaPeopleCarry, FaBroom, FaHammer, FaSnowplow } from "react-icons/fa";
import { MdPerson } from 'react-icons/md';


  const K_WIDTH = 25;
  const K_HEIGHT = 25;

class Marker extends Component {

  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  // regular = {
  //   // initially any map object has left top corner at lat lng coordinates
  //   // it's on you to set object origin to 0,0 coordinates
  //   position: 'absolute',
  //   width: K_WIDTH,
  //   height: K_HEIGHT,
  //   left: -K_WIDTH / 2,
  //   top: -K_HEIGHT / 2,
  
  //   border: '5px solid #f44336',
  //   borderRadius: K_HEIGHT,
  //   backgroundColor: 'white',
  //   textAlign: 'center',
  //   color: 'black',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   padding: 4
  // };

  // onHover = {
  //   ...this.regular,
  //   border: '5px solid #3f51b5',
  //   color: 'blue',
  //   fontSize: 12,
  //   width: K_WIDTH * 2,
  //   height: K_HEIGHT * 2,
  // };

  markerClass = classnames('marker', {
    "marker-style": this.props.text
  })
  antiRotate = classnames('antiRotate', {
    "icon-style": this.props.text
  })
  rotate = classnames('rotate', {
    "icon-style": this.props.text
  })
  me = classnames('me', {
    "me-style": this.props.text
  })

  render() {
    let overwrite;
    let content;
   
    // linkStyle = this.regular
    switch(this.props.text) {
      case 'Lawn Mow':
        content = <FaPeopleCarry />
        break;
      case 'Foot Rub':
        content = <FaBroom />
        break;
      case 'Snow Plow':
        content = <FaHammer />
        break;
      case 'me':
        content = <MdPerson className={this.me} />
        overwrite = true;
        break;
      default:
        content = <FaSnowplow />
        break;
    }
    
  return overwrite ? 
  (<div
    onClick={this.props.onClick}
  >
    {content}
  </div>
  ) 
  :
  (
    <div 
      className={this.markerClass}
      onClick={this.props.onClick}
    >
      {content}
    </div>
	)
  }

}

export default Marker;