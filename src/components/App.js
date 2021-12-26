import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const compactUserInfo = (user) => {
    return {
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    };
  };

  const updateAuthInfo = () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(compactUserInfo(user));
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  };

  useEffect(() => {
    updateAuthInfo();
  }, []);

  if (init) {
    return (
      <div className="app-container">
        <AppRouter userObj={userObj} isLoggedIn={isLoggedIn} />
      </div>
    );
  } else {
    return (
      <div className="loading-container">
        <img className="main-img" alt="" src="img/main-icon.png" />
        <span>loading...</span>
      </div>
    );
  }
}

export default App;
