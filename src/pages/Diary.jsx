import { useNavigate } from "react-router-dom";
import styles from "./Diary.module.css";
import DiaryImage from "../images/diary.png";
import { TbSquareRoundedPlus } from "react-icons/tb";
import PhotoDiary from "../components/Diary/PhotoDiary";
import { useAuthContext } from "../context/AuthContext";
import LoginModal from "../components/login/LoginModal";
import { useModalContext, ModalTypes } from "../context/ModalContext";

export default function Diary() {
  const navigate = useNavigate();
  const { modalState, openModal } = useModalContext();
  const { user } = useAuthContext();

  const handleAddButton = () => {
    if (!user) {
      navigate("/");
      openModal(ModalTypes.LOGIN);
    } else {
      navigate("/diary/new");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img src={DiaryImage} alt="diary" className={styles.diaryImage} />
          <h1>PHOTO DIARY</h1>
        </div>
        <TbSquareRoundedPlus
          className={styles.plusIcon}
          onClick={handleAddButton}
        />
      </div>
      <PhotoDiary />
      {modalState.type === ModalTypes.LOGIN && !user && <LoginModal />}
    </section>
  );
}
