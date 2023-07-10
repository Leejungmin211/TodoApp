import { Outlet } from "react-router-dom";
import TopHeader from "../components/Header/TopHeader";
import styles from "./Root.module.css";

export default function Root() {
  return (
    <>
      <div className={styles.header}>
        <TopHeader />
      </div>
      <div className={styles.bodywrapper}>
        <Outlet />
      </div>
    </>
  );
}
