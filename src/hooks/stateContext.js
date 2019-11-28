import React from "react";
import useGlobalState from "./useGlobalState";

export const StateContext = React.createContext();
const StateProvider = props => {
  const { state, getCurrentWeather, selectedCity } = useGlobalState();
  return (
    <StateContext.Provider
      value={{
        state,
        getCurrentWeather,
        selectedCity
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateProvider;
