import React from "react";
import { useHistory } from "react-router-dom";

const HamburgerMenu = ({ userObj, isLoggedIn }) => {
  const history = useHistory();
  const onClickGoToMyTree = () => {
    if (userObj) {
      history.push(`/user/${userObj.uid}`);
    } else {
      history.push("signin");
    }
  };
  return (
    <div>
      HamburgerMenu
      <button onClick={onClickGoToMyTree}>내 트리 보기</button>
    </div>
  );
};

export default HamburgerMenu;
