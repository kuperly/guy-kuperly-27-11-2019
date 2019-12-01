import React, { useContext } from "react";
import Header from "../shared/header";
import Grid from "@material-ui/core/Grid";
import { StateContext } from "../stateManager/stateContext";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from "./dashboard";
import Favorites from "./favorites";

const Layout = props => {
  const {
    state: { darkMode }
  } = useContext(StateContext);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Grid style={{ paddingTop: 60 }} container>
            <Grid item xs={12}>
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/favorites" component={Favorites} />
                <Redirect to="/dashboard" />
              </Switch>
            </Grid>
          </Grid>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default Layout;
