import React, { Component } from 'react';
import classnames from 'classnames';
import './Marker.css'
import { FaPeopleCarry, FaBroom, FaHammer, FaSnowplow } from "react-icons/fa";


  const K_WIDTH = 25;
  const K_HEIGHT = 25;

class Marker extends Component {

  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  toggleHover() {
    this.setState({hover: !this.state.hover})
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

  render() {
    let linkStyle;
    let content;
   if (!this.state.hover) {
    linkStyle = this.regular
    switch(this.props.text) {
      case 'Lawn Mow':
        content = <FaPeopleCarry className={this.antiRotate}/>
        break;
      case 'Foot Rub':
        content = <FaBroom className={this.antiRotate}/>
        break;
      case 'Snow Plow':
        content = <FaHammer className={this.antiRotate}/>
        break;
      default:
        content = <FaSnowplow className={this.antiRotate}/>
        break;
    }
    
   } else {
     linkStyle = this.onHover
     content = 
     <div className={this.antiRotate}>
       {this.props.text}
       <br/>
       {this.props.time} hr{this.props.time > 1 ? 's' : ''}
       <br/>
       ${this.props.pay}/hr

     </div>
   }
	return(
    <div 
    className={this.marker}
      className={this.markerClass}
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