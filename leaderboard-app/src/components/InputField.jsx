import React, { useState, useImperativeHandle, forwardRef } from "react";
import styles from "./InputField.module.css";

const InputField = forwardRef(
  (
    {
      label,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      required = false,
      validate,
    },
    ref
  ) => {
    const [error, setError] = useState("");

    const runValidation = () => {
      if (validate) {
        const validationMessage = validate(value);
        setError(validationMessage);
        return validationMessage;
      }
      return "";
    };

    const handleBlur = () => {
      runValidation();
    };

    useImperativeHandle(ref, () => ({
      validate: runValidation,
    }));

    return (
      <div className={`${styles.inputGroup} ${error ? styles.errorGroup : ""}`}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        {error && (
          <span id={`${name}-error`} className={styles.errorText}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default InputField;
