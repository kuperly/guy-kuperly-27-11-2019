import React from "react";
import useGlobalState from "./useGlobalState";

export const StateContext = React.createContext();
const StateProvider = props => {
  const {
    state,
    getCurrentWeather,
    selectedCity,
    getWeekWeather,
    toggleFavorite,
    handleFavoritesData,
    toggleDarkMode,
    handleErrors
  } = useGlobalState();
  return (
    <StateContext.Provider
      value={{
        state,
        getCurrentWeather,
        selectedCity,
        getWeekWeather,
        toggleFavorite,
        handleFavoritesData,
        toggleDarkMode,
        handleErrors
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateProvider;
