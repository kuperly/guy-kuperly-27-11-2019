import React from "react";
import Header from "../shared/header";
import Grid from "@material-ui/core/Grid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from "./dashboard";
import Favorites from "./favorites";

const Layout = props => {
  return (
    <>
      <Router>
        <Header />
        <Grid container>
          <Grid item xs={12}>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/favorites" component={Favorites} />
              <Redirect to="/dashboard" />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </>
  );
};

export default Layout;
