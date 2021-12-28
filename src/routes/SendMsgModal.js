import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { dbService } from "../fbase";
import "./SendMsgModal.css";

const MsgModal = ({
  isMsgModalOpened,
  onClickToggleMsgModal,
  uid,
  addMsgOnList,
  showInduceModal,
}) => {
  const [nickName, setNickName] = useState("");
  const [msgText, setMsgText] = useState("");
  const [selectedStarIndex, setSelectedStarIndex] = useState(0);
  const history = useHistory();

  const onClickGoToHome = () => {
    history.push("/");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const msgObj = {
      uid: uid,
      nickName: nickName,
      text: msgText,
      photo: selectedStarIndex,
      posX: 18 * Math.floor(Math.random() * 21) - 200,
      posY: 22 * Math.floor(Math.random() * 21) + 50,
      createdAt: Date.now(),
    };
    await dbService.collection("message").add(msgObj);
    setMsgText("");
    setNickName("");
    addMsgOnList(msgObj);
    onClickToggleMsgModal();
    const isUserSawInduceModal = localStorage.getItem("sawInduceModal");
    if (isUserSawInduceModal !== "true") {
      showInduceModal();
    }
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
    if (value.length < 10) setNickName(value);
  };

  const onClickSelectStar = (index) => {
    setSelectedStarIndex(index);
  };

  const getStarSize = () => {
    return `${Math.min(75, msgText.length / 2 + 15)}px`;
  };

  return (
    <div
      className={`msgmodal-wrapper ${isMsgModalOpened ? "opened" : "closed"}`}
    >
      <div
        className="msgmodal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="btn-container">
          <button onClick={onClickGoToHome}>메인화면</button>
          <button onClick={onClickToggleMsgModal}>뒤로</button>
        </div>

        <form className="msg-form" onSubmit={onSubmit}>
          <span className="input-text">보내는 사람</span>
          <input
            type="text"
            placeholder=""
            maxLength={20}
            onChange={onChangeNickName}
            required
            value={nickName}
          />
          <span className="input-text">남길 메세지</span>
          <textarea
            type="text"
            placeholder="글자 수에 따라 별이 커집니다."
            maxLength={200}
            onChange={onChangeMsgText}
            required
            value={msgText}
          />
          <div className="msglen-counter">{`${msgText.length}/200`}</div>

          <span className="input-text selectstar">별 고르기</span>
          <div className="select-star-container">
            {[0, 1, 2, 3, 4].map((starIndex) => {
              return (
                <div
                  id={`star-${starIndex}`}
                  className="star-container"
                  key={starIndex}
                >
                  <span
                    className="star"
                    onClick={() => {
                      onClickSelectStar(starIndex);
                    }}
                    style={{
                      fontSize: `${getStarSize()}`,
                    }}
                  >
                    *
                  </span>
                  <div
                    className={`${
                      starIndex === selectedStarIndex ? "display" : "hidden"
                    }`}
                  >
                    <img className="star-img" alt="" src="img/arrow.png" />
                  </div>
                </div>
              );
            })}
          </div>
          <input className="submit-button" type="submit" value="" />
        </form>
      </div>
    </div>
  );
};

export default MsgModal;
