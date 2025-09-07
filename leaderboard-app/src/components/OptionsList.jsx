// 📁 src/components/OptionsList.jsx
import React from "react";

export default function OptionsList({ options, selectedAnswer, correctAnswer, onAnswer }) {
  return (
    <div className="row g-3">
      {options.map((opt, i) => {
        let btnClass = "btn btn-outline-secondary btn-xl animate-fade w-100";

        if (selectedAnswer) {
          if (opt === correctAnswer) btnClass = "btn btn-success btn-xl animate-bounce w-100";
          else if (opt === selectedAnswer && selectedAnswer !== correctAnswer)
            btnClass = "btn btn-danger btn-xl animate-shake w-100";
          else btnClass = "btn btn-secondary btn-xl w-100 disabled";
        }

        return (
          <div className="col-12 col-md-6" key={i}>
            <button
              className={btnClass}
              onClick={() => onAnswer(opt)}
              disabled={selectedAnswer !== null}
              role="button"
            >
              {opt}
            </button>
          </div>
        );
      })}
    </div>
  );
}
