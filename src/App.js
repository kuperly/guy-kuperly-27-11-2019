import React from "react";
import "./App.css";
import Layout from "./pages/layout";
import StateProvider from "./stateManager/stateContext";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={2}>
        <StateProvider>
          <Layout />
        </StateProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
