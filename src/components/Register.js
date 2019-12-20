import React from "react";
import Button from "./Button"

export default function Register() {

  return (
    <div>
      <form>
        <input type="text" placeholder="Name"></input>
        <input type="text" placeholder="email"></input>
        <input type="text" placeholder="phone number"></input>
        <input type="text" placeholder="password"></input>
        <input type="text" placeholder="confirm password"></input>
      </form>
      <Button name="Submit"></Button>
    </div>
  );
}