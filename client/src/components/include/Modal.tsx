import React, { useState } from 'react';
interface IModal {
  title: string;
  children: React.ReactNode;
}

const Modal = ({ title, children }: IModal) => {
  const [modalState, setModalState] = useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);
  return (
    <>
      <button onClick={openModal}>
        {title}
      </button>
      {modalState && (
        <div className="absolute flex items-center justify-center">
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div
              className="fixed top-0 left-0 w-full bg-primary h-full opacity-50"
              onClick={closeModal}
            ></div>
            <div className="relative w-96 bg-secondary rounded-md shadow-m px-4 py-5 z-50">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Modal;
