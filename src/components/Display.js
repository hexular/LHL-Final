import React, { useState } from "react";
import Button from "./Button"
import { Redirect } from 'react-router';

export default function Display(props) {
  const [goBack, setGoBack] = useState(false)

  return !goBack ? 
  (
    <React.Fragment>
      <Button name="message icon"></Button>
      <Button name="navbar icon"></Button>
      <h1>New Job</h1>
      <form>
        <p>{props.category}</p>
        <p>{props.time}</p>
        <p>{props.number}</p>
        <p>{props.payment}</p>
        <p>{props.location}</p>
      </form>
      <Button name="Delete"></Button>
      <Button name="Back" onClick={() => setGoBack(true)}></Button>
    </React.Fragment>
  ) :
  <Redirect to="/" />;
}