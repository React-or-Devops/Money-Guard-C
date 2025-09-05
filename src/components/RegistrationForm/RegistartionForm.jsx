import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./RegistrationForm.module.css";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email("Geçersiz email").required("Email gerekli"),
  password: yup.string().required("Şifre gerekli"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifreler eşleşmiyor"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [strength, setStrength] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    try {
      await dispatch(
        registerUser({ email: data.email, password: data.password })
      ).unwrap();
      nav("/login");
    } catch (err) {
      console.error("Kayıt başarısız", err);
    }
  };

  const calculateStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
    return score;
  };

  if (passwordValue && strength !== calculateStrength(passwordValue)) {
    setStrength(calculateStrength(passwordValue));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        Email
        <input className={styles.input} {...register("email")} />
        <div className={styles.underline}></div>
        <p className={styles.err}>{errors.email?.message}</p>
      </label>

      <label className={styles.label}>
        Password
        <input
          type="password"
          className={styles.input}
          {...register("password")}
        />
        <div className={styles.underline}></div>
        <p className={styles.err}>{errors.password?.message}</p>
      </label>

      <label className={styles.label}>
        Confirm Password
        <input
          type="password"
          className={styles.input}
          {...register("confirmPassword")}
        />
        <div className={styles.underline}></div>
        <p className={styles.err}>{errors.confirmPassword?.message}</p>
      </label>
      <label className={styles.label}>Password Strength</label>
      <ProgressBar value={strength} />

      <button type="submit" className={styles.primaryBtn}>
        Register
      </button>
      <Link to="/login" className={styles.secondaryBtn}>
        Back to Login
      </Link>
    </form>
  );
}
