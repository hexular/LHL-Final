import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { STRIPE_KEY } from '../var';

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
  
  render() {
    console.log(STRIPE_KEY)
    const { values } = this.props;
    const jobDetail = this.props;
    async function handleToken(token) {
      console.log({token});
      console.log(values);
      const response = await axios.post("/checkout", {
        token,
        values
      });
      const { status } = response.data;
      console.log("Response:", response.data);
      if (status === "success") {
        alert("Success");
        console.log(jobDetail);
        jobDetail.nextStep();
      } else {
        alert("Something went wrong");
      }
    }
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Confirm Job" />
          <List>
            <ListItem
              primaryText="Service Type"
              secondaryText={ values.serviceType }
            />
            <ListItem
              primaryText="Pay Rate"
              secondaryText={ `$${values.payRate} / hour` }
            />
            <ListItem
              primaryText="Required Time"
              secondaryText={ `${values.requiredTime} Hours` }
            />
            <ListItem
              primaryText="Address"
              secondaryText={ values.address + ' ' + values.postalCode.split(" ").join("") }
            />
            <br/>
            <ListItem
              primaryText="Total"
              secondaryText={ `$${values.requiredTime * values.payRate}` }
            />
          </List>
          <RaisedButton
            label="Checkout"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <StripeCheckout
            stripeKey={ STRIPE_KEY }
            token={handleToken}
            amount={ values.requiredTime * values.payRate * 100 }
            name={ values.serviceType }
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
