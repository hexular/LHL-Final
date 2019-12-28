import React, { Component } from 'react'
import Button from "./Button"

export class User extends Component {
  render(){
    return (
      <div>
        <Button name="messages icon"></Button>
        <Button name="navBar"></Button>
        <p>profile goes here</p>
        <Button name="New Job" onClick={() => this.props.history.push("/newjobpost")}></Button>
        <Button name="History"></Button>
        <Button name="Messages"></Button>
      </div>
    );
  }  
}

export default User