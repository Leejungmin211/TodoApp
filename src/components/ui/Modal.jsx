import { useModalContext } from "../../context/ModalContext";
import styles from "./Modal.module.css";

export default function Modal({ children }) {
  const { closeModal } = useModalContext();

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.closeIcon} onClick={closeModal}>
          x
        </span>
        {children}
      </div>
    </div>
  );
}
