import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { StateContext } from "../../hooks/stateContext";
import CitiesAutocomplete from "./citesAutoComplete";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { Container } from "@material-ui/core";
import CardsGrid from "../../shared/cardsGrid";

const useStyles = makeStyles(theme => ({}));

function Dashboard() {
  const {
    state: { currentWeather, isLoading, selectedCity }
  } = useContext(StateContext);
  const classes = useStyles();

  const key = "qkPKdT2prm4JV8FmFlpVPGq1hEQFDIAQ";

  const [data, setData] = useState();
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    // axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedId}?apikey=${key}&details=true&metric=true`).then((res) => {
    axios.get("assets/stubs/5-days.json").then(res => {
      setData(res.data);
    });
  }, []);

  const daysArea = data && (
    <>
      <div className={classes.mainTitle}>{data.Headline.Text}</div>
      <CardsGrid cards={data.DailyForecasts}></CardsGrid>
    </>
  );

  return (
    <Container fixed style={{ border: "1px solid" }}>
      <Grid container>
        <Grid item xs={12}>
          <CitiesAutocomplete />
        </Grid>

        <Grid item xs={6}>
          <IconButton aria-label="like">
            <FavoriteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          {!isLoading && (
            <div className={classes.localWrapper}>
              <img
                alt="image"
                src={`/assets/icons/${currentWeather.WeatherIcon}.png`}
              />
              {selectedCity.LocalizedName}
              {currentWeather.Temperature.Metric.Value}
              {currentWeather.Temperature.Metric.Unit}
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          {daysArea}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
