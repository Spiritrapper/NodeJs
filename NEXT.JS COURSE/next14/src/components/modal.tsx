"use client"
import { useState } from 'react';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode; // React에서 제공하는 children 속성을 사용합니다.
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  // 모달이 열려 있는지 여부를 state로 관리합니다.
  const [isOpen, setIsOpen] = useState(true);

  // 모달을 닫는 함수입니다.
  const handleClose = () => {
    setIsOpen(false);
    onClose(); // 부모 컴포넌트로 모달이 닫혔음을 알리는 콜백을 호출합니다.
  };

  // isOpen 상태에 따라 모달을 렌더링합니다.
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* 모달 내용 */}
            {children}

            {/* 닫기 버튼 */}
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;