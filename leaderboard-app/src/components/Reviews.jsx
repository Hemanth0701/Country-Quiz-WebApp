import React, { useEffect, useState } from 'react'
import styles from './Reviews.module.css'

const seed = [
  { id: 'r1', name: 'Aisha', rating: 5, text: 'Super addictive! Learned so much.', date: '2025-08-20' },
  { id: 'r2', name: 'Vikram', rating: 4, text: 'Great UI and smooth gameplay.', date: '2025-08-22' },
]

export default function Reviews() {
  const [reviews, setReviews] = useState(() => {
    const raw = localStorage.getItem('reviews')
    return raw ? JSON.parse(raw) : seed
  })
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const add = (e) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setReviews(prev => [
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        rating: Number(rating),
        text: text.trim(),
        date: new Date().toISOString().slice(0, 10)
      },
      ...prev,
    ])
    setName('')
    setText('')
    setRating(5)
  }

  return (
    <section className={styles.reviews} id="reviews" aria-labelledby="reviews-title">
      <h2 id="reviews-title">Reviews</h2>

      {/* Form */}
      <form className={styles.reviewForm} onSubmit={add}>
        <input
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select
          value={rating}
          onChange={e => setRating(e.target.value)}
          aria-label="Rating"
        >
          {[5, 4, 3, 2, 1].map(n => (
            <option key={n} value={n}>
              {n}★
            </option>
          ))}
        </select>
        <textarea
          placeholder="Share your thoughts…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Post Review</button>
      </form>

      {/* Reviews */}
      <ul className={styles.reviewList}>
        {reviews.map(r => (
          <li key={r.id} className={styles.review}>
            <div className={styles.reviewHead}>
              <strong>{r.name}</strong>
              <span className={styles.rating}>{'★'.repeat(r.rating)}</span>
              <time className={styles.date}>{r.date}</time>
            </div>
            <p className={styles.reviewText}>{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
