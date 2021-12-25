import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

function SignIn() {
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
      setError(error.message);
    }
  };

  const onClick = () => {
    history.push("/signup");
  };

  return (
    <div>
      signin
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="log in" />
        {error}
      </form>
      <button onClick={onClick}>트리 만들기</button>
    </div>
  );
}

export default SignIn;
