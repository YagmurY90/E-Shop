import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./login.css";
import { toast } from "react-hot-toast";


const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dummyUser = {
    email: "yagmurygt90@hotmail.com",
    password: "123456",
    name: "Yağmur"
  };

  const handleLogin = (e) => {
    e.preventDefault();
   if (email === dummyUser.email && password === dummyUser.password) {
  localStorage.setItem("isAuth", "true");
  localStorage.setItem("username", dummyUser.name); // 👈 EKLENDİ
  toast.success(t("login.success"));
  setTimeout(() => {
    window.location.href = "/";
  }, 500);
}else {
      alert(t("login.invalid"));
    }
  };

  return (
    <div className="login-container">
      <h2>{t("login.title")}</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder={t("login.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t("login.passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{t("login.button")}</button>
      </form>
    </div>
  );
};

export default Login;
