import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import Button from '@material-ui/core/Button';

export class Home extends Component {
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
        if (response.data.result === "user") {
          console.log(true)
          this.props.history.replace("/user")
        } else if (response.data.result === "jobber") {
          this.props.history.replace("/jobber")
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
          <React.Fragment>
            <section style={styles.mainContainer}>
              {/* <AppBar title="Main Portal #Lit-Final" style={styles.appbar}/> */}
              <p style={styles.title}>JOBIFY</p>
              <img src="https://www.simplyhired.ca/static/home/img/discover-local-jobs.png" style={styles.image} />
              <React.Fragment>
                <section style={styles.buttonsSection}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    style={styles.button}
                    onClick={() => this.props.history.push("/userlogin")}
                  >CUSTOMER LOGIN</Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    style={styles.button}
                    onClick={() => this.props.history.push("/jobberlogin")}
                  >JOBBER LOGIN</Button>
                </section>
              </React.Fragment>
            </section>
          </React.Fragment>
        </MuiThemeProvider>
      );
  }
}

const styles = {
  button: {
    width: 180,
    fontSize: "auto",
    fontWeight: "bold",
    height: 70,
    borderRadius: "20px",
    opacity: 0.5
  },
  buttonsSection: {
    display: "flex",
    justifyContent: "space-around"
  },
  image: {
    width: "100vw",
    marginTop: "2em",
    marginBottom: "5em"
  },
  appbar: {
    backgroundColor: "#535956",
    width: "100vw"
  },
  mainContainer: {
    backgroundImage: "url(" + "https://i.redd.it/ihfnlpbze7o01.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: "100vh"
  },
  title: {
    margin: "auto",
    paddingTop: "1em",
    textAlign: "center",
    fontSize: "100px",
    color: "white",
    fontWeight: "bold"
  }
}

export default Home

