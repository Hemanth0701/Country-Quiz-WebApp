import React from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.css"

export default function Header({ user, onLogout }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Leaderboard App</h1>
      {user ? (
        <button className={styles.button} onClick={onLogout}>
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className={styles.button}>Login</button>
        </Link>
      )}
    </header>
  )
}
