import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

export class ConfirmJobDetails extends Component {
  continue = e => {
    e.preventDefault();
    //add process logic
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.props;
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
