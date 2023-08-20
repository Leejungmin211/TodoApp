import { useNavigate } from "react-router-dom";
import { sliceDateSubstring } from "../../util/date";
import styles from "./DiaryCard.module.css";

export default function DiaryCard({
  diaryItem,
  diaryItem: { id, url, title, date },
}) {
  const navigate = useNavigate();
  const sliceDate = date && sliceDateSubstring(date);

  return (
    <>
      {diaryItem && (
        <li
          className={styles.li}
          onClick={() => navigate(`/diary/${id}`, { state: { diaryItem } })}
        >
          <img className={styles.image} src={url} alt={title} />
          {date && <p className={styles.date}>{sliceDate}</p>}
        </li>
      )}
    </>
  );
}
