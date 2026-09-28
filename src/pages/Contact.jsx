import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh' }}>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">REACH OUT</span>
          <h1 className="editorial-heading h2">Get in Touch</h1>
          <p style={{ color: 'var(--color-muted-gray)', fontSize: 15, marginTop: 8, maxWidth: 480 }}>
            Whether you need help with an order, product information or anything else, the SAMREE team is here to help.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72 }}>
          {/* Contact Info */}
          <div>
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 20 }}>CUSTOMER SUPPORT</p>
              {[
                { icon: <Mail size={16} />, label: 'Email', value: 'nand@samree.com', href: 'mailto:nand@samree.com' },
                { icon: <Phone size={16} />, label: 'Phone', value: '+91 99921 50052', href: 'tel:+919992150052' },
                { icon: <MapPin size={16} />, label: 'Address', value: 'Paschim Vihar Phase 2, Hisar, Haryana, India', href: null },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,161,91,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--color-dark-gray)', marginBottom: 4 }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 15, color: 'var(--color-pure-white)', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-pure-white)'}
                      >{item.value}</a>
                    ) : (
                      <p style={{ fontSize: 15, color: 'var(--color-pure-white)', lineHeight: 1.5 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--color-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 24 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <Clock size={16} style={{ color: 'var(--color-gold)' }} />
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--color-gold)' }}>BUSINESS HOURS</p>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-muted-gray)', marginBottom: 4 }}>Customer Support</p>
              <p style={{ fontSize: 14, color: 'var(--color-pure-white)', fontWeight: 500 }}>Monday – Saturday</p>
              <p style={{ fontSize: 14, color: 'var(--color-pure-white)', fontWeight: 500 }}>10:00 AM – 7:00 PM IST</p>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,161,91,0.12)', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', marginBottom: 24 }}>
                <Send size={26} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 30, marginBottom: 12 }}>Message Sent!</h2>
              <p style={{ color: 'var(--color-muted-gray)', lineHeight: 1.7 }}>Thank you for reaching out. Our team will respond within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input required type="text" placeholder="Full Name" className="form-input" value={form.name} onChange={e => update('name', e.target.value)} />
                <input required type="email" placeholder="Email Address" className="form-input" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <input type="tel" placeholder="Phone Number" className="form-input" value={form.phone} onChange={e => update('phone', e.target.value)} />
              <select className="form-input" value={form.subject} onChange={e => update('subject', e.target.value)} style={{ background: 'transparent', cursor: 'pointer' }}>
                <option value="" disabled>Select Subject</option>
                {['Order Support', 'Product Question', 'Returns & Refunds', 'General Enquiry', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <textarea required placeholder="Your message..." value={form.message} onChange={e => update('message', e.target.value)}
                style={{ width: '100%', minHeight: 140, background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 4, padding: 16, fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--color-pure-white)', resize: 'vertical', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.18)'}
              />
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', gap: 10 }}>
                <Send size={14} /> SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
