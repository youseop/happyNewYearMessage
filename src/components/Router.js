import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import FindFriends from "../routes/FindFriends";
import Home from "../routes/Home";
import SignIn from "../routes/SignIn";
import SignUp from "../routes/SignUp";
import UserMsgPage from "../routes/UserMsgPage";
import UserPage from "../routes/UserPage";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home userObj={userObj} />
        </Route>
        <Route exact path="/signin">
          <SignIn userObj={userObj} />
        </Route>
        <Route exact path="/signup">
          <SignUp userObj={userObj} />
        </Route>
        <Route exact path="/friend">
          <FindFriends />
        </Route>
        <Route path="/user/:id" component={UserPage} />
        <Route path="/user-msg/:id" component={UserMsgPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
