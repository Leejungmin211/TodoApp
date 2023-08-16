import { Outlet } from "react-router-dom";
import TopHeader from "../components/Header/TopHeader";
import { AuthContextProvider } from "../context/AuthContext";
import styles from "./Root.module.css";

export default function Root() {
  return (
    <AuthContextProvider>
      <div className={styles.header}>
        <TopHeader />
      </div>
      <div className={styles.bodywrapper}>
        <Outlet />
      </div>
    </AuthContextProvider>
  );
}
