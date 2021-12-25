import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

const UserPage = ({ match }) => {
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [nickName, setNickName] = useState("");
  const [sameUser, setSameUser] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [msgList, setMsgList] = useState([]);
  const history = useHistory();

  const checkUid = async (uid) => {
    const userInfo = await dbService
      .collection("userInfo")
      .where("uid", "==", uid)
      .get();
    if (userInfo.docs.length > 0) {
      const { displayName, uid } = userInfo.docs[0].data();
      setUid(uid);
      setDisplayName(displayName);
      return true;
    } else {
      alert("잘못된 접근입니다.");
      history.push("/");
      return false;
    }
  };

  const getMsgs = async (uid) => {
    const msgs = await dbService
      .collection("message")
      .where("uid", "==", uid)
      .orderBy("createdAt")
      .get();
    setMsgList(msgs.docs.map((doc) => doc.data()));
  };

  const checkUidAndGetMsgs = async (uid) => {
    if (checkUid(uid)) {
      getMsgs(uid);
    }
  };

  useEffect(() => {
    const uid = match.params.id;
    checkUidAndGetMsgs(uid);
    if (authService.currentUser && uid === authService.currentUser.uid) {
      setSameUser(true);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const msgObj = {
      uid: uid,
      nickName: nickName,
      text: msgText,
      photo: "photo1",
      createdAt: Date.now(),
    };
    await dbService.collection("message").add(msgObj);
    setMsgText("");
    setNickName("");
    setMsgList((prev) => [...prev, msgObj]);
  };
  const onChangeMsgText = (e) => {
    const {
      target: { value },
    } = e;
    setMsgText(value);
  };
  const onChangeNickName = (e) => {
    const {
      target: { value },
    } = e;
    setNickName(value);
  };

  const onClickSignUp = () => {
    history.push("/signup");
  };

  return (
    <div>
      userPage {`${uid} ${displayName} ${sameUser}`}
      <div>지금까지 {msgList.length}개의 메세지가 도착했습니다.</div>
      <ul>
        {msgList.map((msg) => {
          return (
            <li key={msg.createdAt}>
              <div>{msg.nickName}</div>
              <div>{msg.text}</div>
              <div>{msg.photo}</div>
            </li>
          );
        })}
      </ul>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="덕담을 나눠주세요"
          maxLength={1000}
          onChange={onChangeMsgText}
          value={msgText}
        />
        <input
          type="text"
          placeholder="이름을 적어주세요"
          maxLength={100}
          onChange={onChangeNickName}
          value={nickName}
        />
        <input type="submit" value="전송" />
      </form>
      {!sameUser && <button onClick={onClickSignUp}>트리 만들기</button>}
    </div>
  );
};

export default UserPage;
