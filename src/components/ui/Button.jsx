import styles from "./Button.module.css";

export function Button({ text }) {
  return <button className={styles.button}>{text}</button>;
}

export function TextButton({ text }) {
  return <button className={styles.textButton}>{text}</button>;
}
