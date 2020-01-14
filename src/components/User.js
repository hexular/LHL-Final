import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axios from 'axios';


export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    axios.get('/auth', { withCredentials: true })
      .then((response) => {
        console.log(response)
        if (response.data.result !== "user") {
          console.log(true)
          this.props.history.replace("/")
        } else {
          this.setState({
            loading: false
          })
        }
      });
  }

  render() {
    return this.state.loading ? null
      : (
        <MuiThemeProvider>
          <AppBar title="Job Info #Lit-Final" user={true} />
          <React.Fragment>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
              style={styles.grid}
            >
              {/* <Typography
                variant='h4'
                align="center"
              >
                placeholder text
              </Typography> */}

              <ButtonBase
                focusRipple
                type="button"
                onClick={() => this.props.history.push("/newjobpost")}
              >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <AddToHomeScreenIcon style={styles.icon} />
                  <Typography
                    variant='h4'
                    align="center"
                  >
                    New Job Posting
                  </Typography>
                </Grid>

              </ButtonBase>

              <ButtonBase
                focusRipple
                type="button"
                onClick={() => this.props.history.push('/myjobs')}
              >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <AssignmentIcon style={styles.icon} />
                  <Typography
                    variant='h4'
                    align="center"
                  >
                    View Active Jobs
                  </Typography>
                </Grid>

              </ButtonBase>


              {/* <Button
                type="button"
                variant="contained"
                color="primary"
                style={styles.button}
                onClick={() => this.props.history.push("/newjobpost")}
              >
                NEW JOB
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                style={styles.button}
                onClick={() => this.props.history.push('/myjobs')}
              >
                ACTIVE JOBS
              </Button> */}
              {/* <Button
                type="button"
                variant="contained"
                color="primary"
                style={styles.button}
                onClick={() => console.log("Clicked messages")}
              >
                MESSAGES
              </Button> */}
            </Grid>
          </React.Fragment>
        </MuiThemeProvider>
      );
  }
}

const styles = {
  button: {
    margin: 15
  },
  icon: {
    fontSize: 120,
    color: "#3f51b5",
    padding: ".2em"
  },
  grid: {
    marginTop: "1em",
    height: "70vh"
  }
}

export default User