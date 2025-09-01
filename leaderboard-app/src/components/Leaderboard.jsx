import React from 'react'
import styles from './Leaderboard.module.css'

export default function Leaderboard({ title, items, loading }) {
  return (
    <article className={styles.board}>
      <h3 className={styles.boardTitle}>{title}</h3>
      {loading ? (
        <div className={styles.loading}>Loading…</div>
      ) : (
        <ol className={styles.boardList}>
          {items.map((row, idx) => (
            <li key={row.id} className={styles.row}>
              <span className={styles.rank}>{idx + 1}</span>
              <span className={styles.name} title={row.name}>
                {row.name}
              </span>
              <span className={styles.score}>{row.score}</span>
            </li>
          ))}
          {items.length === 0 && (
            <li className={styles.empty}>No scores yet.</li>
          )}
        </ol>
      )}
    </article>
  )
}
