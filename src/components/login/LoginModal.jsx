import styles from "./LoginModal.module.css";
import GithubLogo from "../../images/github-mark.svg";
import GoogleLogo from "../../images/google-logo.svg";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginModal({ closeModal }) {
  const { login } = useAuthContext();

  const handleGoogleLogin = () => {
    login();
    closeModal();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.contentWrapper}>
          <p className={styles.closeIcon} onClick={closeModal}>
            x
          </p>
          <h1>환영합니다!</h1>
        </div>
        <div className={styles.oauthContainer}>
          <p>소셜 계정으로 로그인</p>
          <button className={styles.oauthButton} onClick={handleGoogleLogin}>
            <img src={GoogleLogo} alt="GoogleLogo" className={styles.logo} />
          </button>
          <button className={styles.oauthButton}>
            <img src={GithubLogo} alt="GithubLogo" className={styles.logo} />
          </button>
        </div>
      </div>
    </div>
  );
}
