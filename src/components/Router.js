import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import SignIn from "../routes/SignIn";
import SignUp from "../routes/SignUp";
import UserPage from "../routes/UserPage";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route path="/user/:id" component={UserPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
