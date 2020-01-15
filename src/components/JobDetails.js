import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import TextField from 'material-ui/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 2000
})

export class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { skills: [], loading: true }
  }

  componentDidMount() {
    axios.get('/auth', { withCredentials: true })
      .then((response) => {
        if (response.data.result !== "user") {
          this.props.browser.replace('/')
          this.props.browser.go();
        } else {
          axios.get("/skills", { withCredentials: true })
            .then((response) => {
              this.setState({ skills: response.data })
              this.setState({
                loading: false
              })
            })
            .catch(e => console.log("Error getting skills: ", e))
        }
      });

  }

  continue = e => {
    if (this.props.values.serviceType === "") {
      toast.warning("Service Type Cannot Be Blank");
      return;
    }
    if (this.props.values.payRate === "") {
      toast.warning("Pay Rate Cannot Be Blank");
      return;
    }
    if (this.props.values.description === "") {
      toast.warning("Description Cannot Be Blank");
      return;
    }
    if (this.props.values.requiredTime === "") {
      toast.warning("Required Time Cannot Be Blank");
      return;
    }
    if (this.props.values.address === "") {
      toast.warning("Address Cannot Be Blank");
      return;
    }
    if (this.props.values.postalCode === "") {
      toast.warning("Postal Code Cannot Be Blank");
      return;
    }
    if (!/[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/.test(this.props.values.postalCode.split(" ").join(""))) {
      toast.warning("Invalid Postal Code");
      return;
    }
    e.preventDefault();
    this.props.nextStep();
  }

  generateSkillList = () => {
    const skills = [];

    this.state.skills.map((skill, i) =>
      skills.push(<MenuItem key={i} value={`${skill.name}`}>{skill.name}</MenuItem>)
    );

    return skills;
  }

  render() {
    const { values, handleChange, browser } = this.props;

    return this.state.loading ? null : (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Post New Job" user={true} client={true} />
          <br />
          <Container justify="center">
            <Grid
              container
              direction="column"
              alignContent="center"
              style={{ marginTop: 50 }}
            >
              <InputLabel>Service Type</InputLabel>
              <Select
                defaultValue={values.serviceType}
                onChange={handleChange('serviceType')}
                style={{ width: 256 }}
              >
                {this.generateSkillList()}
              </Select>

              <TextField
                hintText="Enter a Description"
                floatingLabelText="Description"
                onChange={handleChange('description')}
                defaultValue={values.description}
              />

              <TextField
                type="number"
                min="0"
                hintText="Enter Pay Rate"
                floatingLabelText="Pay Rate (Per Hour)"
                onChange={handleChange('payRate')}
                defaultValue={values.payRate}
              />

              <TextField
                type="number"
                min="0"
                hintText="Enter Required Time"
                floatingLabelText="Required Time (In Hours)"
                onChange={handleChange('requiredTime')}
                defaultValue={values.requiredTime}
              />

              <TextField
                hintText="Enter Address"
                floatingLabelText="Address"
                onChange={handleChange('address')}
                defaultValue={values.address}
              />

              <TextField
                hintText="Enter Postal Code"
                floatingLabelText="Postal Code (A1B 2D3)"
                onChange={handleChange('postalCode')}
                defaultValue={values.postalCode}
              />
              <section style={styles.buttonsContainer}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  style={styles.button}
                  onClick={this.continue}
                >
                  Post Job
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  style={styles.button}
                  onClick={() => browser.goBack()}
                >
                  Cancel
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
    marginTop: 50
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-around"
  }
}

export default JobDetails
