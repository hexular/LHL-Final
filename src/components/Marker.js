import React, { Component } from 'react';
import classnames from 'classnames';
import './Marker.css'
import { FaPeopleCarry, FaBroom, FaHammer, FaSnowplow, FaTractor, FaPaintBrush, FaDog, FaTools, FaRegSnowflake } from "react-icons/fa";
import { MdPerson } from 'react-icons/md';
import { DiTerminal } from 'react-icons/di';
import { GiRake, GiBalloonDog, GiSherlockHolmes, GiCatapult, GiHighGrass, GiHealthNormal } from 'react-icons/gi';


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
      case 'Moving':
        content = <FaPeopleCarry />
        break;
      case 'Cleaning':
        content = <FaBroom />
        break;
      case 'Snow Plow':
        content = <FaRegSnowflake />
        break;
      case 'Farm Work':
          content = <FaTractor />
          break;
      case 'Investigation':
          content = <GiSherlockHolmes />
          break;
      case 'Yard Work':
          content = <GiRake />
          break;
      case 'Clowning':
          content = <GiBalloonDog />
          break;
      case 'Siege':
          content = <GiCatapult />
          break;
      case 'Painting':
          content = <FaPaintBrush />
          break;
      case 'Pet Sitting':
          content = <FaDog />
          break;
      case 'Construction':
          content = <FaTools />
          break;
      case 'Lawn Mow':
          content = <GiHighGrass />
          break;
      case 'Health':
          content = <GiHealthNormal />
          break;
      case 'Code':
          content = <DiTerminal />
          break;
      case 'me':
        content = <MdPerson className={this.me} />
        overwrite = true;
        break;
      default:
        content = <FaHammer />
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