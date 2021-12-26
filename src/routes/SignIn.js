import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";
import "./SignIn.css";

function SignIn({ userObj }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      history.push(`/user/${data.user.uid}`);
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

  // const onClick = () => {
  //   history.push("/signup");
  // };

  const emailInputCheck = () => {
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!regEmail.test(email)) {
      return "invalid";
    }
  };
  const passwordLengthCheck = () => {
    if (password.length < 6) {
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
    <div className="signin-container">
      <div className="btn-container">
        <button onClick={onClickGoToHome}>메인화면</button>
        <button onClick={onClickGoBack}>뒤로</button>
      </div>

      <form className="signin-form" onSubmit={onSubmit}>
        <span className="input-text">이메일</span>
        <input
          name="email"
          type="text"
          placeholder=""
          required
          value={email}
          onChange={onChange}
        />
        <div className="warning-text">
          {email && emailInputCheck() && "올바른 이메일 형식을 입력해주세요."}
        </div>
        <span className="input-text">비밀번호</span>
        <input
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
            "비밀번호는 6자 이상 입력해주세요."}
        </div>
        <input className="main-button" type="submit" value="" />
      </form>
    </div>
  );
}

export default SignIn;
