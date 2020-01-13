import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import keys from '../var.js';
// import stripe_key from '../var.js';


// const getCoords = async (postcode, value) => {
//   const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${keys.GMAPS_KEY}`)
//   const jsonRes = await res.data.results[0]
//   // console.log('getcoords', jsonRes.geometry.location)

//   jsonRes.length === 0 ? 
//   value.coords = {"lat": 43.6440936, "lng": -79.39494759999999} 
//   : value.coords = jsonRes.geometry.location;
// }

export class ConfirmJobDetails extends Component {
  continue = e => {
    e.preventDefault();
    //add process logic
    console.log(this)
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  componentDidMount() {
    
  }

  render() {
    
    const { values } = this.props;
    const jobDetail = this.props;
    async function handleToken(token) {
      console.log({ token });
      console.log(values);
      const response = await axios.post("/checkout", {
        token,
        values
      });
      const { status } = response.data;
      console.log("Response:", response.data);
      if (status === "success") {
        // getCoords(values.postalCode.split(" ").join(""), values)
        // .then(() => {
          axios.post('/myjobs', values)
        // })
        
        alert("Success");
        console.log(jobDetail);
        console.log("Response:", response.data);
        jobDetail.nextStep();
        
      } else {
        alert("Something went wrong");
      }
    }
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Confirm Job" user={true}/>
          <List>
            <ListItem
              primaryText="Service Type"
              secondaryText={values.serviceType}
            />
            <ListItem
              primaryText="Description"
              secondaryText={values.description}
            />
            <ListItem
              primaryText="Pay Rate"
              secondaryText={`$${values.payRate} / hour`}
            />
            <ListItem
              primaryText="Required Time"
              secondaryText={`${values.requiredTime} Hours`}
            />
            <ListItem
              primaryText="Address"
              secondaryText={values.address + ' ' + values.postalCode.split(" ").join("")}
            />
            <br />
            <ListItem
              primaryText="Total"
              secondaryText={`$${values.requiredTime * values.payRate}`}
            />
          </List>
          <RaisedButton
            label="Checkout"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <StripeCheckout
            stripeKey={keys.STRIPE_KEY}
            token={handleToken}
            amount={values.requiredTime * values.payRate * 100}
            name={values.serviceType}
            billingAddress
            shippingAddress
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}

export default ConfirmJobDetails
