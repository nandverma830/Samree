import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, addToast } = useStore();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'SAMREE10') {
      setDiscount(Math.round(cartTotal * 0.10));
      addToast('Promo code applied. 10% discount!');
    } else {
      addToast('Invalid coupon code.');
    }
  };

  const shipping = cartTotal > 999 ? 0 : 99;
  const total = cartTotal - discount + shipping;

  return (
    <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 40, fontWeight: 400, marginBottom: 40 }}>Shopping Bag</h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 32, marginBottom: 16 }}>Your Bag Is Empty.</p>
            <p style={{ color: 'var(--color-muted-gray)', marginBottom: 32 }}>Explore SAMREE and discover something exceptional.</p>
            <Link to="/shop" className="btn btn-primary">SHOP NOW <ArrowRight size={14} className="arrow-icon" /></Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
            {/* Cart Items */}
            <div>
              {cart.map((item) => (
                <div key={item.cartId} style={{ display: 'flex', gap: 20, padding: '24px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ width: 100, height: 125, borderRadius: 4, overflow: 'hidden', background: 'var(--color-elevated)', flexShrink: 0 }}>
                    <img src={item.images?.[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: 'var(--color-dark-gray)', marginBottom: 6 }}>SAMREE</p>
                    <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{item.name}</p>
                    {item.selectedSize && <p style={{ fontSize: 13, color: 'var(--color-dark-gray)', marginBottom: 4 }}>Size: {item.selectedSize}</p>}
                    {item.selectedColor && <p style={{ fontSize: 13, color: 'var(--color-dark-gray)', marginBottom: 16 }}>Colour: {item.selectedColor}</p>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: 4 }}>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted-gray)', cursor: 'pointer', fontSize: 18 }}>−</button>
                        <span style={{ width: 40, textAlign: 'center', fontWeight: 600, color: 'var(--color-pure-white)', borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted-gray)', cursor: 'pointer', fontSize: 18 }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} style={{ color: 'var(--color-dark-gray)', cursor: 'pointer', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e05252'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark-gray)'}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-pure-white)', flexShrink: 0 }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div style={{ background: 'var(--color-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 28, position: 'sticky', top: 108 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 24 }}>ORDER SUMMARY</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 24 }}>
                  {[
                    { label: 'Subtotal', value: `₹${cartTotal.toLocaleString('en-IN')}` },
                    { label: 'Discount', value: discount ? `-₹${discount.toLocaleString('en-IN')}` : '—', gold: !!discount },
                    { label: 'Pan-India Delivery', value: shipping === 0 ? 'FREE' : `₹${shipping}`, gold: shipping === 0 },
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      <span style={{ color: 'var(--color-muted-gray)' }}>{row.label}</span>
                      <span style={{ fontWeight: 600, color: row.gold ? 'var(--color-gold)' : 'var(--color-pure-white)' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-gold)' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>

                {/* Coupon */}
                <form style={{ display: 'flex', gap: 8, marginBottom: 20 }} onSubmit={applyCoupon}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Tag size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-dark-gray)' }} />
                    <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="form-input" style={{ paddingLeft: 36, height: 44 }} />
                  </div>
                  <button type="submit" className="btn btn-dark" style={{ height: 44, padding: '0 16px', fontSize: 11 }}>APPLY</button>
                </form>

                <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                  PROCEED TO CHECKOUT <ArrowRight size={14} className="arrow-icon" />
                </Link>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', marginTop: 8 }}>
                  {['100% Secure UPI & Cards', '15-Day Doorstep Returns', 'Pan-India Insured Delivery'].map((t) => (
                    <span key={t} style={{ fontSize: 11, color: 'var(--color-dark-gray)' }}>✓ {t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
