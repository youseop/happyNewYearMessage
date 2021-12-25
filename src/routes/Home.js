import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import HamburgerMenu from "./HamburgerMenu";

const Home = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const history = useHistory();

  const compactUserInfo = (user) => {
    return {
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    };
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(compactUserInfo(user));
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const onClickMakeBtn = () => {
    if (!init) {
      console.log("not yet initialized");
      return;
    }
    if (userObj) {
      history.push(`/user/${userObj.uid}`);
      return;
    }
    history.push("signup");
  };

  return (
    <div className="home-container">
      <HamburgerMenu userObj={userObj} isLoggedIn={isLoggedIn} />
      <span>새해 복 많이 받으세요</span>
      <button onClick={onClickMakeBtn}>트리 만들기</button>
    </div>
  );
};
export default Home;
