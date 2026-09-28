import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Truck, RotateCcw, Clock, HelpCircle, Search, ChevronDown, CheckCircle, Package } from 'lucide-react';

export default function InfoPage({ pageType: propPageType }) {
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  const type = propPageType || path || 'faq';

  // Tracking state
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  // Return form state
  const [returnOrderNo, setReturnOrderNo] = useState('');
  const [returnReason, setReturnReason] = useState('Size did not fit');
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  // FAQ state
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    setTrackResult({
      orderId: trackId.toUpperCase(),
      status: 'In Transit',
      carrier: 'BlueDart Express',
      estimatedDelivery: 'October 2, 2026',
      timeline: [
        { title: 'Order Confirmed', date: 'Sep 24, 2026 - 11:30 AM', done: true },
        { title: 'Quality Checked & Packed', date: 'Sep 24, 2026 - 04:15 PM', done: true },
        { title: 'Dispatched from Hisar Hub', date: 'Sep 25, 2026 - 09:00 AM', done: true },
        { title: 'In Transit to Regional Center', date: 'Expected Sep 26, 2026', done: false, active: true },
        { title: 'Out for Delivery', date: 'Expected Oct 2, 2026', done: false },
      ],
    });
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    if (!returnOrderNo.trim()) return;
    setReturnSubmitted(true);
  };

  const faqData = [
    {
      q: 'What is SAMREE’s shipping policy?',
      a: 'We offer complimentary express shipping across India on all orders exceeding ₹999. For orders below ₹999, a nominal flat delivery charge of ₹99 is applied. Deliveries typically arrive within 2–5 business days depending on your location.',
    },
    {
      q: 'How do I initiate a return or exchange?',
      a: 'SAMREE offers a hassle-free 15-day return and exchange policy on unworn, unwashed apparel and lifestyle items with original tags intact. You can initiate a return directly from our Returns portal or by contacting customer support at nand@samree.com.',
    },
    {
      q: 'Are your grocery items certified and freshly packed?',
      a: 'Yes, every product in our Grocery & Pantry collection is curated from premium certified suppliers, quality tested, and packed in sanitary moisture-sealed packaging to preserve maximum freshness and aroma.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit and debit cards (Visa, MasterCard, RuPay, Amex), UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ Indian banks, and Cash on Delivery (COD) for eligible pincodes.',
    },
    {
      q: 'Can I change or cancel my order after placing it?',
      a: 'Orders can be modified or cancelled within 2 hours of placement before they enter the dispatch pipeline. Please reach out promptly to +91 99921 50052 or email us with your Order ID.',
    },
    {
      q: 'Do you ship internationally?',
      a: 'Currently SAMREE caters to all states and union territories across India. Global shipping to North America, UAE, and Europe is slated to launch late 2026.',
    },
  ];

  const filteredFaqs = faqData.filter(
    (item) => item.q.toLowerCase().includes(faqSearch.toLowerCase()) || item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh', color: 'var(--color-pure-white)' }}>
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" style={{ marginBottom: 20 }}>
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: 'var(--color-gold)', textTransform: 'capitalize' }}>{type.replace('-', ' ')}</span>
          </nav>
          <span className="eyebrow">CUSTOMER CARE</span>
          <h1 className="editorial-heading h2" style={{ textTransform: 'capitalize' }}>
            {type === 'faq' && 'Frequently Asked Questions'}
            {type === 'shipping' && 'Shipping & Delivery Policy'}
            {type === 'returns' && 'Returns & Exchanges'}
            {type === 'track-order' && 'Track Your Order'}
            {type === 'privacy' && 'Privacy Policy'}
            {type === 'terms' && 'Terms of Service'}
            {type === 'cookie-policy' && 'Cookie Policy'}
          </h1>
          <p style={{ color: 'var(--color-muted-gray)', fontSize: 15, marginTop: 8, maxWidth: 540 }}>
            Everything you need to know about our services, commitments, and client care.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 56, paddingBottom: 96, maxWidth: 880 }}>
        {/* TAB NAVIGATION */}
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 48, borderBottom: '1px solid var(--border-subtle)' }}>
          {[
            { id: 'faq', label: 'FAQ' },
            { id: 'track-order', label: 'Track Order' },
            { id: 'shipping', label: 'Shipping' },
            { id: 'returns', label: 'Returns' },
            { id: 'privacy', label: 'Privacy' },
            { id: 'terms', label: 'Terms' },
          ].map((tab) => (
            <Link
              key={tab.id}
              to={`/${tab.id}`}
              style={{
                padding: '8px 18px',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
                borderRadius: 4,
                textDecoration: 'none',
                background: type === tab.id ? 'var(--color-gold)' : 'var(--color-elevated)',
                color: type === tab.id ? 'var(--color-primary-black)' : 'var(--color-muted-gray)',
                border: `1px solid ${type === tab.id ? 'var(--color-gold)' : 'var(--border-subtle)'}`,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* 1. FAQ CONTENT */}
        {type === 'faq' && (
          <div>
            <div style={{ position: 'relative', marginBottom: 36 }}>
              <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-dark-gray)' }} />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search topics (e.g. delivery, returns, payment, grocery)..."
                style={{
                  width: '100%',
                  height: 52,
                  paddingLeft: 48,
                  paddingRight: 16,
                  background: 'var(--color-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 6,
                  color: 'var(--color-pure-white)',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--color-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 6,
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-pure-white)',
                      textAlign: 'left',
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: openFaq === idx ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                        color: 'var(--color-gold)',
                        flexShrink: 0,
                        marginLeft: 12,
                      }}
                    />
                  </button>
                  {openFaq === idx && (
                    <div style={{ padding: '0 24px 20px', color: 'var(--color-muted-gray)', fontSize: 14, lineHeight: 1.8, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. TRACK ORDER CONTENT */}
        {type === 'track-order' && (
          <div>
            <div style={{ background: 'var(--color-elevated)', padding: 36, borderRadius: 8, border: '1px solid var(--border-subtle)', marginBottom: 36 }}>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 24, marginBottom: 8 }}>Track Your Consignment</h2>
              <p style={{ color: 'var(--color-muted-gray)', fontSize: 14, marginBottom: 24 }}>
                Enter your order number or tracking number provided in your dispatch SMS / email.
              </p>
              <form onSubmit={handleTrack} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  placeholder="e.g. SAM492081 or BD8392109"
                  style={{
                    flex: '1 1 260px',
                    height: 48,
                    padding: '0 16px',
                    background: 'var(--color-primary-black)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ height: 48, padding: '0 24px' }}>
                  Track Order
                </button>
              </form>
            </div>

            {trackResult && (
              <div style={{ background: 'var(--color-elevated)', padding: 32, borderRadius: 8, border: '1px solid var(--border-gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 20, marginBottom: 28 }}>
                  <div>
                    <span style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>ORDER #{trackResult.orderId}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>Status: {trackResult.status}</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, color: 'var(--color-dark-gray)' }}>Carrier: {trackResult.carrier}</p>
                    <p style={{ fontSize: 13, color: 'var(--color-pure-white)', fontWeight: 500, marginTop: 2 }}>Est. Delivery: {trackResult.estimatedDelivery}</p>
                  </div>
                </div>

                <div style={{ position: 'relative', paddingLeft: 28 }}>
                  <div style={{ position: 'absolute', left: 8, top: 8, bottom: 8, width: 2, background: 'var(--border-subtle)' }} />
                  {trackResult.timeline.map((item, idx) => (
                    <div key={idx} style={{ position: 'relative', marginBottom: 24 }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: -28,
                          top: 2,
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: item.done ? 'var(--color-gold)' : item.active ? 'var(--color-champagne)' : 'var(--color-deep-black)',
                          border: `2px solid ${item.done || item.active ? 'var(--color-gold)' : 'var(--color-dark-gray)'}`,
                        }}
                      />
                      <p style={{ fontSize: 14, fontWeight: item.done || item.active ? 600 : 400, color: item.done || item.active ? 'var(--color-pure-white)' : 'var(--color-dark-gray)' }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--color-dark-gray)', marginTop: 2 }}>{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. SHIPPING CONTENT */}
        {type === 'shipping' && (
          <div style={{ lineHeight: 1.8, color: 'var(--color-muted-gray)', fontSize: 15 }}>
            <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 26, color: '#fff', marginBottom: 16 }}>Dispatch & Delivery Standards</h2>
            <p style={{ marginBottom: 24 }}>
              At SAMREE, every order is treated as a bespoke consignment. Our fulfillment centre in Hisar, Haryana operates state-of-the-art climate-controlled storage and packing lines to guarantee every garment, accessory, and pantry essential arrives in pristine showroom condition.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 36 }}>
              <div style={{ background: 'var(--color-elevated)', padding: 24, borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
                <Truck size={24} style={{ color: 'var(--color-gold)', marginBottom: 12 }} />
                <h3 style={{ fontSize: 16, color: '#fff', marginBottom: 6 }}>Complimentary Delivery</h3>
                <p style={{ fontSize: 13 }}>Free across India on all carts over ₹999. Flat ₹99 on lower orders.</p>
              </div>
              <div style={{ background: 'var(--color-elevated)', padding: 24, borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
                <Clock size={24} style={{ color: 'var(--color-gold)', marginBottom: 12 }} />
                <h3 style={{ fontSize: 16, color: '#fff', marginBottom: 6 }}>Express Transit</h3>
                <p style={{ fontSize: 13 }}>Metro destinations: 2–3 business days. Tier 2 & 3 regions: 3–5 business days.</p>
              </div>
              <div style={{ background: 'var(--color-elevated)', padding: 24, borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
                <Shield size={24} style={{ color: 'var(--color-gold)', marginBottom: 12 }} />
                <h3 style={{ fontSize: 16, color: '#fff', marginBottom: 6 }}>Insured Shipping</h3>
                <p style={{ fontSize: 13 }}>Every package is 100% insured against transit damages or loss.</p>
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 20, color: '#fff', marginBottom: 12 }}>Packaging</h3>
            <p style={{ marginBottom: 20 }}>
              All SAMREE apparel is draped in breathable dust-jackets and packed in rigid matte-black magnetic boxes with gold-foil seal tags. Grocery orders are double-boxed with insulated cushioning to preserve peak quality.
            </p>
          </div>
        )}

        {/* 4. RETURNS CONTENT */}
        {type === 'returns' && (
          <div>
            {!returnSubmitted ? (
              <div>
                <div style={{ background: 'var(--color-elevated)', padding: 32, borderRadius: 8, border: '1px solid var(--border-subtle)', marginBottom: 36 }}>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 24, marginBottom: 8 }}>Request Return or Exchange</h2>
                  <p style={{ color: 'var(--color-muted-gray)', fontSize: 14, marginBottom: 24 }}>
                    We offer a 15-day return window from the date of package delivery.
                  </p>
                  <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-muted-gray)', marginBottom: 8 }}>Order Number</label>
                      <input
                        type="text"
                        required
                        value={returnOrderNo}
                        onChange={(e) => setReturnOrderNo(e.target.value)}
                        placeholder="e.g. SAM492081"
                        style={{ width: '100%', height: 46, padding: '0 16px', background: 'var(--color-primary-black)', border: '1px solid var(--border-subtle)', borderRadius: 4, color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-muted-gray)', marginBottom: 8 }}>Reason for Return</label>
                      <select
                        value={returnReason}
                        onChange={(e) => setReturnReason(e.target.value)}
                        style={{ width: '100%', height: 46, padding: '0 16px', background: 'var(--color-primary-black)', border: '1px solid var(--border-subtle)', borderRadius: 4, color: '#fff' }}
                      >
                        <option>Size did not fit</option>
                        <option>Color looks different than expected</option>
                        <option>Fabric texture preference</option>
                        <option>Received damaged item</option>
                        <option>Exchange for another size</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: 48, alignSelf: 'flex-start', marginTop: 8 }}>
                      Submit Return Request
                    </button>
                  </form>
                </div>

                <div style={{ lineHeight: 1.8, color: 'var(--color-muted-gray)', fontSize: 14 }}>
                  <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 20, color: '#fff', marginBottom: 12 }}>Return Policy Guidelines</h3>
                  <ul style={{ paddingLeft: 20 }}>
                    <li>Items must be unworn, unwashed and accompanied by original hangtags and packaging.</li>
                    <li>For hygiene reasons, innerwear, fragrance items, and opened grocery packets cannot be returned.</li>
                    <li>Refunds are credited to the original payment source within 5–7 business days after verification at our warehouse.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{ background: 'var(--color-elevated)', padding: 48, borderRadius: 8, textAlign: 'center', border: '1px solid var(--border-gold)' }}>
                <CheckCircle size={48} style={{ color: 'var(--color-gold)', margin: '0 auto 16px' }} />
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 28, marginBottom: 8 }}>Return Initiated</h2>
                <p style={{ color: 'var(--color-muted-gray)', fontSize: 15, maxWidth: 440, margin: '0 auto 24px' }}>
                  Your return request for order <strong>{returnOrderNo}</strong> has been logged. Our logistics courier will reach out within 24 hours to schedule doorstep pickup.
                </p>
                <button onClick={() => setReturnSubmitted(false)} className="btn btn-outline" style={{ height: 44, padding: '0 24px' }}>
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. PRIVACY & TERMS */}
        {(type === 'privacy' || type === 'terms' || type === 'cookie-policy') && (
          <div style={{ lineHeight: 1.85, color: 'var(--color-muted-gray)', fontSize: 14 }}>
            <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 24, color: '#fff', marginBottom: 16 }}>
              {type === 'privacy' && 'SAMREE Privacy Commitment'}
              {type === 'terms' && 'Terms and Conditions of Use'}
              {type === 'cookie-policy' && 'Cookie and Data Preferences'}
            </h2>
            <p style={{ marginBottom: 18 }}>
              This policy describes how SAMREE (“we”, “us”, or “our”) collects, secures, and handles personal information when you access or interact with samree.com, our mobile web apps, and associated digital services.
            </p>
            <h3 style={{ fontSize: 16, color: '#fff', marginTop: 24, marginBottom: 10 }}>1. Data Security & Encryption</h3>
            <p style={{ marginBottom: 18 }}>
              We employ 256-bit SSL encryption across every checkout and data transmission flow. Your credit card details, UPI credentials, and financial parameters are tokenized and processed through RBI-certified payment gateways. SAMREE never stores raw payment card numbers.
            </p>
            <h3 style={{ fontSize: 16, color: '#fff', marginTop: 24, marginBottom: 10 }}>2. Communication & Consent</h3>
            <p style={{ marginBottom: 18 }}>
              You may opt out of promotional newsletters and SMS broadcasts at any time through your Account settings or by clicking the unsubscribe link in our correspondence.
            </p>
            <h3 style={{ fontSize: 16, color: '#fff', marginTop: 24, marginBottom: 10 }}>3. Contact Our Data Protection Officer</h3>
            <p>
              For privacy or terms inquiries, write to: <br />
              <strong style={{ color: 'var(--color-gold)' }}>nand@samree.com</strong> | SAMREE Legal Dept., Paschim Vihar Phase 2, Hisar, Haryana, India.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
