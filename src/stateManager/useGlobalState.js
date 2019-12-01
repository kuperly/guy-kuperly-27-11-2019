import { useReducer, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "../axios-config";
import CONSTANCE from "../constance";

import {
  GET_CURRENT_WEATHER,
  IS_LOADING,
  SET_ERROR,
  SELECT_CITY,
  GET_WEEK_WEATHER,
  TOGGLE_FAVORITE,
  TOGGLE_DARK_MODE
} from "./config";

const initialState = {
  isLoading: true,
  darkMode: false,
  favorites: JSON.parse(window.localStorage.getItem("favorites")) || [],
  selectedCity: {},
  weekData: null,
  currentWeather: {},
  error: {}
};

const defaultCity = { name: "Tel Aviv", key: "215854" };

const globalStateReduser = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.payload };
    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case SELECT_CITY:
      return { ...state, selectedCity: action.payload };
    case TOGGLE_FAVORITE:
      return { ...state, favorites: action.payload, isLoading: false };
    case GET_CURRENT_WEATHER:
      return { ...state, currentWeather: action.payload, isLoading: false };
    case GET_WEEK_WEATHER:
      return { ...state, weekData: action.payload, isLoading: false };
    case SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

const useGlobalState = () => {
  const [state, dispach] = useReducer(globalStateReduser, initialState);
  const { enqueueSnackbar } = useSnackbar();

  // first init
  useEffect(() => {
    handleLocation();
    handleFavoritesData();
  }, []);

  useEffect(() => {
    if (state.selectedCity.key) {
      getCurrentWeather(state.selectedCity);
      getWeekWeather(state.selectedCity.key);
    }
  }, [state.selectedCity.key]);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        // position.coords.latitude, position.coords.longitude
        getCityByLocation(position.coords.latitude, position.coords.longitude);
      },
      err => {
        // set default selected city
        dispach({ type: SELECT_CITY, payload: defaultCity });
      }
    );
  };
  const getCityByLocation = (lan, lon) => {
    dispach({ type: IS_LOADING, payload: true });
    axios
      .get(
        // "assets/stubs/city-by-coords.json"
        `locations/v1/cities/geoposition/search?apikey=${CONSTANCE.key}&q=${lan},${lon}`
      )
      .then(res => {
        const data = res.data;
        const current = {
          name: data.LocalizedName,
          key: data.Key
        };
        const isFavorite = state.favorites.find(
          item => item.key === current.key
        );
        current.isFavorite = isFavorite ? true : false;
        dispach({ type: SELECT_CITY, payload: current });
        return;
      })
      .catch(err => {
        // set default selected city
        dispach({ type: SELECT_CITY, payload: defaultCity });
      });
  };

  const handleFavoritesData = async () => {
    let _favorites = JSON.parse(window.localStorage.getItem("favorites")) || [];

    for (let i = 0; i < _favorites.length; i++) {
      _favorites[i] = await getFavoritesCurrentWeather(_favorites[i]);
    }

    dispach({ type: TOGGLE_FAVORITE, payload: _favorites });
  };

  const getFavoritesCurrentWeather = city => {
    dispach({ type: IS_LOADING, payload: true });
    return axios
      .get(
        // "assets/stubs/current-weather.json"
        `currentconditions/v1/${city.key}?q=&apikey=${CONSTANCE.key}`
      )
      .then(res => {
        const data = res.data[0];
        return {
          name: city.name,
          key: city.key,
          weather: data.Temperature.Metric.Value,
          unit: data.Temperature.Metric.Unit,
          icon: data.WeatherIcon
        };
      })
      .catch(err => {
        dispach({ type: SET_ERROR, payload: err });
        return {
          name: city.name,
          key: city.key,
          weather: null,
          unit: null,
          icon: null
        };
      });
  };

  const getCurrentWeather = city => {
    dispach({ type: IS_LOADING, payload: true });
    axios
      .get(
        // "assets/stubs/current-weather!!!.json"
        `currentconditions/v1/${city.key}?q=&apikey=${CONSTANCE.key}`
      )
      .then(res => {
        const data = res.data[0];
        const item = {
          name: state.selectedCity.name,
          key: state.selectedCity.key,
          weather: data.Temperature.Metric.Value,
          unit: data.Temperature.Metric.Unit,
          icon: data.WeatherIcon
        };
        dispach({ type: GET_CURRENT_WEATHER, payload: item });
      })
      .catch(err => {
        dispach({ type: SET_ERROR, payload: err });
        const item = {
          name: state.selectedCity.name,
          key: state.selectedCity.key,
          weather: null,
          unit: null,
          icon: null
        };
        dispach({ type: GET_CURRENT_WEATHER, payload: item });
      });
  };
  const getWeekWeather = cityKey => {
    dispach({ type: IS_LOADING, payload: true });
    axios
      .get(
        // "assets/stubs/5-days.json"
        `forecasts/v1/daily/5day/${cityKey}?apikey=${CONSTANCE.key}&details=true&metric=true`
      )
      .then(res => {
        res.data.DailyForecasts = res.data.DailyForecasts.map(day => {
          return {
            id: day.Date,
            name: day.Date,
            icon: day.Day.Icon,
            weather: day.Temperature.Maximum.Value,
            minWeather: day.Temperature.Minimum.Value,
            unit: day.Temperature.Maximum.Unit,
            date: day.Date
          };
        });
        dispach({ type: GET_WEEK_WEATHER, payload: res.data });
      })
      .catch(err => {
        dispach({ type: SET_ERROR, payload: err });
      });
  };
  const selectedCity = city => {
    const isFavorite = state.favorites.find(item => item.key === city.key);
    city.isFavorite = isFavorite ? true : false;
    dispach({ type: SELECT_CITY, payload: city });
  };
  const toggleFavorite = () => {
    // check ADD/REMOVE
    let _favorites = [...state.favorites];

    if (state.selectedCity.isFavorite) {
      _favorites = _favorites.filter(
        city => state.selectedCity.key !== city.key
      );
    } else {
      _favorites.push(state.selectedCity);
    }
    const city = { ...state.selectedCity };
    city.isFavorite = !city.isFavorite;
    enqueueSnackbar("Action success!", { variant: "success" });
    dispach({ type: SELECT_CITY, payload: city });
    dispach({ type: TOGGLE_FAVORITE, payload: _favorites });
  };
  const toggleDarkMode = () => {
    dispach({ type: TOGGLE_DARK_MODE });
  };

  const handleErrors = (error, trigger = false) => {
    if (trigger) {
      enqueueSnackbar("Somthing went wrong!", { variant: "error" });
    }
    dispach({ type: SET_ERROR, payload: error });
  };

  return {
    state,
    getCurrentWeather,
    selectedCity,
    getWeekWeather,
    toggleFavorite,
    handleFavoritesData,
    toggleDarkMode,
    handleErrors
  };
};

export default useGlobalState;
