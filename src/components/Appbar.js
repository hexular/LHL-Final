import React, { useState } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { TiHome, TiPlus, TiMessages, TiMap, TiFolder, TiArrowBack } from "react-icons/ti";
import { FaClipboardList } from "react-icons/fa";

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
              <MenuItem onClick={logout}> <TiArrowBack/> Logout</MenuItem> 
              <Link style={{textDecoration: 'none'}} to={"/jobber"}><MenuItem> <TiHome/> Home</MenuItem> </Link> 
               <Link style={{textDecoration: 'none'}} to={"/history"}><MenuItem> <TiMessages/> My Jobs</MenuItem></Link>
              <Link style={{textDecoration: 'none'}} to={"/jobs"}><MenuItem> <FaClipboardList/> Open Jobs</MenuItem> </Link> 
               <Link style={{textDecoration: 'none'}} to={"/map"}><MenuItem> <TiMap/> Job Map</MenuItem></Link>
            </div> 
            :
            <div>
              <MenuItem onClick={logout}> <TiArrowBack/> Logout</MenuItem> 
               <Link style={{textDecoration: 'none'}} to={"/user"}><MenuItem> <TiHome/> Home</MenuItem> </Link> 
               <Link style={{textDecoration: 'none'}} to={"/myjobs"}><MenuItem> <FaClipboardList/> My Jobs</MenuItem> </Link> 
               <Link style={{textDecoration: 'none'}} to={"/newjobpost"}><MenuItem> <TiPlus/> New Job</MenuItem></Link>  
               <Link style={{textDecoration: 'none'}} to={"/history"}><MenuItem> <TiFolder/> History</MenuItem></Link>  
              
             
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