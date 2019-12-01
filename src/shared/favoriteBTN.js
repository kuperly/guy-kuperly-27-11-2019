import React, { useContext } from "react";
import { StateContext } from "../stateManager/stateContext";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const FavoriteButton = () => {
  const {
    state: { selectedCity },
    toggleFavorite
  } = useContext(StateContext);

  return (
    <Tooltip
      title={
        selectedCity.isFavorite ? "Remove to favorites" : "Add from favorites"
      }
    >
      <IconButton
        aria-label="Favorite"
        color="secondary"
        onClick={toggleFavorite}
      >
        {selectedCity.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
