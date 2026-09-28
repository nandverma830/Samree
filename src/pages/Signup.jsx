import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function SignupPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', agree: false });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { alert('Passwords do not match'); return; }
    if (!form.agree) { alert('Please accept the Terms & Conditions'); return; }
    login({ firstName: form.firstName, lastName: form.lastName, email: form.email });
    navigate('/account');
  };

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh', background: 'var(--color-primary-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '88px 20px 60px' }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link to="/"><img src="/logo.png" alt="SAMREE" style={{ height: 28, filter: 'brightness(0) invert(1)', margin: '0 auto 24px' }} /></Link>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 40, fontWeight: 400, marginBottom: 8 }}>Join SAMREE</h1>
          <p style={{ color: 'var(--color-muted-gray)', fontSize: 14 }}>Create your account and start exploring.</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <input required type="text" placeholder="First Name" className="form-input" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
            <input required type="text" placeholder="Last Name" className="form-input" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
          </div>
          <input required type="email" placeholder="Email address" className="form-input" value={form.email} onChange={(e) => update('email', e.target.value)} />
          <input type="tel" placeholder="Phone number" className="form-input" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          <input required type="password" placeholder="Password" className="form-input" value={form.password} onChange={(e) => update('password', e.target.value)} />
          <input required type="password" placeholder="Confirm Password" className="form-input" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} />
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', fontSize: 13, color: 'var(--color-muted-gray)', lineHeight: 1.5 }}>
            <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} style={{ accentColor: 'var(--color-gold)', marginTop: 2 }} />
            I agree to the <Link to="/terms" style={{ color: 'var(--color-gold)' }}>Terms & Conditions</Link> and <Link to="/privacy" style={{ color: 'var(--color-gold)' }}>Privacy Policy</Link>.
          </label>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>CREATE ACCOUNT</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--color-dark-gray)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
