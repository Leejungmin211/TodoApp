import useDiary from "../../hooks/useDiary";
import DiaryCard from "../DiaryCard/DiaryCard";
import styles from "./PhotoDiary.module.css";

export default function PhotoDiary() {
  const {
    diaryQuery: { data: diary },
  } = useDiary();
  console.log(diary);

  return (
    <section className={styles.section}>
      <ul className={styles.ul}>
        {diary &&
          diary.map((diaryItem) => (
            <DiaryCard key={diaryItem.id} diaryItem={diaryItem} />
          ))}
      </ul>
    </section>
  );
}
