import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class JobDetails extends Component {
  continue = e => {
    console.log(this);
    if (this.props.values.serviceType === "") {
      alert("Service Type Cannot Be Blank");
      return;
    }
    if (this.props.values.payRate === "") {
      alert("Pay Rate Cannot Be Blank");
      return;
    }
    if (this.props.values.description === "") {
      alert("Description Cannot Be Blank");
      return;
    }
    if (this.props.values.requiredTime === "") {
      alert("Required Time Cannot Be Blank");
      return;
    }
    if (this.props.values.address === "") {
      alert("Address Cannot Be Blank");
      return;
    }
    if (this.props.values.postalCode === "") {
      alert("Postal Code Cannot Be Blank");
      return;
    }
    if (!/[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/.test(this.props.values.postalCode.split(" ").join(""))) {
      alert("Invalid Postal Code");
      return;
    }
    e.preventDefault();
    this.props.nextStep();
  }

  render() {
    const { values, handleChange, browser } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Job Details" />
          <br />
          <TextField
            hintText="Enter Service Type"
            floatingLabelText="Service Type"
            onChange={handleChange('serviceType')}
            defaultValue={values.serviceType}
          />
          <br />
          <TextField
            hintText="Enter a Description"
            floatingLabelText="Description"
            onChange={handleChange('description')}
            defaultValue={values.description}
          />
          <br />
          <TextField
            type="number"
            min="0"
            hintText="Enter Pay Rate"
            floatingLabelText="Pay Rate (Per Hour)"
            onChange={handleChange('payRate')}
            defaultValue={values.payRate}
          />
          <br />
          <TextField
            type="number"
            min="0"
            hintText="Enter Required Time"
            floatingLabelText="Required Time (In Hours)"
            onChange={handleChange('requiredTime')}
            defaultValue={values.requiredTime}
          />
          <br />
          <TextField
            hintText="Enter Address"
            floatingLabelText="Address"
            onChange={handleChange('address')}
            defaultValue={values.address}
          />
          <br />
          <TextField
            hintText="Enter Postal Code"
            floatingLabelText="Postal Code (A1B 2D3)"
            onChange={handleChange('postalCode')}
            defaultValue={values.postalCode}
          />
          <br />
          <RaisedButton
            label="Post Job"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={() => browser.goBack()}
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

export default JobDetails
