import { useEffect, useState } from 'react'

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  // reset zoom when the slide changes
  useEffect(() => setZoomed(false), [active])

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="gallery">
      <div className={`gallery__main${zoomed ? ' gallery__main--zoomed' : ''}`}>
        <img
          src={images[active].src}
          alt={images[active].alt}
          className="gallery__image"
          onClick={() => setZoomed((z) => !z)}
        />

        <button className="gallery__nav gallery__nav--prev" onClick={prev} aria-label="Previous image">
          <svg width="14" height="14" viewBox="0 0 10 10" fill="none"><path d="M6.5 1.5 3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="gallery__nav gallery__nav--next" onClick={next} aria-label="Next image">
          <svg width="14" height="14" viewBox="0 0 10 10" fill="none"><path d="m3.5 1.5 3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <button className="gallery__zoom" aria-label={zoomed ? 'Zoom out' : 'Zoom in'} onClick={() => setZoomed((z) => !z)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            {zoomed ? (
              <path d="m20 20-3.5-3.5M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="m20 20-3.5-3.5M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>

        <span className="gallery__counter">{active + 1} / {images.length}</span>
      </div>

      <div className="gallery__thumbs">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className={`gallery__thumb${i === active ? ' gallery__thumb--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active}
          >
            <img src={img.thumb} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}
