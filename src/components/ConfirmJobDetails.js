import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import { List, ListItem } from 'material-ui/List';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import keys from '../var.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 2000
})

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
        toast.success("SUCCESS! New Job Added")
        jobDetail.nextStep();
      } else {
        toast.error("Something went wrong");
      }
    }
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Confirm Job" user={true} client={true}/>
          <Container justify="center">            
            <Grid
              container
              direction="column"
              alignContent="center"
              style={{marginTop: 50}}
              >
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
              <section style={styles.buttonsContainer}>
                <StripeCheckout
                  stripeKey={"pk_test_QEftqbWZl6SLY8KvZULv7CXc005D5SWunq"}
                  token={handleToken}
                  amount={values.requiredTime * values.payRate * 100}
                  name={values.serviceType}
                  billingAddress
                  shippingAddress
                  style={styles.button, {fontSize: 10}}
                />
                <Button
                  type="button"
                  variant="contained"
                  style={styles.button}
                  onClick={this.back}
                >
                  Back
                </Button>
              </section>              
            </Grid>
          </Container>          
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const styles = {
  button: {
    width: 120,
    marginRight: 10,
    marginLeft: 10
  },
  buttonsContainer: {
    marginTop: 50,
    display: "flex",
    justifyContent: "space-around"
  }
}

export default ConfirmJobDetails
