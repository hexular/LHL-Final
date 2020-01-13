import React, { useState } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { Redirect } from 'react-router';

export default function Appbar(props) {
  const [drawer, openDrawer] = useState(false);
  const [homePage, setHomePage] = useState(false);

  const logout = () => {
    axios.post('/auth/logout', null, {withCredentials: true})
      .then((response) => {
        alert(response.data.message);
        setHomePage(true);
      })
  }  

  return !homePage ? (
    <MuiThemeProvider>
      <React.Fragment>
        <AppBar 
          title={props.title || "Test"}
          onLeftIconButtonClick={() => openDrawer(!drawer)}
        />
        <Drawer
          containerStyle={styles.margin}
          open={drawer}
          width={200}
        >
          {props.user ? <MenuItem onClick={logout}>Logout</MenuItem> : <MenuItem onClick={() => setHomePage(true)}>Home</MenuItem>}          
        </Drawer>
      </React.Fragment>
    </MuiThemeProvider>    
  ) : <Redirect to="/" />

}

const styles = {
  margin: {
     top: 64 
  }
}