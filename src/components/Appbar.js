import React, { useState } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

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

  const myJobs = () => {
    return <Redirect to={'/myjobs'} />
  }
  

  return !homePage ? (
    <MuiThemeProvider>
      <React.Fragment>
        <AppBar 
          title={props.title || "Test"}
          onLeftIconButtonClick={() => openDrawer(!drawer)}
          style={{background: "#3f51b5", textAlign: "center", position: 'fixed', zIndex: 1000}}
        />
        <AppBar style={{zIndex: -1}}/>
        <Drawer
          containerStyle={styles.margin}
          open={drawer}
          width={200}
        >
          {props.user ? (
            props.jobber ? 
            <div>
              <MenuItem onClick={logout}>Logout</MenuItem> 
              <Link style={{textDecoration: 'none'}} to={"/user"}><MenuItem>Home</MenuItem> </Link> 
              <Link style={{textDecoration: 'none'}} to={"/jobs"}><MenuItem>All Jobs</MenuItem> </Link> 
               <Link style={{textDecoration: 'none'}} to={"/history"}><MenuItem>Active Jobs</MenuItem></Link>
            </div> 
            :
            <div>
              <MenuItem onClick={logout}>Logout</MenuItem> 
               <Link style={{textDecoration: 'none'}} to={"/user"}><MenuItem>Home</MenuItem> </Link> 
               <Link style={{textDecoration: 'none'}} to={"/myjobs"}><MenuItem>My Jobs</MenuItem> </Link> 
               <Link style={{textDecoration: 'none'}} to={"/newjobpost"}><MenuItem>New Job</MenuItem></Link>  
               <Link style={{textDecoration: 'none'}} to={"/history"}><MenuItem>History</MenuItem></Link>  
              
             
            </div>
          ) : 
            <MenuItem onClick={() => setHomePage(true)}>Home</MenuItem>}          
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