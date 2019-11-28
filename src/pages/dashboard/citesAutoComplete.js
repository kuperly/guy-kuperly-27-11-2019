import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { StateContext } from "../../hooks/stateContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const CitiesAutocomplete = () => {
  const { selectedCity } = useContext(StateContext);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    // axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=qkPKdT2prm4JV8FmFlpVPGq1hEQFDIAQ&q=${inputValue}`).then((res)=> {
    axios.get("assets/stubs/autocomplete.json").then(res => {
      const value = res.data ? res.data : [];
      setOptions(value);
    });
  }, [inputValue]);

  const handleChange = val => {
    setInputValue(val);
  };
  const hendleSelectedCity = data => {
    debugger;
    const { Key, LocalizedName } = data;
    selectedCity({ key: Key, LocalizedName });
  };

  return (
    <Autocomplete
      id="weather-data"
      options={options}
      getOptionLabel={option => option.LocalizedName || ""}
      includeInputInList
      freeSolo
      onChange={(ev, value) => hendleSelectedCity(value)}
      onInputChange={(ev, val) => handleChange(val)}
      disableOpenOnFocus
      renderInput={params => (
        <TextField {...params} variant="outlined" label="Select city" />
      )}
      renderOption={option => {
        return <div key={option.LocalizedName}>{option.LocalizedName}</div>;
      }}
    />
  );
};

export default CitiesAutocomplete;
