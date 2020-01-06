import React from "react";
import Button from "./Button"

export default function Display(props) {

  return (
    <div>
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
      <Button name="Back"></Button>
    </div>
  );
}