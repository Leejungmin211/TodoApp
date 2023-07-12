import { Link } from "react-router-dom";
import styles from "./TopHeader.module.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Moon } from "../../images/moon.svg";
import { ReactComponent as Sun } from "../../images/sun.svg";
import { useDarkMode } from "../../context/DarkModeContext";

export default function TopHeader() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo className={styles.logo} />
      </Link>
      <div>
        <Link to="/" className={styles.list}>
          CALENDAR
        </Link>
        <Link to="/" className={styles.list}>
          TODO LIST
        </Link>
        <Link to="/mypage" className={styles.list}>
          ABOUT ME
        </Link>
      </div>
      <button className={styles.button} onClick={toggleDarkMode}>
        {!darkMode && <Moon className={styles.image} />}
        {darkMode && <Sun className={styles.image} />}
      </button>
    </header>
  );
}
