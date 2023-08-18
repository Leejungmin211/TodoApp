import styles from "./LoginModal.module.css";
import GithubLogo from "../../images/github-mark.svg";
import GoogleLogo from "../../images/google-logo.svg";
import noteImage from "../../images/notes.png";
import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";
import Modal from "../ui/Modal";

export default function LoginModal() {
  const { login, loginGitHub } = useAuthContext();
  const { closeModal } = useModalContext();

  const handleGoogleLogin = () => {
    login();
    closeModal();
  };

  const handleGithubLogin = () => {
    loginGitHub();
    closeModal();
  };

  return (
    <Modal>
      <div className={styles.contentWrapper}>
        <img src={noteImage} alt="notes" className={styles.notesImage} />
        <h1>DAILY PLANNER</h1>
      </div>
      <div className={styles.oauthContainer}>
        <p>소셜 계정으로 로그인</p>
        <div className={styles.oauthWrapper}>
          <button className={styles.oauthButton} onClick={handleGoogleLogin}>
            <img src={GoogleLogo} alt="GoogleLogo" className={styles.logo} />
          </button>
          <button
            className={`${styles.oauthButton} ${styles.github}`}
            onClick={handleGithubLogin}
          >
            <img src={GithubLogo} alt="GithubLogo" className={styles.logo} />
          </button>
        </div>
      </div>
    </Modal>
  );
}
