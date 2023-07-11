import { Link } from "react-router-dom";
import styles from "./TopHeader.module.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
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
        {!darkMode && "다크모드"}
        {darkMode && "라이트모드"}
      </button>
    </header>
  );
}
