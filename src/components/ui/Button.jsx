import styles from "./Button.module.css";

export default function button({ text }) {
  return <button className={styles.button}>{text}</button>;
}
