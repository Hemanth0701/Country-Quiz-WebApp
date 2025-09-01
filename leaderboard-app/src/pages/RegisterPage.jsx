import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import styles from './RegisterPage.module.css';

// Reusable InputField component
function InputField({ label, name, type, value, onChange, required, pattern, title, max, placeholder }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={styles.input}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern}
        title={title}
        max={max}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [dobMax, setDobMax] = useState("");

  useEffect(() => {
    setDobMax(new Date().toISOString().split("T")[0]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      setLoading(false);
      return;
    }
    form.classList.remove("was-validated");

    const user = { ...formData, role: "USER" };

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || res.statusText || "Registration failed.");

      if (data.token && data.userDetailsResponse) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userDetailsResponse));
        setToast({ message: "Registration successful!", error: false });

        setFormData({ username: "", email: "", password: "", phoneNumber: "", dob: "" });

        setTimeout(() => {
          window.location.href = data.userDetailsResponse.role === "ADMIN" ? "/admin" : "/game";
        }, 1500);
      } else {
        throw new Error("Invalid server response.");
      }
    } catch (err) {
      setToast({ message: err.message || "Registration failed.", error: true });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1 className={styles.title}>Create Your Account</h1>

        <form onSubmit={handleSubmit} noValidate>
          <InputField label="Username" name="username" type="text" value={formData.username} onChange={handleChange} required placeholder="Enter username" />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Enter email" />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" title="At least 8 characters, 1 uppercase, 1 number & 1 special character" placeholder="Create a password" />
          <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required pattern="^\+?[0-9]{10,15}$" title="10 to 15 digits, optional + sign" placeholder="e.g. +12345678901" />
          <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required max={dobMax} />

          <button  type="button"  className={`${styles.submitBtn} ${styles.outline}`}  onClick={() => setFormData({ username: "", email: "", password: "", phoneNumber: "", dob: "" })}>Clear</button> <br />
          <button type="button" className={`${styles.submitBtn} ${styles.outline}`} onClick={() => navigate("/")}>
                          Back
                        </button>
                        <br />
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
            Register
          </button>
        </form>
      </section>

      {toast && <Toast message={toast.message} type={toast.error ? "error" : "success"} onClose={() => setToast(null)} />}
    </main>
  );
}
