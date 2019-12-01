import React, { useContext, useEffect } from "react";
import { StateContext } from "../../stateManager/stateContext";
import CardsGrid from "../../shared/cardsGrid";
import Typography from "@material-ui/core/Typography";
import Spinner from "../../shared/Spinner/Spinner";

const Favorites = props => {
  const {
    state: { isLoading, favorites },
    handleFavoritesData
  } = useContext(StateContext);

  useEffect(() => {
    handleFavoritesData();
  }, []);

  const contentData = favorites.length ? (
    <CardsGrid cards={favorites}></CardsGrid>
  ) : (
    <Typography variant="h6" component="h2" style={{ paddingTop: 25 }}>
      Please add some cities to favirite...
    </Typography>
  );

  return (
    <>
      <Typography variant="h4" component="h2" style={{ padding: 25 }}>
        My Favorites
      </Typography>
      {isLoading && <Spinner></Spinner>}
      {!isLoading && contentData}
    </>
  );
};

export default Favorites;
