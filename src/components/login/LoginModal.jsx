import styles from "./LoginModal.module.css";
import GithubLogo from "../../images/github-mark.svg";
import GoogleLogo from "../../images/google-logo.svg";
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
        <h1>환영합니다!</h1>
      </div>
      <div className={styles.oauthContainer}>
        <p>소셜 계정으로 로그인</p>
        <button className={styles.oauthButton} onClick={handleGoogleLogin}>
          <img src={GoogleLogo} alt="GoogleLogo" className={styles.logo} />
        </button>
        <button className={styles.oauthButton} onClick={handleGithubLogin}>
          <img src={GithubLogo} alt="GithubLogo" className={styles.logo} />
        </button>
      </div>
    </Modal>
  );
}
