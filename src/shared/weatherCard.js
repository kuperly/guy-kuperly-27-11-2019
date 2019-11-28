import React from "react";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  cardWrapper: {
    margin: 15,
    padding: 25
  }
}));

const WeatherCard = ({ card }) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardWrapper} key={card.Date}>
      <CardContent>
        <img alt={card.Date} src={`/assets/icons/${card.Day.Icon}.png`} />
        <Typography variant="h5" color="textSecondary" gutterBottom>
          <Moment format="ddd" date={card.Date}></Moment>
        </Typography>
        <Typography variant="h4" component="h2">
          {card.Temperature.Maximum.Value}
          {card.Temperature.Maximum.Unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
