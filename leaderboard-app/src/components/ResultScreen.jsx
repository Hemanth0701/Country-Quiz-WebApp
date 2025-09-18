// 📁 src/components/ResultScreen.jsx
// import React, { useEffect } from "react";
// import { saveQuizResult } from "../api/resultsApi";

export default function ResultScreen({ score, total, navigate }) {
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !token) return;

//     saveQuizResult(token, user, score)
//       .then(() => console.log("Result saved successfully"))
//       .catch((err) => console.error("Error saving result:", err));
//   }, [score, total]);

  return (
    <div className="container result animate-fade">
      <h2>Quiz Completed 🎉</h2>
      <p>
        Your Score: <span className="text-primary">{score}</span> / {total}
      </p>
      <button onClick={() => navigate("/")} className="next-btn">
        Back to Home
      </button>
    </div>
  );
}
