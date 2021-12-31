import React from "react";
import { useHistory } from "react-router-dom";
import "./MsgModal.css";

const MsgModal = ({ msgObj, closeMsgModal, sameUser, fromUserMsgPage }) => {
  const { photo, text, nickName, uid } = msgObj;
  const history = useHistory();
  const getStarSize = (msgText) => {
    return `${Math.min(50, msgText.length) + 20}px`;
  };
  const date = new Date();
  const closeModal = () => {
    closeMsgModal();
  };
  const onClickGoToMyTree = () => {
    if (sameUser) {
      history.push(`/user-msg/${uid}`);
    } else {
      history.push("signin");
    }
  };
  return (
    <div className="msg-wrapper" onClick={closeModal}>
      <div className="msg-container" onClick={(e) => e.stopPropagation()}>
        <div className="star-container">
          <div
            className="msg-star"
            id={`display-star-${photo}`}
            style={{
              fontSize: `${getStarSize(text)}`,
            }}
          >
            *
          </div>
        </div>
        <div className="msg-nickname">
          보낸사람: <span>{nickName}</span>
        </div>
        <div className="msg-text">
          {uid === "DVC0gxz5GyQVeR2ZxvsSbReM1ra2" || date.getFullYear() > 2021
            ? sameUser
              ? text
              : "메세지는 본인만 확인할 수 있습니다."
            : "메세지는 2022년에 전달됩니다."}
        </div>
      </div>
      {sameUser && !fromUserMsgPage && (
        <button className="mini-button" onClick={onClickGoToMyTree}>
          메세지 한눈에 확인하기
        </button>
      )}
    </div>
  );
};

export default MsgModal;
