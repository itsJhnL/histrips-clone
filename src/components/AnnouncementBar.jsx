import { useState } from 'react'

const messages = [
  'New: Infrared Light Panel',
  'Free Shipping On Orders Over $50',
  'Rated 4.9/5 By 3,600+ Customers',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + messages.length) % messages.length)
  const next = () => setIndex((i) => (i + 1) % messages.length)

  return (
    <div className="announcement">
      <button className="announcement__arrow" onClick={prev} aria-label="Previous announcement">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M6.5 1.5 3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span className="announcement__text">{messages[index]}</span>
      <button className="announcement__arrow" onClick={next} aria-label="Next announcement">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="m3.5 1.5 3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
