import React, { useEffect, useContext } from "react";
import axios from "../../axios-config";
import CONSTANCE from "../../constance";

import { StateContext } from "../../stateManager/stateContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const CitiesAutocomplete = () => {
  const { selectedCity } = useContext(StateContext);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    axios
      // .get("assets/stubs/autocomplete.json")
      .get(
        `locations/v1/cities/autocomplete?apikey=${CONSTANCE.key}&q=${inputValue}`
      )
      .then(res => {
        const value = res.data ? res.data : [];
        setOptions(value);
      })
      .catch(err => console.log(err));
  }, [inputValue]);

  const handleChange = val => {
    setInputValue(val);
  };
  const hendleSelectedCity = data => {
    if (!data) return;
    const { Key, LocalizedName } = data;
    selectedCity({ key: Key, name: LocalizedName });
  };

  return (
    <Autocomplete
      id="weather-data"
      options={options}
      getOptionLabel={option => option.LocalizedName || ""}
      freeSolo
      disableClearable
      onChange={(ev, value) => hendleSelectedCity(value)}
      onInputChange={(ev, val) => handleChange(val)}
      disableOpenOnFocus
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
          margin="normal"
          label="Select city"
        />
      )}
      renderOption={option => {
        return <div key={option.LocalizedName}>{option.LocalizedName}</div>;
      }}
    />
  );
};

export default CitiesAutocomplete;
