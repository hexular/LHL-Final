import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

const Loading = () => {
  const classes = useStyles();

  return (

    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Loading"
          height="230"
          image="/loading.gif"
          title="Loading"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Loading Jobs
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Loading;