import React, { Component } from 'react'
import Button from "./Button";

export class Home extends Component {
  render(){
    return (
      <div>
        <Button name="Log In" onClick={() => this.props.history.push("/login")}></Button>
        <Button name="Register" onClick={() => this.props.history.push("/register")}></Button>
      </div>
    );
  }  
}

export default Home