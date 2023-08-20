import styles from "./Button.module.css";
import { FaArrowLeft } from "react-icons/fa";

export function Button({ text, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export function TextButton({ text, onClick }) {
  return (
    <button className={styles.textButton} onClick={onClick}>
      {text}
    </button>
  );
}

export function ArrowButton({ text, onClick }) {
  return (
    <span className={styles.cancel} onClick={onClick}>
      <FaArrowLeft />
      <button className={styles.textButton}>{text}</button>
    </span>
  );
}
