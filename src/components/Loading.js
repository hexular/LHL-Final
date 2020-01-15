import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 300,
    margin: 'auto'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  noJobMessage: {
    fontSize: "2rem",
    marginTop: 200,
    marginBottom: 200,
    fontWeight: "bold"
  }
});

const Loading = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(false)

  setTimeout(() => setLoad(true), 3000)

  return (

    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "70vh" }}>
      {load ?
        <Typography className={classes.noJobMessage}>No Active Job(s)</Typography> :
        <div className={classes.card}>
          <CardMedia
            classname={classes.media}
            component="img"
            alt="Loading"
            image="/loading.gif"
            title="Loading"
          />
        </div>
      }
    </Grid>
  );
}


export default Loading;