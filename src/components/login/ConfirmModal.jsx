import Modal from "../ui/Modal";
import styles from "./ConfirmModal.module.css";
import GoldStar from "../../images/goldStar.png";
import { Button } from "../ui/Button";
import { useModalContext } from "../../context/ModalContext";
import useDiary from "../../hooks/useDiary";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmModal() {
  const {
    state: {
      diaryItem: { id },
    },
  } = useLocation();
  const navigate = useNavigate();
  const { closeModal } = useModalContext();
  const { removeDiaryItem } = useDiary();
  const handleCancel = () => {
    closeModal();
  };
  const handleDelete = () => {
    removeDiaryItem.mutate(id);
    closeModal();
    navigate("/diary");
  };

  return (
    <Modal>
      <div className={styles.contentWrapper}>
        <img src={GoldStar} alt="star" className={styles.starImage} />
      </div>
      <div className={styles.buttonContainer}>
        <p className={styles.text}>게시물을 정말로 삭제하시겠습니까?</p>
        <div className={styles.buttonWrapper}>
          <Button text="취소하기" onClick={handleCancel} />
          <Button text="삭제하기" onClick={handleDelete} />
        </div>
      </div>
    </Modal>
  );
}
