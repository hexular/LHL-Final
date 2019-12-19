import React from "react";
import Button from "../Button"

export default function Info() {

  return (
    <div>
      <Button name="message icon"></Button>
      <Button name="navbar icon"></Button>
      <h1>New Job</h1>
      <form>
        <input type="text" placeholder="category"></input>
        <input type="text" placeholder="time"></input>
        <input type="text" placeholder="phone number"></input>
        <input type="text" placeholder="payment"></input>
        <input type="text" placeholder="location"></input>
        <input type="submit"></input>
      </form>
      <Button name="Cancel"></Button>
    </div>
  );
}