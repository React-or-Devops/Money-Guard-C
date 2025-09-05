import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
});

export default function LoginForm({ onSuccess }) {
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (v) => {
    setErr("");
    try {
      const res = await api.post("/auth/sign-in", {
        email: v.email,
        password: v.password,
      });
      const tok = res.data?.token || res.data?.accessToken;
      dispatch(setToken(tok));
      onSuccess();
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      <label className={styles.label}>E-mail</label>
      <input className={styles.input} type="email" {...register("email")} />
      <div className={styles.underline} />
      <p className={styles.err}>{errors.email?.message}</p>

      <label className={styles.label}>Password</label>
      <input
        className={styles.input}
        type="password"
        {...register("password")}
      />
      <div className={styles.underline} />
      <p className={styles.err}>{errors.password?.message}</p>

      <button type="submit" className={styles.primaryBtn}>
        Log in
      </button>
      <button
        type="button"
        className={styles.secondaryBtn}
        onClick={() => nav("/register")}
      >
        Register
      </button>

      {err && <p className={styles.err}>{err}</p>}
    </form>
  );
}
