import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

function SignUp() {
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
    } else if (name === "nickName" && value.length < 20) {
      setNickName(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      alert("동일한 비밀번호를 입력해주세요.");
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
      });
      history.push(`/user/${uid}`);
    } catch (error) {
      setError(error.message);
    }
  };

  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const emailInputCheck = () => {
    if (!regEmail.test(email)) {
      return "invalid";
    }
  };

  const passwordLengthCheck = () => {
    if (password.length < 6) {
      return "invalid";
    }
  };

  const passwordConfirmCheck = () => {
    if (password !== passwordCheck) {
      return "invalid";
    }
  };

  return (
    <div>
      signup
      <form onSubmit={onSubmit}>
        <input
          name="nickName"
          type="text"
          placeholder="nickName"
          required
          value={nickName}
          onChange={onChange}
        />
        <input
          className={emailInputCheck()}
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        {email && emailInputCheck() && "올바른 이메일 형식을 입력해주세요."}
        <input
          className={passwordLengthCheck()}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        {password &&
          passwordLengthCheck() &&
          "비밀번호는 6자 이상 입력해주세요."}
        <input
          className={passwordConfirmCheck()}
          name="passwordCheck"
          type="password"
          placeholder="PasswordCheck"
          required
          value={passwordCheck}
          onChange={onChange}
        />
        {password &&
          passwordCheck &&
          passwordConfirmCheck() &&
          "동일한 비밀번호를 입력해주세요."}
        <input type="submit" value="create account" />
        {error}
      </form>
    </div>
  );
}

export default SignUp;
