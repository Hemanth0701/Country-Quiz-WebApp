// D:\CountryQuizWebApp\QuizApp_frontend\leaderboard-app\src\components\StartSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StartSection.module.css";

export default function StartSection({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStartGame = async () => {
    const token = localStorage.getItem("token");

    // if (!token) {
    //   // Redirect to login if not logged in
    //   navigate("/login");
    //   return;
    // }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/getCountries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errMsg = `Failed to start game: ${response.status} ${response.statusText}`;
        throw new Error(errMsg);
      }

      const data = await response.json(); // data is an array
      console.log("Game data array:", data);

      // Navigate to GamePage and pass the array
      navigate("/game", { state: { gameData: data } });
    } catch (err) {
      console.error("Error starting game:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.start} aria-labelledby="start-title">
      <h2 id="start-title" className={styles.title}>Ready to Play?</h2>
      <p className={styles.muted}>Test your country knowledge and climb the leaderboard.</p>

      <button
        className={styles.button}
        onClick={handleStartGame}
        disabled={loading}
      >
        {loading ? "Starting..." : "Start Game"}
      </button>

      {!user && <p className={styles.note}>Tip: Login first to save your score.</p>}

      {error && <p className={styles.error}>Error: {error}</p>}
    </section>
  );
}
