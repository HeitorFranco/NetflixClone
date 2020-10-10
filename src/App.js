import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import QueryProvider from "./contexts/queryContext";
function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={() => <h1>404 Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
