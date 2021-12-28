import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

const Profile = ({ userObj, refreshUser, match }) => {
  const uid = "uid2";
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyMsgs = async () => {
    const msgs = await dbService
      .collection("message")
      .where("uid", "==", uid)
      .orderBy("createdAt")
      .get();
    console.log(msgs.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyMsgs();
  }, []);

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogOutClick}>log out</button>
    </>
  );
};
export default Profile;
