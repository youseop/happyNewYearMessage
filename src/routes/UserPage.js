import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import SendMsgModal from "./SendMsgModal";
import MsgModal from "./MsgModal";
import "./UserPage.css";

const UserPage = ({ match }) => {
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [sameUser, setSameUser] = useState(false);
  const [msgList, setMsgList] = useState([]);
  const [isMsgModalOpened, setIsMsgModalOpened] = useState(false);
  const [displayMsgIndex, setDisplayMsgIndex] = useState(null);
  const history = useHistory();

  const addMsgOnList = (msgObj) => {
    setMsgList((prev) => [...prev, msgObj]);
  };

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

  const onClickSignUp = () => {
    history.push("/signup");
  };

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onClickToggleMsgModal = () => {
    setIsMsgModalOpened((prev) => !prev);
  };
  const getStarSize = (msgText) => {
    return `${Math.min(50, msgText.length) + 10}px`;
  };

  const onClickShowMsg = (index) => {
    setDisplayMsgIndex(index);
  };
  const onClickGoToHome = () => {
    history.push("/");
  };
  const onClickGoBack = () => {
    history.goBack();
  };

  const onCopyUrl = async () => {
    const textarea = document.getElementById("textarea");
    textarea.select();
    textarea.setSelectionRange(0, 9999);
    document.execCommand("copy");
    textarea.setSelectionRange(0, 0);

    // await navigator.clipboard.writeText(link);
    alert(
      "링크가 복사되었습니다. \nSNS를 통해 친구들에게 링크를 공유해주세요."
    );
  };

  const closeMsgModal = () => {
    setDisplayMsgIndex(null);
  };
  const url = document.location.href;
  return (
    <div className="userpage-container">
      <div className="btn-container">
        <button onClick={onClickGoToHome}>메인화면</button>
        <button onClick={onClickGoBack}>뒤로</button>
      </div>
      <div className="star-display-container">
        {msgList.map((msg, index) => {
          const { createdAt, photo, text, posX, posY } = msg;
          return (
            <div
              className="display-star"
              key={createdAt}
              id={`display-star-${photo}`}
              style={{
                position: "absolute",
                top: 0,
                left: "50vw",
                transform: `translate(${posX}px,${posY}px)`,
              }}
            >
              <div
                className="star"
                style={{
                  fontSize: `${getStarSize(text)}`,
                }}
                onClick={onClickShowMsg.bind(null, index)}
              >
                *
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {displayName}님 행성에 {msgList.length}개의 메세지가 도착했습니다.
      </div>
      <div className="userpage-btn-container">
        {sameUser ? (
          <>
            <button className="copy-url-button" onClick={onCopyUrl} />
            <button onClick={onLogOutClick}>log out</button>
          </>
        ) : (
          <>
            <button
              className="send-msg-button"
              onClick={onClickToggleMsgModal}
            />
            <button className="mini-button" onClick={onClickSignUp}>
              내 행성 만들기
            </button>
          </>
        )}
      </div>
      <SendMsgModal
        addMsgOnList={addMsgOnList}
        isMsgModalOpened={isMsgModalOpened}
        onClickToggleMsgModal={onClickToggleMsgModal}
        uid={uid}
      />
      {displayMsgIndex !== null && (
        <MsgModal
          msgObj={msgList[displayMsgIndex]}
          closeMsgModal={closeMsgModal}
        />
      )}
      <img className="person-planet" alt="" src="img/main-icon.png" />
      <textarea id="textarea" value={url} onChange={() => {}}></textarea>
    </div>
  );
};

export default UserPage;
