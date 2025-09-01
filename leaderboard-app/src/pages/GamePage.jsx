// 📁 src/pages/GamePage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateQuizzes } from "../utils/quizGenerator";
import "./GamePage.css";

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const gameData = location.state?.gameData;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!gameData) {
      navigate("/"); 
      return;
    }
    const quiz = generateQuizzes(gameData);
    setQuestions(quiz);
  }, [gameData, navigate]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  if (!questions.length) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="container result animate-fade">
        <h2>Quiz Completed 🎉</h2>
        <p>Your Score: <span className="text-primary">{score}</span> / {questions.length}</p>
        <button onClick={() => navigate("/")} className="next-btn"> Back to Home </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  //  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4 mx-auto animate-fade d-flex justify-content-between align-items-center" >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="progress flex-grow-1 me-3" >
            {/* <div className="progress-bar bg-primary progress-animated" role="progressbar" style={{  height: "30px" }} aria-valuenow={currentIndex + 1} aria-valuemin="0" aria-valuemax={questions.length} /> */}
            <h2> Question {currentIndex + 1} of {questions.length} </h2>
            {/* <div className="progress-bar bg-primary progress-animated" role="progressbar" style={{ width: `${progressPercent}%`, height: "30px" }} aria-valuenow={currentIndex + 1} aria-valuemin="0" aria-valuemax={questions.length} /> */}
          </div>
          <div className="fw-bold h2">
            <h2>Score: {score}</h2></div>
        </div>

        <h1 className="mb-4">{currentQ.question}</h1>

        {currentQ.flag && (
          <div className="text-center mb-4">
            <img
              src={currentQ.flag}
              alt="Country flag"
              className="img-fluid rounded shadow mb-3 animate-fade"
              style={{ maxHeight: "150px" }}
            />
          </div>
        )}

        <div className="row g-3">
          {currentQ.options.map((opt, i) => {
            let btnClass = "btn btn-outline-secondary btn-xl animate-fade w-100";

            if (selectedAnswer) {
              if (opt === currentQ.answer) btnClass = "btn btn-success btn-xl animate-bounce w-100";
              else if (opt === selectedAnswer && selectedAnswer !== currentQ.answer) btnClass = "btn btn-danger btn-xl animate-shake w-100";
              else btnClass = "btn btn-secondary btn-xl w-100 disabled";
            }

            return (
              <div className="col-12 col-md-6" key={i}>
                <button
                  className={btnClass}
                  onClick={() => handleAnswer(opt)}
                  disabled={selectedAnswer !== null}
                  role="button"
                >
                  {opt}
                </button>
              </div>
            );
          })}
        </div>

        {selectedAnswer && (
          <div className="d-grid mt-4">
            <button className="next-btn animate-fade" onClick={handleNext}>
              {currentIndex + 1 < questions.length ? "Next Question" : "View Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
