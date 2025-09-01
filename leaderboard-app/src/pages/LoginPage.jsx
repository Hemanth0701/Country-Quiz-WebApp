import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import styles from './LoginPage.module.css';

export default function LoginModal({ onClose, onSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumberOrEmail: email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed due to server error.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.userDetailsResponse));
      onSuccess(data.userDetailsResponse);
      setToast({ message: "Login successful!", type: "success" });

      setTimeout(() => {
        navigate(data.userDetailsResponse.role === "ADMIN" ? "/admin" : "/game");
      }, 1200);

    } catch (err) {
      setToast({ message: err.message || "Login failed. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles['modal-overlay']} role="dialog" aria-modal="true" aria-labelledby="login-title">
        <div className={styles.modal}>
          <div className={styles['modal-header']}>
            <h3 id="login-title">Login</h3>
            <button className={styles['icon-btn']} aria-label="Close" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className={styles['modal-body']}>
            <label className={styles.field}>
              <span>Email or Phone</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com or 9876543210"
              />
            </label>

            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
              />
            </label>

            <div className={styles['modal-actions']}>
              <button type="button" className={`${styles.btn} ${styles.outline}`} onClick={() => navigate("/")}>
                Back
              </button>
              <button type="button" className={`${styles.btn} ${styles.outline}`} onClick={() => { setEmail(''); setPassword(''); }}>
                Clear
              </button>
              <button type="submit" className={`${styles.btn} ${styles.primary}`} disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </div>
          </form>

          <div className={styles['create-account']}>
            <p>Don't have an account?</p>
            <button
              className={`${styles.btn} ${styles.link}`}
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
