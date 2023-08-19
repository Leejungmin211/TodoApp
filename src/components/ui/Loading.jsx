import LoadingIcon from "../../images/loading.gif";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <img src={LoadingIcon} alt="loading" />
    </div>
  );
}
