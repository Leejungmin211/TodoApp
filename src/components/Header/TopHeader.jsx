import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./TopHeader.module.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Moon } from "../../images/moon.svg";
import { ReactComponent as Sun } from "../../images/sun.svg";
import { useDarkMode } from "../../context/DarkModeContext";
import { useAuthContext } from "../../context/AuthContext";
import { useModalContext, ModalTypes } from "../../context/ModalContext";
import LoginModal from "../login/LoginModal";
import { Button } from "../../components/ui/Button";

export default function TopHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { modalState, openModal } = useModalContext();
  const activeStyle = {
    color: "var(--color-accent)",
  };

  const handleLogin = () => {
    openModal(ModalTypes.LOGIN);
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.link}>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>
        <NavLink
          to="/"
          className={styles.list}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          TODO
        </NavLink>
        <NavLink
          to="/diary"
          className={styles.list}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          DIARY
        </NavLink>
      </div>
      <div className={styles.buttonWrapper}>
        {!user && <Button text="LOGIN" onClick={handleLogin} />}
        {user && <Button text="LOGOUT" onClick={handleLogout} />}
        <button className={styles.button} onClick={toggleDarkMode}>
          {!darkMode && <Moon className={styles.image} />}
          {darkMode && <Sun className={styles.image} />}
        </button>
      </div>
      {modalState.type === ModalTypes.LOGIN && !user && <LoginModal />}
    </header>
  );
}
