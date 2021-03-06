import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import "./SignUp.css";

function SignUp({ userObj }) {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordCheck") {
      setPasswordCheck(value);
    } else if (name === "nickName" && value.length < 15) {
      setNickName(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (passwordLengthCheck() || emailInputCheck() || passwordConfirmCheck()) {
      return;
    }
    try {
      const data = await authService.createUserWithEmailAndPassword(
        email,
        password
      );
      const { uid } = data.user;
      await dbService.collection("userInfo").add({
        uid: uid,
        displayName: nickName,
        createdAt: Date.now(),
        email: email,
      });
      history.push(`/user/${uid}`);
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

  const emailInputCheck = () => {
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (email && !regEmail.test(email)) {
      return "invalid";
    }
  };

  const passwordLengthCheck = () => {
    if (password && password.length < 6) {
      return "invalid";
    }
  };

  const passwordConfirmCheck = () => {
    if (password !== passwordCheck) {
      return "invalid";
    }
  };
  const onClickGoToHome = () => {
    history.push("/");
  };
  const onClickGoBack = () => {
    history.goBack();
  };

  return (
    <div className="signup-container">
      <div className="btn-container">
        <button onClick={onClickGoToHome}>????????????</button>
        <button onClick={onClickGoBack}>??????</button>
      </div>
      <div className="signup-text">?????? ?????? ?????????</div>
      <form className="signup-form" onSubmit={onSubmit}>
        <span className="input-text">??????</span>
        <input
          name="nickName"
          type="text"
          placeholder=""
          required
          value={nickName}
          onChange={onChange}
        />
        <div className="warning-text"></div>
        <span className="input-text">?????????</span>
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
          {email && emailInputCheck() && "????????? ????????? ????????? ??????????????????."}
          {/* Please enter a valid email format. */}
        </div>
        <span className="input-text">????????????</span>
        <input
          className={passwordLengthCheck()}
          name="password"
          type="password"
          placeholder=""
          required
          value={password}
          onChange={onChange}
        />
        <div className="warning-text">
          {password &&
            passwordLengthCheck() &&
            "??????????????? 6??? ?????? ??????????????????."}
          {/* Please enter a password of at least 6 characters. */}
        </div>
        <span className="input-text">???????????? ??????</span>
        <input
          className={passwordConfirmCheck()}
          name="passwordCheck"
          type="password"
          placeholder=""
          required
          value={passwordCheck}
          onChange={onChange}
        />
        <div className="warning-text">
          {password &&
            passwordCheck &&
            passwordConfirmCheck() &&
            "??????????????? ???????????? ????????????."}
          {/* Please enter the same password. */}
        </div>
        <input className="main-button" type="submit" value="" />
      </form>
    </div>
  );
}

export default SignUp;
