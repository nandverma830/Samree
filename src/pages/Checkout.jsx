import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronDown, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const steps = ['Contact', 'Delivery', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: '', phone: '', firstName: '', lastName: '',
    address1: '', address2: '', city: '', state: '', pincode: '',
    country: 'India', payment: 'upi',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleNext = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setOrderPlaced(true);
      clearCart();
    }
  };

  const orderNum = '#SAM' + Math.floor(100000 + Math.random() * 900000);
  const shipping = cartTotal > 999 ? 0 : 99;

  if (orderPlaced) {
    return (
      <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 520, padding: '0 20px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(201,161,91,0.12)', border: '2px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: 'var(--color-gold)' }}>
            <Check size={36} />
          </div>
          <span className="eyebrow" style={{ display: 'block', marginBottom: 16 }}>ORDER CONFIRMED</span>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 40, fontWeight: 400, marginBottom: 16 }}>Thank You for Your Order.</h1>
          <p style={{ color: 'var(--color-muted-gray)', fontSize: 16, lineHeight: 1.7, marginBottom: 12 }}>
            Your SAMREE order has been confirmed and is being processed.
          </p>
          <p style={{ color: 'var(--color-gold)', fontSize: 18, fontWeight: 700, marginBottom: 36 }}>{orderNum}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/account/orders" className="btn btn-secondary">TRACK ORDER</Link>
            <Link to="/" className="btn btn-primary">CONTINUE SHOPPING</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 0, background: 'var(--color-primary-black)', minHeight: '100vh' }}>
      {/* Checkout Header */}
      <header style={{ background: 'var(--color-deep-black)', borderBottom: '1px solid var(--border-subtle)', height: 72, display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/"><img src="/logo.png" alt="SAMREE" style={{ height: 30, filter: 'brightness(0) invert(1)' }} /></Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-gold)', fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
            <Shield size={14} /> SECURE CHECKOUT
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 64 }}>
          {/* Left - Form */}
          <div>
            {/* Progress */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 40 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                      background: i <= step ? 'var(--color-gold)' : 'var(--color-elevated)',
                      color: i <= step ? 'var(--color-primary-black)' : 'var(--color-dark-gray)',
                      border: i === step ? '2px solid var(--color-champagne)' : '2px solid transparent',
                    }}>
                      {i < step ? <Check size={14} /> : i + 1}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: i <= step ? 'var(--color-gold)' : 'var(--color-dark-gray)', whiteSpace: 'nowrap' }}>{s}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ flex: 1, height: 1, background: i < step ? 'var(--color-gold)' : 'var(--border-subtle)', margin: '0 8px', marginBottom: 24 }} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleNext}>
              {step === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Contact Information</h2>
                  <input required type="email" placeholder="Email address" className="form-input" value={form.email} onChange={(e) => update('email', e.target.value)} />
                  <input required type="tel" placeholder="Phone number" className="form-input" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                </div>
              )}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Delivery Address</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <input required type="text" placeholder="First Name" className="form-input" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
                    <input required type="text" placeholder="Last Name" className="form-input" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
                  </div>
                  <input required type="text" placeholder="Address Line 1" className="form-input" value={form.address1} onChange={(e) => update('address1', e.target.value)} />
                  <input type="text" placeholder="Address Line 2 (optional)" className="form-input" value={form.address2} onChange={(e) => update('address2', e.target.value)} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <input required type="text" placeholder="City" className="form-input" value={form.city} onChange={(e) => update('city', e.target.value)} />
                    <input required type="text" placeholder="State" className="form-input" value={form.state} onChange={(e) => update('state', e.target.value)} />
                    <input required type="text" placeholder="PIN Code" className="form-input" value={form.pincode} onChange={(e) => update('pincode', e.target.value)} maxLength={6} />
                  </div>
                  <input type="text" placeholder="Country" className="form-input" value={form.country} readOnly />
                </div>
              )}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Payment Method</h2>
                  {[
                    { id: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm' },
                    { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                    { id: 'netbanking', label: 'Net Banking', desc: 'All major banks' },
                    { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive' },
                  ].map((m) => (
                    <label key={m.id} style={{
                      display: 'flex', alignItems: 'center', gap: 16, padding: 20,
                      border: `1px solid ${form.payment === m.id ? 'var(--color-gold)' : 'var(--border-subtle)'}`,
                      borderRadius: 6, cursor: 'pointer', background: form.payment === m.id ? 'rgba(201,161,91,0.06)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}>
                      <input type="radio" name="payment" value={m.id} checked={form.payment === m.id} onChange={() => update('payment', m.id)} style={{ accentColor: 'var(--color-gold)' }} />
                      <div>
                        <p style={{ fontWeight: 600, marginBottom: 2 }}>{m.label}</p>
                        <p style={{ fontSize: 12, color: 'var(--color-dark-gray)' }}>{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 28, fontWeight: 400, marginBottom: 24 }}>Review Your Order</h2>
                  {cart.map((item) => (
                    <div key={item.cartId} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                      <img src={item.images?.[0]} alt={item.name} style={{ width: 60, height: 75, objectFit: 'cover', borderRadius: 4 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 500, marginBottom: 4 }}>{item.name}</p>
                        <p style={{ fontSize: 12, color: 'var(--color-dark-gray)' }}>Qty: {item.quantity} {item.selectedSize ? `· Size: ${item.selectedSize}` : ''}</p>
                      </div>
                      <p style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                  <p style={{ marginTop: 20, fontSize: 13, color: 'var(--color-muted-gray)', lineHeight: 1.7 }}>
                    By placing your order, you agree to our <Link to="/terms" style={{ color: 'var(--color-gold)' }}>Terms & Conditions</Link> and <Link to="/privacy" style={{ color: 'var(--color-gold)' }}>Privacy Policy</Link>.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                {step > 0 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="btn btn-dark" style={{ flex: 1 }}>BACK</button>
                )}
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  {step < steps.length - 1 ? 'CONTINUE' : 'PLACE ORDER'}
                </button>
              </div>
            </form>
          </div>

          {/* Right - Order Summary */}
          <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div style={{ background: 'var(--color-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 20 }}>ORDER SUMMARY</h3>
              {cart.map((item) => (
                <div key={item.cartId} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={item.images?.[0]} alt="" style={{ width: 52, height: 65, objectFit: 'cover', borderRadius: 4 }} />
                    <span style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, background: 'var(--color-dark-gray)', borderRadius: '50%', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{item.quantity}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{item.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--color-dark-gray)' }}>{item.selectedSize || 'One Size'}</p>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--color-muted-gray)' }}>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--color-muted-gray)' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? 'var(--color-gold)' : undefined }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--color-gold)', fontSize: 18 }}>₹{(cartTotal + shipping).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
