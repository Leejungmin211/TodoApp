import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DiaryDetail.module.css";
import { ArrowButton, Button } from "../components/ui/Button";
import { sliceDateSubstring } from "../util/date";
import { useModalContext, ModalTypes } from "../context/ModalContext";
import ConfirmModal from "../components/Modal/ConfirmModal";

export default function DiaryDetail() {
  const navigate = useNavigate();
  const { modalState, openModal } = useModalContext();
  const {
    state: {
      diaryItem: { id, title, date, mood, url, content },
    },
  } = useLocation();
  const sliceDate = date && sliceDateSubstring(date);

  const handelDelete = () => {
    openModal(ModalTypes.CONFIRM);
  };

  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div>
            <div className={styles.imageContainer}>
              {url && (
                <>
                  <img className={styles.urlImage} src={url} alt="url" />
                </>
              )}
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <h1 className={styles.h1}>{title}</h1>
            <div>
              <p className={styles.dateText}>{sliceDate}</p>
              <p className={styles.moodText}>mood ? {mood}</p>
            </div>
            <p className={styles.contentText}>{content}</p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <ArrowButton
            text="다이어리 목록으로 돌아가기"
            onClick={() => navigate("/diary")}
          />
          <div className={styles.textButton}>
            <Button text="수정" onClick={() => navigate(`/diary/${id}/edit`)} />
            <Button text="삭제" onClick={handelDelete} />
          </div>
        </div>
      </div>
      {modalState.type === ModalTypes.CONFIRM && (
        <ConfirmModal
          text="게시물을 정말로 삭제하시겠습니까?"
          type="deletePost"
        />
      )}
    </section>
  );
}
