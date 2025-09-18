import React from "react"
import styles from "./Leaderboard.module.css"

export default function Leaderboard({ title, items, loading }) {
  return (
    <section className={styles.board}>
      <h3 className={styles.boardTitle}>{title}</h3>

      {loading ? (
        <div className={styles.loading}>Loading…</div>
      ) : (
        <div className={styles.boardContainer}>
          {items.length > 0 ? (
            items.map((row, idx) => (
              <article key={row.id} className={styles.row}>
                {/* Left side (rank + name) */}
                <div className={styles.left}>
                  <span className={styles.rank}>{idx + 1}</span>
                  <span className={styles.name} title={row.name}>
                    {row.name}
                  </span>
                </div>

                {/* Right side (score) */}
                <div className={styles.right}>
                  <span className={styles.score}>{row.score}</span>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.empty}>No scores yet.</div>
          )}
        </div>
      )}
    </section>
  )
}
