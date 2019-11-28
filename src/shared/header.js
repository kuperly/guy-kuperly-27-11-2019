import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Weather-app</Typography>
        <Button component={Link} to="/favorites" color="inherit">
          Favorites
        </Button>
        <Button component={Link} to="/dashboard" color="inherit">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
