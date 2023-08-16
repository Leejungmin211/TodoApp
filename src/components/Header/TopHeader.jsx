import { Link } from "react-router-dom";
import styles from "./TopHeader.module.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Moon } from "../../images/moon.svg";
import { ReactComponent as Sun } from "../../images/sun.svg";
import { useDarkMode } from "../../context/DarkModeContext";
import { useState } from "react";
import LoginModal from "../login/LoginModal";
import { useAuthContext } from "../../context/AuthContext";

export default function TopHeader() {
  const { user, logout } = useAuthContext();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

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
      <div className={styles.buttonWrapper}>
        {!user && (
          <button className={styles.loginButton} onClick={handleOpenModal}>
            LOGIN
          </button>
        )}
        {user && (
          <button className={styles.loginButton} onClick={logout}>
            LOGOUT
          </button>
        )}
        <button className={styles.button} onClick={toggleDarkMode}>
          {!darkMode && <Moon className={styles.image} />}
          {darkMode && <Sun className={styles.image} />}
        </button>
      </div>
      {loginModalOpen && <LoginModal closeModal={handleCloseModal} />}
    </header>
  );
}
