import { IModal } from '../../typescript/includeTypes'
import { useState } from 'react';

const Modal = ({ clickable, children, className }: IModal) => {
  const [modalState, setModalState] = useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);
  return (
    <>
      <button className={className} onClick={openModal}>
        {clickable}
      </button>
      {modalState && (
        <div className="absolute flex items-center justify-center">
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div
              className="fixed top-0 left-0 w-full bg-primary h-full opacity-50"
              onClick={closeModal}
            ></div>
            <div className="relative w-96 sm:w-[26rem] bg-secondary text-primary rounded-md shadow-m z-50">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Modal;
