# 💼 Jobify

## 🔎 Overview

Jobify is a an app designed to allow users to request jobs from 'jobbers' in their area. From simple cleaning to farm work to construction, users can create a job posting with a description, hourly rate and estimated time for completion. 

Jobbers can view all the jobs available and accept the job of their choosing, either from a list or a map view which dynamically plots the jobs on a map around their current location.

To simply view the app, go to https://optimistic-goldstine-0e69a0.netlify.com/ and allow for up to 10 seconds for the server to boot up. You can register an account as a user and a jobber to see both sides. To get a more in depth look, follow the set up instructions.

## 📸 Snapshots 

### Login

!["Login"](https://i.imgur.com/1p7qDRf.gif)

_____
### WebSockets in Action

!["WebSocket Updates"](https://i.imgur.com/pk361aq.gif)
_____
### Adding a New Job

!["New Job"](https://i.imgur.com/kRw0Rec.gif)

_____
### Map View

!["Map View"](https://i.imgur.com/vsEPuEj.gif)
_____

## 🛠 Setup

To play around with and edit the code, follow these instructions:

1. Clone the repository in a local folder

2. Install dependencies with `npm install`

3. Clone and setup the server side from https://github.com/hexular/LHL-Final-Server

4. Once the server is set up, run it from the root directory with `npm start`

5. Run the Jobify app from its root directory with `npm start`

6. Go to http://localhost:3000 in your browser to interact with the app

## ⚙️ Dependencies 

-react: ^16.12.0
-react-router: ^5.1.2
-react-router-dom: ^5.1.2
-react-scripts: 3.3.0
-axios: ^0.19.0
-google-map-react: ^1.1.5
-material-ui: ^0.20.2