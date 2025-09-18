import { useState, useEffect } from "react";

export function useAuth() {
  const [auth, setAuth] = useState({ role: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuth({
          role: user.role, // 👈 must match backend role property
          user,
        });
      } catch (err) {
        console.error("Invalid user object in localStorage", err);
      }
    }
  }, []);

  return auth;
}
