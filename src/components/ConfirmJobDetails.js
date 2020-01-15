import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import keys from '../var.js';

export class ConfirmJobDetails extends Component {
  continue = e => {
    e.preventDefault();
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
      const response = await axios.post("/checkout", {
        token,
        values
      }, { withCredentials: true });
      const { status } = response.data;
      if (status === "success") {

        axios.post('/myjobs', values, { withCredentials: true })


        alert("Success");
        jobDetail.nextStep();

      } else {
        alert("Something went wrong");
      }
    }
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Confirm Job" user={true} client={true} />
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
