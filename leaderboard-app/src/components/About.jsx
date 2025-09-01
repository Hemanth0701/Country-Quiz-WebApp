import React from 'react'
import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <h2 id="about-title" className={styles.title}>About</h2>
      <p className={styles.text}>
        Country Quiz is a fast, fun trivia game about capitals, flags, and geography.
        Earn points for each correct answer and compete with players worldwide.
      </p>
      <ul className={styles.list}>
        <li>Short, rapid-fire questions</li>
        <li>Adaptive difficulty to keep things exciting</li>
        <li>Daily leaderboard resets at midnight</li>
      </ul>
    </section>
  )
}
