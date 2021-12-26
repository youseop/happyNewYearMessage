import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = ({ userObj }) => {
  const history = useHistory();

  const onClickMakeBtn = () => {
    history.push("signup");
  };
  const onClickGoToMyTree = () => {
    if (userObj) {
      history.push(`/user/${userObj.uid}`);
    } else {
      history.push("signin");
    }
  };
  const onClickFindFriend = () => {
    history.push("/friend");
  };

  return (
    <>
      <div className="home-container">
        <img className="main-text" alt="" src="img/main-msg.png" />
        <img className="main-img" alt="" src="img/main-icon.png" />
        <div className="main-text-container">
          2021년 힘든 한 해를 보낸 친구에게
          <br />
          따듯한 메세지를 남겨주세요.
          <br />몇 광년 거리두기를 통해 안전하게 전달됩니다.
        </div>
      </div>
      <div className="button-container">
        <button className="main-button" onClick={onClickMakeBtn} />
        <div className="mini-button-container">
          <button className="mini-button" onClick={onClickGoToMyTree}>
            내 행성으로
          </button>
          <button className="mini-button" onClick={onClickFindFriend}>
            친구 찾기
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
