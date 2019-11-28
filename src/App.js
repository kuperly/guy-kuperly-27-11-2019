import React from "react";
import "./App.css";
import Layout from "./pages/layout";
import StateProvider from "./hooks/stateContext";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Layout />
      </StateProvider>
    </div>
  );
}

export default App;
