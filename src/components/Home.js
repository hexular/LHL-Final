import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import AppBar from './Appbar';
import Button from '@material-ui/core/Button';
import { TiBriefcase } from "react-icons/ti";

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
          <AppBar title="Welcome"  history={this.props.history}/>
          <React.Fragment>
            <section >
              {/* <AppBar title="Main Portal #Lit-Final" style={styles.appbar}/> */}
              <p style={styles.title}>  Jobify</p>
              <p style={styles.icon}>  <TiBriefcase/></p>

              {/* <img src="https://www.simplyhired.ca/static/home/img/discover-local-jobs.png" style={styles.image} /> */}
              <React.Fragment>
                <section style={styles.buttonsSection}>
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    style={styles.button}
                    onClick={() => this.props.history.push("/userlogin")}
                  >User Login</Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    style={styles.button}
                    onClick={() => this.props.history.push("/jobberlogin")}
                  >Jobber Login</Button>
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
    fontSize: "1em",
    fontWeight: "bold",
    fontFamily: "'Nunito', sans-serif",
    height: 70,
    borderRadius: "20px",
    marginTop: "2em",
    marginBottom: "2em"
  },
  buttonsSection: {
    marginTop:"1em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
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
    paddingTop: "0.75em",
    textAlign: "center",
    fontSize: "5em",
    fontFamily: "'Maven Pro', 'sans-serif'",
    fontWeight: "bold"
  },
  icon: {
    margin: "auto",
    
    textAlign: "center",
    fontSize: "100px",
    fontWeight: "bold"
  }
}

export default Home

