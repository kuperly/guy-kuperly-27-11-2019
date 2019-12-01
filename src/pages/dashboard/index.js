import React, { useContext } from "react";

import { StateContext } from "../../stateManager/stateContext";
import CitiesAutocomplete from "./citesAutoComplete";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import { Container } from "@material-ui/core";
import CardsGrid from "../../shared/cardsGrid";
import FavoriteButton from "../../shared/favoriteBTN";
import Spinner from "../../shared/Spinner/Spinner";

const useStyles = makeStyles(theme => ({
  mainTitle: {
    padding: 25
  },
  localWeatherWrapper: {
    position: "relative"
  },
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
}));

function Dashboard() {
  const {
    state: { currentWeather, isLoading, weekData }
  } = useContext(StateContext);
  const classes = useStyles();

  const daysArea = weekData && (
    <>
      <Typography
        className={classes.mainTitle}
        variant="h4"
        component="h1"
        color="textSecondary"
      >
        {weekData.Headline.Text}
      </Typography>
      <CardsGrid cards={weekData.DailyForecasts}></CardsGrid>
    </>
  );

  return (
    <Container fixed style={{ paddingTop: 40 }}>
      <Grid alignItems="center" container>
        <Grid style={{ paddingBottom: 20 }} item md={6} xs={12}>
          <CitiesAutocomplete />
        </Grid>
        <Grid item md={6} xs={12}>
          {!isLoading && (
            <Box className={classes.localWeatherWrapper}>
              {currentWeather.weather ? (
                <>
                  <img
                    alt="image"
                    src={`/assets/icons/${currentWeather.icon}.png`}
                  />
                  <Typography variant="h5" color="textSecondary" gutterBottom>
                    {currentWeather.name}
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {`${parseInt(currentWeather.weather, 10)}°`}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h5" color="textSecondary" gutterBottom>
                    {currentWeather.name}
                  </Typography>
                  <Typography variant="subtitle2" component="h2">
                    Something went wrong
                  </Typography>
                </>
              )}
              <FavoriteButton></FavoriteButton>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          {isLoading ? <Spinner></Spinner> : daysArea}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
