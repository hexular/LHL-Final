import React from "react";
import Button from "./Button"

export default function Login() {

  return (
    <div>
      <form>
        <input type="text" placeholder="email"></input>
        <input type="text" placeholder="password"></input>
      </form>
      <Button name="Login"></Button>
    </div>
  );
}