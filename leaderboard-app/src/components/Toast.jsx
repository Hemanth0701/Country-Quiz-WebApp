import React, { useEffect } from "react";
import './Toast.css';

export default function Toast({ message, type = "success", duration = 4000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`toast ${type}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
      <button
        type="button"
        className="toast-close"
        aria-label="Close"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
}
