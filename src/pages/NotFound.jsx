import NotFoundImage from "../images/notFound.png";
import { Button } from "../components/ui/Button";
import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <img className={styles.image} src={NotFoundImage} alt="not found" />
      <p className={styles.text}>PAGE NOT FOUND</p>
      <Button text="홈으로 돌아가기" onClick={() => navigate("/")} />
    </section>
  );
}
