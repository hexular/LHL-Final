import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Appbar';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HistoryIcon from '@material-ui/icons/History';
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
        if (response.data.result !== "user") {
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
          <AppBar title="Home" user={true} client={true} history={this.props.history} />
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
                <Paper
                  elevation={3}
                  style={styles.paper}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={styles.subGrid}
                  >
                    <AddToHomeScreenIcon style={styles.icon} />
                    <Typography
                      variant='h5'
                      align="center"
                    >
                      New Job Posting
                    </Typography>
                  </Grid>
                </Paper>


              </ButtonBase>

              <ButtonBase
                focusRipple
                type="button"
                onClick={() => this.props.history.push('/myjobs')}
              >
                <Paper
                  elevation={3}
                  style={styles.paper}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={styles.subGrid}
                  >
                    <AssignmentIcon style={styles.icon} />
                    <Typography
                      variant='h5'
                      align="center"
                    >
                      View Active Jobs
                    </Typography>
                  </Grid>
                </Paper>

              </ButtonBase>

              <ButtonBase
                focusRipple
                type="button"
                onClick={() => this.props.history.push('/history')}
              >
                <Paper
                  elevation={3}
                  style={styles.paper}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={styles.subGrid}
                  >
                    <HistoryIcon style={styles.icon} />
                    <Typography
                      variant='h5'
                      align="center"
                    >
                      History
                    </Typography>
                  </Grid>
                </Paper>

              </ButtonBase>

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
    fontSize: 60,
    color: "#3f51b5",
    padding: ".2em"
  },
  grid: {
    marginTop: "1em",
    height: "80vh"
  },
  subGrid: {
    height: "20vh",
    width: "70vw"
  },
  paper: {
    padding: "1.5em",
  }
}

export default User