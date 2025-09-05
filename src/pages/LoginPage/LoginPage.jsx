import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const nav = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.bgImg} />
      <div className={`${styles.blob} ${styles.blobA}`} />
      <div className={`${styles.blob} ${styles.blobB}`} />
      <div className={`${styles.blob} ${styles.blobC}`} />
      <div className={`${styles.blob} ${styles.blobD}`} />
      <div className={styles.formWrap}>
        <div className={styles.formCard}>
          <div className={styles.logoWrap}>
            <h1 className={styles.logoText}>Money Guard</h1>
          </div>
          <LoginForm onSuccess={() => nav("/dashboard")} />
        </div>
      </div>
    </div>
  );
}
