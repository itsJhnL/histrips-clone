import { useEffect } from 'react'
import { formatPrice } from '../data/product'

export default function CartDrawer({ open, items, onClose, onRemove, onChangeQty }) {
  // close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0)

  return (
    <>
      <div className={`drawer-backdrop${open ? ' is-open' : ''}`} onClick={onClose} />
      <aside className={`drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="drawer__head">
          <h2>Your Cart</h2>
          <button className="drawer__close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="drawer__empty">Your cart is empty.</p>
        ) : (
          <ul className="drawer__list">
            {items.map((item) => (
              <li key={item.id} className="drawer__item">
                <img src={item.image} alt="" className="drawer__img" />
                <div className="drawer__meta">
                  <strong>{item.title}</strong>
                  <span className="drawer__variant">{item.variant}</span>
                  <div className="qty">
                    <button onClick={() => onChangeQty(item.id, item.qty - 1)} aria-label="Decrease">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onChangeQty(item.id, item.qty + 1)} aria-label="Increase">+</button>
                    <button className="qty__remove" onClick={() => onRemove(item.id)}>Remove</button>
                  </div>
                </div>
                <span className="drawer__price">{formatPrice(item.unitPrice * item.qty)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer__foot">
          <div className="drawer__subtotal">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <button className="btn-add" disabled={items.length === 0} onClick={() => alert('Checkout is a demo — no backend connected.')}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}
