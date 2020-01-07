import React from 'react';
import RaisedButton from "material-ui/RaisedButton"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Open({ job, user, distance, tags }) {
  // TODO: Implement distance calculating here?

  return (
    <MuiThemeProvider>
      <li display="flex" flexDirection="row">
        <h3>{job}</h3>
        <p>{user}</p>
        <p>{distance}</p>
        <ul>{tags}</ul>
        <RaisedButton
          label="Accept"
          primary={true}
        />
      </li>
    </MuiThemeProvider>
  )
}

