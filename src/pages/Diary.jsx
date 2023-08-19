import { useNavigate } from "react-router-dom";
import styles from "./Diary.module.css";
import DiaryImage from "../images/diary.png";
import { TbSquareRoundedPlus } from "react-icons/tb";
import PhotoDiary from "../components/Diary/PhotoDiary";

export default function Diary() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img src={DiaryImage} alt="diary" className={styles.diaryImage} />
          <h1>PHOTO DIARY</h1>
        </div>
        <TbSquareRoundedPlus
          className={styles.plusIcon}
          onClick={() => navigate("/diary/new")}
        />
      </div>
      <PhotoDiary />
      {/* <p>이미지로 남기는 나만의 하루</p> */}
    </section>
  );
}
