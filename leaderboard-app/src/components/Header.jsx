import React from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import logo from "../assets/Images/logo/Tenjiku infotech.png" 

export default function Header({ user, onLogout }) {
  return (
    <header className={styles.header}>
  <div className={styles.left}>
    <img src={logo} alt="TenjikuGames" className={styles.logo} />
    <h1 className={styles.title}>WorldQuiz</h1>
  </div>

  <div className={styles.right}>
    {user ? (
      <button className={styles.button} onClick={onLogout}>
        Logout
      </button>
    ) : (
      <Link to="/login">
        <button className={styles.button}>Login</button>
      </Link>
    )}
  </div>
</header>

  )
}
