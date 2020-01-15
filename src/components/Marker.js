import React, { Component } from 'react';
import classnames from 'classnames';
import './Marker.css'
import { FaPeopleCarry, FaBroom, FaHammer, FaTractor, FaPaintBrush, FaDog, FaTools, FaRegSnowflake } from "react-icons/fa";
import { MdPerson } from 'react-icons/md';
import { DiTerminal } from 'react-icons/di';
import { GiRake, GiBalloonDog, GiSherlockHolmes, GiCatapult, GiHighGrass, GiHealthNormal } from 'react-icons/gi';

class Marker extends Component {

  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

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

    switch (this.props.text) {
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