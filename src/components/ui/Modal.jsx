import { useModalContext, ModalTypes } from "../../context/ModalContext";
import styles from "./Modal.module.css";
import { BsX } from "react-icons/bs";

export default function Modal({ children }) {
  const { modalState, closeModal } = useModalContext();

  const handleCloseModal = () => {
    if (modalState.type === ModalTypes.LOGIN) {
      closeModal();
    } else if (modalState.type === ModalTypes.CONFIRM) {
      closeModal();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleCloseModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.closeIcon} onClick={handleCloseModal}>
          <BsX />
        </span>
        {children}
      </div>
    </div>
  );
}
