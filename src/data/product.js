import productMain from '../assets/product-main.png'
import thumb1 from '../assets/thumb-1.png'
import thumb2 from '../assets/thumb-2.png'
import thumb3 from '../assets/thumb-3.png'
import thumb4 from '../assets/thumb-4.png'
import thumb5 from '../assets/thumb-5.png'
import thumb6 from '../assets/thumb-6.png'
import thumb7 from '../assets/thumb-7.png'
import thumb8 from '../assets/thumb-8.png'
import thumb9 from '../assets/thumb-9.png'
import slide2 from '../assets/slide-2.png'
import slide3 from '../assets/slide-3.png'
import slide4 from '../assets/slide-4.png'
import slide5 from '../assets/slide-5.png'
import slide6 from '../assets/slide-6.png'
import slide7 from '../assets/slide-7.png'
import slide8 from '../assets/slide-8.png'
import slide9 from '../assets/slide-9.png'
import icon1 from '../assets/icon-1.png'
import icon2 from '../assets/icon-2.png'
import icon3 from '../assets/icon-3.png'
import swatch1 from '../assets/swatch-1.png'
import swatch2 from '../assets/swatch-2.png'
import swatch3 from '../assets/swatch-3.png'
import swatch4 from '../assets/swatch-4.png'

export const product = {
  title: 'Onyx Vibration Alarm',
  rating: 5,
  reviewCount: 3623,
  compareAtPrice: 85.0,
  images: [
    { src: productMain, thumb: thumb1, alt: 'Premium Wrist Alarm' },
    { src: slide2, thumb: thumb2, alt: 'Couple sleeping' },
    { src: slide3, thumb: thumb3, alt: 'Onyx alarm vs phone alarm' },
    { src: slide4, thumb: thumb4, alt: 'Wearing the Onyx' },
    { src: slide5, thumb: thumb5, alt: 'Quick guide' },
    { src: slide6, thumb: thumb6, alt: 'Your new way of waking up' },
    { src: slide7, thumb: thumb7, alt: 'Your best morning self' },
    { src: slide8, thumb: thumb8, alt: 'What is in the box' },
    { src: slide9, thumb: thumb9, alt: 'Product detail' },
  ],
  colors: [
    { id: 'black', name: 'Black', swatch: swatch1 },
    { id: 'grey', name: 'Grey', swatch: swatch2 },
    { id: 'pink', name: 'Pink', swatch: swatch3 },
    { id: 'white', name: 'White', swatch: swatch4 },
  ],
  bundles: [
    { id: 1, qty: 1, label: '1 Onyx', save: null, unitPrice: 39.95, icon: icon1 },
    { id: 2, qty: 2, label: '2x Onyx', save: 'Save 10%', unitPrice: 35.96, icon: icon2 },
    { id: 3, qty: 3, label: '3x Onyx', save: 'Save 20%', unitPrice: 31.96, icon: icon3 },
  ],
}

export const formatPrice = (n) => `$${n.toFixed(2)}`
