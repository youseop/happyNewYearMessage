import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import MsgModal from "./MsgModal";
import "./UserMsgPage.css";

const UserMsgPage = ({ match }) => {
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [displayMsgIndex, setDisplayMsgIndex] = useState(null);
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
    if (!(authService.currentUser && uid === authService.currentUser.uid)) {
      alert("메세지는 본인만 확인할 수 있습니다. 로그인 후 다시 시도해주세요.");
      history.push("/");
    }
  }, []);

  const onClickGoToHome = () => {
    history.push("/");
  };
  const onClickGoBack = () => {
    history.goBack();
  };

  const showMsgModal = (index) => {
    setDisplayMsgIndex(index);
  };

  const closeMsgModal = () => {
    setDisplayMsgIndex(null);
  };
  console.log(displayMsgIndex);
  return (
    <div className="usermsg-container">
      <div className="btn-container">
        <button onClick={onClickGoToHome}>메인화면</button>
        <button onClick={onClickGoBack}>뒤로</button>
      </div>
      <div className="title">
        {displayName}님에게 {msgList.length}개의 메세지가 도착했습니다.
      </div>
      <div className="msglist-container">
        <div className="description">
          <div className="sender">보낸사람</div>
          <div className="text">메세지</div>
        </div>
        <div className="msg-list">
          {msgList.map((msgObj, index) => {
            const { createdAt, nickName, text } = msgObj;
            return (
              <div
                key={createdAt}
                onClick={() => {
                  showMsgModal(index);
                }}
                className="msg"
              >
                <div className="sender">
                  {nickName.length > 4
                    ? `${nickName.slice(0, 4)}...`
                    : nickName}
                </div>
                <div className="text">
                  {text.length > 11 ? `${text.slice(0, 11)}...` : text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {displayMsgIndex !== null && (
        <MsgModal
          msgObj={msgList[displayMsgIndex]}
          closeMsgModal={closeMsgModal}
          sameUser={true}
          fromUserMsgPage={true}
        />
      )}
    </div>
  );
};

export default UserMsgPage;
