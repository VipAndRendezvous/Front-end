import React from "react";
import Modal from "react-modal";

interface VipInfoData {
  vipName: string;
  vipCareer: string;
  vipIntroduce: string;
  vipEvidenceUrl: string;
}

interface VipModalProps {
  modalData: VipInfoData | null;
  modalIsOpen: boolean;
  closeModal: () => void;
}

const VipInfoModal: React.FC<VipModalProps> = ({
  modalData,
  modalIsOpen,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="VIP 정보 상세"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
      }}
    >
      <h2>VIP 정보 상세</h2>
      {modalData && (
        <div>
          <p>
            <strong>이름 : </strong> {modalData.vipName}
          </p>
          <p>
            <strong>직업 : </strong> {modalData.vipCareer}
          </p>
          <p>
            <strong>소개 : </strong> {modalData.vipIntroduce}
          </p>
          <p>
            <strong>첨부 URL : </strong>
            <a href={modalData.vipEvidenceUrl} target="_blank">
              링크
            </a>
          </p>
        </div>
      )}
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};

export default VipInfoModal;
