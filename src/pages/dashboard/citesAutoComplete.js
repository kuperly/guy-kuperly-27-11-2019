import React, { useEffect, useContext, useState } from "react";
import axios from "../../axios-config";
import CONSTANCE from "../../constance";
import useDebounce from "../../utils/useDebounce";

import { StateContext } from "../../stateManager/stateContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const CitiesAutocomplete = () => {
  const { selectedCity } = useContext(StateContext);
  const [inputValue, setInputValue] = useState("");
  const [options, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCharacters(debouncedSearchTerm).then(results => {
        setResults(results);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  function searchCharacters(inputValue) {
    return (
      axios
        // .get("assets/stubs/autocomplete.json")
        .get(
          `locations/v1/cities/autocomplete?apikey=${CONSTANCE.key}&q=${inputValue}`
        )
        .then(res => {
          const value = res.data ? res.data : [];
          return value;
        })
        .catch(err => [])
    );
  }

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
      onInputChange={(e, val) => {
        setInputValue(val);
      }}
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
