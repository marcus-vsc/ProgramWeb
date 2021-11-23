import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import User from "./pages/User";
import Profile from "./pages/Profile";
import BankAccount from "./pages/BankAccount";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={User} />
        <Route path="/create" component={Profile} />
        <Route path="/update/:id" component={Profile} />
        <Route path="/createBankAccount/:idUsuario" component={BankAccount} />
        <Route path="/updateBankAccount/:id" component={BankAccount} />
      </Switch>
    </BrowserRouter>
  );
}
