// 📁 src/components/QuestionCard.jsx
import React from "react";

export default function QuestionCard({ currentQ, score, currentIndex, total }) {
  return (
    <div className="card shadow-lg p-4 mx-auto animate-fade">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Question {currentIndex + 1} of {total}</h2>
        <h2 className="fw-bold">Score: {score}</h2>
      </div>

      <h1 className="mb-4">{currentQ.question}</h1>

      {currentQ.flag && (
        <div className="text-center mb-4">
          <img
            src={currentQ.flag}
            alt="Country flag"
            className="img-fluid rounded shadow mb-3 animate-fade"
            style={{ maxHeight: "150px" }}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
