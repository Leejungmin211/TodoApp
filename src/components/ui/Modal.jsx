import { useModalContext } from "../../context/ModalContext";
import styles from "./Modal.module.css";
import { BsX } from "react-icons/bs";

export default function Modal({ children }) {
  const { closeModal } = useModalContext();

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.closeIcon} onClick={closeModal}>
          <BsX />
        </span>
        {children}
      </div>
    </div>
  );
}
