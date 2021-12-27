import React from "react";
import "./InduceModal.css";

const InduceModal = ({ onClickSignUp, closeInduceModal }) => {
  return (
    <div className="inducemodal-wrapper" onClick={closeInduceModal}>
      <div className="inducemodal-container">
        <div className="iducemodal-text-container">
          <div className="iducemodal-text">
            메세지가 성공적으로 전달되었습니다!
          </div>
          나만의 행성을 만들고 <br />
          친구들로부터 메세지를 받아보세요.
        </div>

        <button
          className="main-button"
          onClick={(e) => {
            onClickSignUp();
            e.preventDefault();
          }}
        />
        <div className="iducemodal-close-btn">닫기</div>
      </div>
    </div>
  );
};

export default InduceModal;
