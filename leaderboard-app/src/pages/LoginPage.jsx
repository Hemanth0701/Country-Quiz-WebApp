// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Toast from "../components/Toast";
// import styles from './LoginPage.module.css';

// export default function LoginModal({ onClose, onSuccess }) {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setToast(null);

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumberOrEmail: email, password }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Login failed due to server error.");
//       }

//       const data = await response.json();
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.userDetailsResponse));
//       onSuccess(data.userDetailsResponse);
//       setToast({ message: "Login successful!", type: "success" });

//       setTimeout(() => {
//         navigate(data.userDetailsResponse.role === "ADMIN" ? "/admin" : "/game");
//       }, 1200);

//     } catch (err) {
//       setToast({ message: err.message || "Login failed. Try again.", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className={styles['modal-overlay']} role="dialog" aria-modal="true" aria-labelledby="login-title">
//         <div className={styles.modal}>
//           <div className={styles['modal-header']}>
//             <h3 id="login-title">Login</h3>
//             <button className={styles['icon-btn']} aria-label="Close" onClick={onClose}>×</button>
//           </div>

//           <form onSubmit={handleSubmit} className={styles['modal-body']}>
            
//             <label className={styles.field}>
//               <span>Email or Phone</span>
//               <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com or 9876543210" />
//             </label>

//             <label className={styles.field}>
//               <span>Password</span>
//               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="••••••••" />
//             </label>

//             <div className={styles['modal-actions']}>
//               <button type="button" className={`${styles.btn} ${styles.outline}`} onClick={() => navigate("/")}> Back </button>
//               <button type="button" className={`${styles.btn} ${styles.outline}`} onClick={() => { setEmail(''); setPassword(''); }}> Clear </button>
//               <button type="submit" className={`${styles.btn} ${styles.primary}`} disabled={loading}>  {loading ? "Signing in…" : "Sign in"} </button>
//             </div>

//           </form>

//           <div className={styles['create-account']}>
//             <p>Don't have an account?</p>
//             <button className={`${styles.btn} ${styles.link}`} onClick={() => navigate("/register")} > Create Account </button>
//           </div>
//         </div>
//       </div>

//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </>
//   );
// }

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import Toast from "../components/Toast";
// // import styles from "./LoginPage.module.css";

// // export default function LoginModal({ onClose }) {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [toast, setToast] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setToast(null);

// //     try {
// //       const response = await fetch("http://localhost:8080/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ phoneNumberOrEmail: email, password }),
// //       });

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(errorText || "Login failed due to server error.");
// //       }

// //       const data = await response.json();
// //       login(data.userDetailsResponse, data.token);

// //       setToast({ message: "Login successful!", type: "success" });

// //       setTimeout(() => {
// //         navigate(data.userDetailsResponse.role === "ADMIN" ? "/admin" : "/dashboard");
// //       }, 1200);
// //     } catch (err) {
// //       setToast({ message: err.message || "Login failed. Try again.", type: "error" });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className={styles["modal-overlay"]} role="dialog" aria-modal="true" aria-labelledby="login-title">
// //         <div className={styles.modal}>
// //           <div className={styles["modal-header"]}>
// //             <h3 id="login-title">Login</h3>
// //             <button className={styles["icon-btn"]} aria-label="Close" onClick={onClose}>×</button>
// //           </div>

// //           <form onSubmit={handleSubmit} className={styles["modal-body"]}>
// //             <label className={styles.field}>
// //               <span>Email or Phone</span>
// //               <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
// //             </label>

// //             <label className={styles.field}>
// //               <span>Password</span>
// //               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //             </label>

// //             <div className={styles["modal-actions"]}>
// //               <button type="button" className={`${styles.btn} ${styles.outline}`} onClick={() => navigate("/")}>
// //                 Back
// //               </button>
// //               <button type="button" className={`${styles.btn} ${styles.outline}`} onClick={() => { setEmail(""); setPassword(""); }}>
// //                 Clear
// //               </button>
// //               <button type="submit" className={`${styles.btn} ${styles.primary}`} disabled={loading}>
// //                 {loading ? "Signing in…" : "Sign in"}
// //               </button>
// //             </div>
// //           </form>

// //           <div className={styles["create-account"]}>
// //             <p>Don't have an account?</p>
// //             <button className={`${styles.btn} ${styles.link}`} onClick={() => navigate("/register")}>
// //               Create Account
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// //     </>
// //   );
// // }

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import Toast from "../components/Toast";
// // import { API_URL } from "../config/constants"; // ✅ import from config
// // import styles from "./LoginPage.module.css";

// // export default function LoginModal({ onClose }) {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [toast, setToast] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setToast(null);

// //     try {
// //       const response = await fetch(`${API_URL}/auth/login`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ phoneNumberOrEmail: email, password }),
// //       });

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(errorText || "Login failed due to server error.");
// //       }

// //       const data = await response.json();
// //       login(data.userDetailsResponse, data.token); // ✅ delegate to AuthContext

// //       setToast({ message: "Login successful!", type: "success" });

// //       setTimeout(() => {
// //         navigate(data.userDetailsResponse.role === "ADMIN" ? "/admin" : "/dashboard");
// //       }, 1200);
// //     } catch (err) {
// //       setToast({
// //         message: err.message || "Login failed. Try again.",
// //         type: "error",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <div
// //         className={styles["modal-overlay"]}
// //         role="dialog"
// //         aria-modal="true"
// //         aria-labelledby="login-title"
// //       >
// //         <div className={styles.modal}>
// //           <div className={styles["modal-header"]}>
// //             <h3 id="login-title">Login</h3>
// //             <button
// //               className={styles["icon-btn"]}
// //               aria-label="Close"
// //               onClick={onClose}
// //             >
// //               ×
// //             </button>
// //           </div>

// //           <form onSubmit={handleSubmit} className={styles["modal-body"]}>
// //             <label className={styles.field}>
// //               <span>Email or Phone</span>
// //               <input
// //                 type="text"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </label>

// //             <label className={styles.field}>
// //               <span>Password</span>
// //               <input
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </label>

// //             <div className={styles["modal-actions"]}>
// //               <button
// //                 type="button"
// //                 className={`${styles.btn} ${styles.outline}`}
// //                 onClick={() => navigate("/")}
// //               >
// //                 Back
// //               </button>
// //               <button
// //                 type="button"
// //                 className={`${styles.btn} ${styles.outline}`}
// //                 onClick={() => {
// //                   setEmail("");
// //                   setPassword("");
// //                 }}
// //               >
// //                 Clear
// //               </button>
// //               <button
// //                 type="submit"
// //                 className={`${styles.btn} ${styles.primary}`}
// //                 disabled={loading}
// //               >
// //                 {loading ? "Signing in…" : "Sign in"}
// //               </button>
// //             </div>
// //           </form>

// //           <div className={styles["create-account"]}>
// //             <p>Don't have an account?</p>
// //             <button
// //               className={`${styles.btn} ${styles.link}`}
// //               onClick={() => navigate("/register")}
// //             >
// //               Create Account
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {toast && (
// //         <Toast
// //           message={toast.message}
// //           type={toast.type}
// //           onClose={() => setToast(null)}
// //         />
// //       )}
// //     </>
// //   );
// // }


// new one
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import styles from "./LoginPage.module.css";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    dob: "",
  });

  const dobMax = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Logged in successfully!");
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Registered successfully!");
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`${styles.container} ${
        isSignUp ? styles.rightPanelActive : ""
      }`}
    >
      {/* Sign In Form */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form onSubmit={handleLoginSubmit}>
          <h3 className={styles.title}>Login</h3>

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

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.outline}`}
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.outline}`}
              onClick={() => {
                setEmail("");
                setPassword("");
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles.primary}`}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>
      </div>

      {/* Sign Up Form */}
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form onSubmit={handleRegisterSubmit}>
          <h3 className={styles.title}>Sign Up</h3>

          <InputField
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter username"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="At least 8 characters, 1 uppercase, 1 number & 1 special character"
            placeholder="Create a password"
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="^\+?[0-9]{10,15}$"
            title="10 to 15 digits, optional + sign"
            placeholder="e.g. +12345678901"
          />
          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
            max={dobMax}
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.outline}`}
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.outline}`}
              onClick={() =>
                setFormData({
                  username: "",
                  email: "",
                  password: "",
                  phoneNumber: "",
                  dob: "",
                })
              }
            >
              Clear
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles.primary}`}
              disabled={loading}
            >
              {loading ? "Registering…" : "Register"}
            </button>
          </div>
        </form>
      </div>

      {/* Overlay Section */}
      <div className={styles.overlayContainer}>
  <div className={styles.overlay}>
    <div className={styles.overlayPanel}>
      {isSignUp ? (
        <>
          <h2>Join us for a wonderful quiz game</h2>
          <p>Already have an account?</p>
          <button className={styles.btn} onClick={() => setIsSignUp(false)}>
            Sign In
          </button>
        </>
      ) : (
        <>
          <h2>Welcome back to the game</h2>
          <p>Don't have an account?</p>
          <button className={styles.btn} onClick={() => setIsSignUp(true)}>
            Create Account
          </button>
        </>
      )}
    </div>
  </div>
</div>

    </div>
  );
}

