import React from "react";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  cardWrapper: {
    margin: 15,
    padding: 15,
    minWidth: 170
  }
}));

const WeatherCard = ({ card }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.cardWrapper} key={card.name}>
        <CardContent>
          {card.weather ? (
            <>
              <img alt={card.date} src={`/assets/icons/${card.icon}.png`} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {card.date ? (
                  <Moment format="ddd" date={card.date}></Moment>
                ) : (
                  card.name
                )}
              </Typography>
              <Typography variant="h5" component="h2">
                {card.minWeather ? `${parseInt(card.minWeather, 10)}° / ` : ""}
                {`${parseInt(card.weather, 10)}°`}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {card.date ? (
                  <Moment format="ddd" date={card.date}></Moment>
                ) : (
                  card.name
                )}
              </Typography>
              <Typography variant="subtitle2" component="h2">
                Something went wrong
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default WeatherCard;
