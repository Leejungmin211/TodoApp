import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DiaryDetail.module.css";
import { ArrowButton } from "../components/ui/Button";

export default function DiaryDetail() {
  const navigate = useNavigate();
  const {
    state: {
      diaryItem: { title, date, mood, url, content },
    },
  } = useLocation();

  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div>
            <div className={styles.imageContainer}>
              {url && (
                <>
                  <img className={styles.urlImage} src={url} alt="url"/>
                </>
              )}
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <h1 className={styles.h1}>{title}</h1>
            <div>
              <p className={styles.dateText}>{date}</p>
              <p className={styles.contentText}>오늘의 기분은?</p>
              <p className={styles.contentText}>{mood}</p>
            </div>
            <p className={styles.contentText}>{content}</p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div>
            <ArrowButton
              text="이전페이지로 돌아가기"
              onClick={() => navigate("/diary")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
