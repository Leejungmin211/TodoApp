import MyProfile from "../components/MyProfile/MyProfile";
import styles from "./MyPage.module.css";

export default function MyPage() {
  return (
    <div className={styles.container}>
      <MyProfile />
    </div>
  );
}
