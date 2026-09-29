import { useCallback, useEffect, useState } from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import ProductGallery from './components/ProductGallery'
import ProductInfo from './components/ProductInfo'
import CartDrawer from './components/CartDrawer'
import { product } from './data/product'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [currency, setCurrency] = useState('USD $')
  const [toast, setToast] = useState('')

  const cartCount = cart.reduce((n, item) => n + item.qty, 0)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const addToCart = ({ bundle, colors }) => {
    const variant = colors.map((c) => product.colors.find((x) => x.id === c).name).join(' / ')
    const id = `${bundle.id}-${colors.join('-')}`
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      return [
        ...prev,
        {
          id,
          title: `${product.title} (${bundle.label})`,
          variant,
          qty: 1,
          unitPrice: bundle.unitPrice * bundle.qty,
          image: product.images[0].src,
        },
      ]
    })
    setToast(`${bundle.label} added to cart`)
    setCartOpen(true)
  }

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id))
  const changeQty = (id, qty) =>
    setCart((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))))

  const closeCart = useCallback(() => setCartOpen(false), [])

  return (
    <>
      <AnnouncementBar />
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        currency={currency}
        onChangeCurrency={setCurrency}
        onSearch={(q) => setToast(q ? `Searching for “${q}”…` : 'Type something to search')}
      />

      <main className="product">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} onAddToCart={addToCart} />
      </main>

      <CartDrawer open={cartOpen} items={cart} onClose={closeCart} onRemove={removeItem} onChangeQty={changeQty} />

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
