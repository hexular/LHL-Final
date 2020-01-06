import React from 'react';
import Button from "../Button"

export default function Open({ job, user, distance, tags }) {
  // TODO: Implement distance calculating here?

  return (
    <li>
      <h3>{job}</h3>
      <p>{user}</p>
      <p>{distance}</p>
      <ul>{tags}</ul>
      <Button name="Accept"></Button>
    </li>
  )
}