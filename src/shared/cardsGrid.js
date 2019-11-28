import React from "react";
import Grid from "@material-ui/core/Grid";
import WeatherCard from "./weatherCard";

const CardsGrid = ({ cards }) => {
  return (
    <Grid justify="space-around" container>
      {cards.map((card, i) => {
        return (
          <Grid key={i} item xs={12} md={"auto"}>
            <WeatherCard card={card} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardsGrid;
