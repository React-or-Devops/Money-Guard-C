import { Link, useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistartionForm";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  const nav = useNavigate();
  return (
    <div className={styles.page}>
      <h1>Register</h1>
      <RegistrationForm onSuccess={() => nav("/login")} />
      <Link to="/login">Log in</Link>
    </div>
  );
}
