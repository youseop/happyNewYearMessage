import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

function Auth() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
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
    } else if (name === "nickName") {
      setNickName(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        //create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        const { uid } = data.user;
        await dbService.collection("userInfo").add({
          uid: uid,
          displayName: nickName,
          createdAt: Date.now(),
        });
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      history.push(`/user/${data.user.uid}`);
    } catch (error) {
      setError(error.message);
    }
  };
  // const toggleAccount = () => setNewAccount((prev) => !prev);
  // const onSocialClick = async (e) => {
  //   const {
  //     target: { name },
  //   } = e;
  //   let provider;
  //   if (name === "google") {
  //     provider = new firebaseInstance.auth.GoogleAuthProvider();
  //   }
  //   const data = await authService.signInWithPopup(provider);
  //   console.log(data);
  // };
  return (
    <div>
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
        <input type="submit" value={newAccount ? "create account" : "log in"} />
        {error}
      </form>
      {/* <span onClick={toggleAccount}>
        {newAccount ? "sign in" : "create Account"}
      </span> */}
      {/* <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div> */}
    </div>
  );
}

export default Auth;
