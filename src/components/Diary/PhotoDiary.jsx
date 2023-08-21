import useDiary from "../../hooks/useDiary";
import DiaryCard from "../DiaryCard/DiaryCard";
import styles from "./PhotoDiary.module.css";
import Board from "../../images/board.png";

export default function PhotoDiary() {
  const {
    diaryQuery: { data: diary },
  } = useDiary();

  return (
    <section className={styles.section}>
      <ul className={styles.ul}>
        {(!diary || diary.length === 0) && (
          <div className={styles.imageContainer}>
            <img src={Board} alt="board" className={styles.boardImage} />
            <p className={styles.boardText}>
              하루를 사진으로 기록하는 나만의 공간
            </p>
            <p className={styles.boardText}>특별한 순간을 함께 만들어보세요.</p>
          </div>
        )}
        {diary &&
          diary.map((diaryItem) => (
            <DiaryCard key={diaryItem.id} diaryItem={diaryItem} />
          ))}
      </ul>
    </section>
  );
}
