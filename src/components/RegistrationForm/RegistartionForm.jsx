import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/axios";
import { useState } from "react";
import styles from "./RegistrationForm.module.css";

const schema = yup.object({
  username: yup.string().min(1).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")])
    .required(),
});

export default function RegistrationForm({ onSuccess }) {
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const pwd = watch("password") || "";

  const score = Math.min(
    100,
    (pwd.length / 12) * 60 + /[0-9]/.test(pwd) * 20 + /[A-Z]/.test(pwd) * 20
  );

  const submit = async (v) => {
    setErr("");
    try {
      await api.post("/auth/sign-up", {
        username: v.username,
        email: v.email,
        password: v.password,
      });
      onSuccess();
    } catch (e) {
      setErr(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      <input placeholder="Username" {...register("username")} />
      <p>{errors.username?.message}</p>

      <input placeholder="Email" type="email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <input placeholder="Password" type="password" {...register("password")} />
      <p>{errors.password?.message}</p>

      <input
        placeholder="Confirm password"
        type="password"
        {...register("confirm")}
      />
      <p>{errors.confirm?.message}</p>

      <div className={styles.progress}>
        <div style={{ width: `${score}%` }} />
      </div>

      <button type="submit">Register</button>
      {err && <p className={styles.error}>{err}</p>}
    </form>
  );
}
