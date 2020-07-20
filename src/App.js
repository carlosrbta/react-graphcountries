import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Countries from "./Countries";
import Country from "./Country";

const App = () => {
  return (
    <>
      <div>Header</div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Countries} />
          <Route path="/:name" component={Country} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
