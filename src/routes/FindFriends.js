import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { dbService } from "../fbase";
import "./FindFriends.css";

const FindFriends = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const emailInputCheck = () => {
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (email && !regEmail.test(email)) {
      return "invalid";
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (emailInputCheck()) {
      return;
    }
    try {
      const userInfo = await dbService
        .collection("userInfo")
        .where("email", "==", email)
        .get();
      if (userInfo.docs.length > 0) {
        const { uid } = userInfo.docs[0].data();
        history.push(`/user/${uid}`);
      } else {
        alert(`${email}에 해당하는 사용자를 찾을 수 없습니다.`);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onClickGoToHome = () => {
    history.push("/");
  };
  const onClickGoBack = () => {
    history.goBack();
  };

  return (
    <div className="findfriend-container">
      <div className="btn-container">
        <button onClick={onClickGoToHome}>메인화면</button>
        <button onClick={onClickGoBack}>뒤로</button>
      </div>
      <form className="signup-form" onSubmit={onSubmit}>
        <span className="input-text">친구의 이메일</span>
        <input
          className={emailInputCheck()}
          name="email"
          type="text"
          placeholder=""
          required
          value={email}
          onChange={onChange}
        />
        <div className="warning-text">
          {email && emailInputCheck() && "올바른 이메일 형식을 입력해주세요."}
          {/* Please enter a valid email format. */}
        </div>
        <input className="main-button" type="submit" value="" />
      </form>
    </div>
  );
};

export default FindFriends;
