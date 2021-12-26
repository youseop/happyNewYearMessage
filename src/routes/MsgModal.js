import React from "react";
import "./MsgModal.css";

const MsgModal = ({ msgObj, closeMsgModal }) => {
  const { photo, text, nickName } = msgObj;
  const getStarSize = (msgText) => {
    return `${Math.min(50, msgText.length) + 20}px`;
  };
  const date = new Date();
  const closeModal = () => {
    closeMsgModal();
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
          {date.getFullYear() > 2021
            ? text
            : "내용은 2022년에 확인할 수 있습니다."}
        </div>
      </div>
    </div>
  );
};

export default MsgModal;
