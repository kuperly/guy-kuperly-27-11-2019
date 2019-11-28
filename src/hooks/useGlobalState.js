import React, { useReducer, useEffect } from "react";
import axios from "axios";
import {
  GET_CURRENT_WEATHER,
  IS_LOADING,
  SET_ERROR,
  SELECT_CITY
} from "./config";

const initialState = {
  isLoading: true,
  favorites: [],
  selectedCity: { key: "215854", LocalizedName: "Tel Aviv" }, // ?
  weekData: [],
  currentWeather: {},
  currentLocation: {}, // ?
  error: {}
};

// #1 GEO Location ???
// #2 get city id
// #3 get current weather
// #4 get 5 days

const globalStateReduser = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SELECT_CITY:
      return { ...state, selectedCity: action.payload };
    case GET_CURRENT_WEATHER:
      return { ...state, currentWeather: action.payload, isLoading: false };
    case SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

const useGlobalState = () => {
  const [state, dispach] = useReducer(globalStateReduser, initialState);

  // Init
  //   useEffect(() => {
  //     getCurrentWeather(state.selectedCity.key);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  useEffect(() => {
    debugger;
    getCurrentWeather(state.selectedCity.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedCity]);

  //http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=qkPKdT2prm4JV8FmFlpVPGq1hEQFDIAQ
  const getCurrentWeather = cityKey => {
    dispach({ type: IS_LOADING, payload: true });
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=qkPKdT2prm4JV8FmFlpVPGq1hEQFDIAQ`
      )
      .then(res => {
        debugger;
        dispach({ type: GET_CURRENT_WEATHER, payload: res.data[0] });
      })
      .catch(err => {
        dispach({ type: SET_ERROR, payload: err });
      });
  };
  const selectedCity = city => {
    dispach({ type: SELECT_CITY, payload: city });
  };

  return { state, getCurrentWeather, selectedCity };
};

export default useGlobalState;
