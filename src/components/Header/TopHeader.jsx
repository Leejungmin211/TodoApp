import { Link } from "react-router-dom";
import styles from "./TopHeader.module.css";

export default function TopHeader() {
  return (
    <header className={styles.header}>
      <Link to="/">DAILY PLANNER</Link>
      <div>
        <Link to="/">Todo</Link>
        <Link to="/mypage">Mypage</Link>
      </div>
    </header>
  );
}
