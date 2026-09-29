import { useEffect, useRef, useState } from 'react'

const shopMenu = ['Onyx Vibration Alarm', 'Infrared Light Panel', 'Sleep Mask', 'Accessories', 'Bundles']
const currencies = ['USD $', 'EUR €', 'GBP £', 'CAD $', 'AUD $']

export default function Header({ cartCount, onOpenCart, currency, onChangeCurrency, onSearch }) {
  const [shopOpen, setShopOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const headerRef = useRef(null)
  const searchRef = useRef(null)

  // close any open dropdown when clicking outside the header
  useEffect(() => {
    const onDoc = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setShopOpen(false)
        setCurrencyOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const submitSearch = (e) => {
    e.preventDefault()
    onSearch(query)
    setSearchOpen(false)
  }

  return (
    <header className="header" ref={headerRef}>
      <div className="header__inner">
        <nav className="header__nav">
          <div className="dropdown">
            <button
              className={`header__link header__link--btn${shopOpen ? ' is-open' : ''}`}
              onClick={() => { setShopOpen((o) => !o); setCurrencyOpen(false) }}
              aria-expanded={shopOpen}
            >
              Shop All
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="m2 3.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {shopOpen && (
              <ul className="dropdown__menu">
                {shopMenu.map((item) => (
                  <li key={item}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setShopOpen(false) }}>{item}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a href="#our-story" className="header__link">Our Story</a>
          <a href="#store-locator" className="header__link">Store Locator</a>
          <a href="#support" className="header__link">Support</a>
          <a href="#sale" className="header__link">Sale</a>
        </nav>

        <a href="#" className="logo" aria-label="histrips home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="logo__hi">hi</span>
          <span className="logo__strips">strips.</span>
        </a>

        <div className="header__actions">
          <div className="dropdown">
            <button
              className="header__currency"
              onClick={() => { setCurrencyOpen((o) => !o); setShopOpen(false) }}
              aria-expanded={currencyOpen}
            >
              <span className="flag" aria-hidden="true">
                <span className="flag__stripes" />
                <span className="flag__canton" />
              </span>
              {currency.replace(' ', ' ')}
            </button>
            {currencyOpen && (
              <ul className="dropdown__menu dropdown__menu--right">
                {currencies.map((c) => (
                  <li key={c}>
                    <button
                      className={c === currency ? 'is-active' : ''}
                      onClick={() => { onChangeCurrency(c); setCurrencyOpen(false) }}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="header__icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button className="header__icon header__cart" aria-label="Open cart" onClick={onOpenCart}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 8H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1.5" fill="currentColor" />
              <circle cx="17" cy="20" r="1.5" fill="currentColor" />
            </svg>
            {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search" onClick={() => setSearchOpen(false)}>
          <form className="search__box" onSubmit={submitSearch} onClick={(e) => e.stopPropagation()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
            />
            <button type="button" className="search__close" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              ✕
            </button>
          </form>
        </div>
      )}
    </header>
  )
}
