import { useState } from 'react'
import { formatPrice } from '../data/product'

function Stars({ count = 5 }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="stars__star">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2.5l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.7l-6.1 3.4 1.4-6.8L2.2 9.6l6.9-.8z" />
          </svg>
        </span>
      ))}
    </span>
  )
}

export default function ProductInfo({ product, onAddToCart }) {
  const [bundleId, setBundleId] = useState(product.bundles[0].id)
  const [colors, setColors] = useState(
    product.bundles.map(() => product.colors[0].id),
  )

  const bundle = product.bundles.find((b) => b.id === bundleId)
  const discountPct = Math.round((1 - bundle.unitPrice / product.compareAtPrice) * 100)

  const setColorAt = (slot, colorId) =>
    setColors((prev) => prev.map((c, i) => (i === slot ? colorId : c)))

  const handleAdd = () =>
    onAddToCart({
      bundle,
      colors: colors.slice(0, bundle.qty),
    })

  return (
    <div className="info">
      <a
        href="#reviews"
        className="info__reviews"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <Stars count={product.rating} />
        <span>{product.reviewCount} reviews</span>
      </a>

      <h1 className="info__title">{product.title}</h1>

      <div className="info__price">
        <span className="info__price-now">{formatPrice(bundle.unitPrice)}</span>
        <span className="info__price-was">{formatPrice(product.compareAtPrice)}</span>
        <span className="badge badge--pink">{discountPct}% OFF</span>
      </div>

      <div className="bundles">
        {product.bundles.map((b, idx) => {
          const selected = b.id === bundleId
          return (
            <div key={b.id} className={`bundle${selected ? ' bundle--selected' : ''}`}>
              <label className="bundle__row">
                <input
                  type="radio"
                  name="bundle"
                  checked={selected}
                  onChange={() => setBundleId(b.id)}
                  className="bundle__radio"
                />
                <span className="bundle__radio-ui" />
                <img src={b.icon} alt="" className="bundle__icon" />
                <span className="bundle__label">
                  <span className="bundle__name">{b.label}</span>
                  {b.save && <span className="bundle__save">{b.save}</span>}
                </span>
                <span className="bundle__price">
                  <span className="bundle__price-now">{formatPrice(b.unitPrice)}</span>
                  <span className="bundle__price-was">{formatPrice(product.compareAtPrice)}</span>
                </span>
              </label>

              {selected &&
                Array.from({ length: b.qty }).map((_, slot) => (
                  <div key={slot} className="bundle__colors">
                    <span className="bundle__colors-label">Choose Color {slot + 1}</span>
                    <div className="swatches">
                      {product.colors.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          className={`swatch${colors[slot] === c.id ? ' swatch--active' : ''}`}
                          onClick={() => setColorAt(slot, c.id)}
                          aria-label={c.name}
                          title={c.name}
                        >
                          <img src={c.swatch} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )
        })}
      </div>

      <button type="button" className="btn-add" onClick={handleAdd}>
        Add to Cart +
      </button>

      <div
        className="deal deal--clickable"
        role="button"
        tabIndex={0}
        onClick={() => onAddToCart({ bundle: product.bundles[0], colors: [product.colors[0].id] })}
        onKeyDown={(e) => e.key === 'Enter' && onAddToCart({ bundle: product.bundles[0], colors: [product.colors[0].id] })}
      >
        <span className="badge badge--pink deal__badge">LIMITED DEAL</span>
        <div className="deal__row">
          <span className="deal__title">{product.title}</span>
          <span className="deal__price">
            <span className="deal__price-now">{formatPrice(product.bundles[0].unitPrice)}</span>
            <span className="deal__price-was">{formatPrice(product.compareAtPrice)}</span>
          </span>
        </div>
        <span className="deal__cta">Tap to add 1 Onyx (Black) →</span>
      </div>

      <section id="reviews" className="reviews">
        <h2>Customer reviews</h2>
        <p>{product.reviewCount} verified reviews · {product.rating}.0 average</p>
      </section>
    </div>
  )
}
