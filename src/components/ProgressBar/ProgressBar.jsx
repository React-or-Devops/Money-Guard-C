import styles from "./ProgressBar.module.css";

export default function ProgressBar({ value }) {
  const normalized = Math.min(Math.max(value, 0), 100); // 0–100 arası

  return (
    <div className={styles.barWrap}>
      <div className={styles.barFill} style={{ width: `${normalized}%` }} />
    </div>
  );
}
