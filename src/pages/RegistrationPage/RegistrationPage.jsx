import { useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistartionForm";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage() {
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

          <div className={styles.formInner}>
            <RegistrationForm onSuccess={() => nav("/login")} />
          </div>
        </div>
      </div>
    </div>
  );
}
