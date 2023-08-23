import Modal from "../ui/Modal";
import styles from "./ConfirmModal.module.css";
import GoldStar from "../../images/goldStar.png";
import { Button } from "../ui/Button";
import { useModalContext } from "../../context/ModalContext";
import useDiary from "../../hooks/useDiary";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function ConfirmModal({ text, type }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { closeModal } = useModalContext();
  const { removeDiaryItem } = useDiary();
  const { deleteAuthUser } = useAuthContext();
  const handleCancel = () => {
    closeModal();
  };
  const handleDelete = () => {
    if (type === "deletePost" && location.state?.diaryItem?.id) {
      removeDiaryItem.mutate(location.state.diaryItem.id);
      navigate("/diary");
    } else if (type === "deleteUser") {
      deleteAuthUser();
      navigate("/");
    }
    closeModal();
  };

  return (
    <Modal>
      <div className={styles.contentWrapper}>
        <img src={GoldStar} alt="star" className={styles.starImage} />
      </div>
      <div className={styles.buttonContainer}>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttonWrapper}>
          <Button text="취소하기" onClick={handleCancel} />
          {type === "deletePost" && (
            <Button text="삭제하기" onClick={handleDelete} />
          )}
          {type === "deleteUser" && (
            <Button text="탈퇴하기" onClick={handleDelete} />
          )}
        </div>
      </div>
    </Modal>
  );
}
