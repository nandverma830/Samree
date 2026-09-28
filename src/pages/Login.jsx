import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ firstName: 'SAMREE', lastName: 'Customer', email: form.email });
    navigate('/account');
  };

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%', background: 'var(--color-primary-black)' }}>
      {/* Left Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85"
          alt="SAMREE"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.1))' }} />
        <div style={{ position: 'relative', padding: '80px 64px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <img src="/logo.png" alt="SAMREE" style={{ height: 32, width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: 24 }} />
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 32, fontWeight: 300, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>
            Curated for the way<br />you live.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 64px' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 38, fontWeight: 400, marginBottom: 8 }}>Welcome Back</h1>
          <p style={{ color: 'var(--color-muted-gray)', fontSize: 14, marginBottom: 36 }}>Sign in to your SAMREE account</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--color-dark-gray)', marginBottom: 6, display: 'block' }}>Email</label>
              <input type="email" required className="form-input" placeholder="your@email.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--color-dark-gray)', marginBottom: 6, display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} required className="form-input" placeholder="••••••••" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} style={{ paddingRight: 48 }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-dark-gray)', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--color-muted-gray)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--color-gold)' }} />
                Remember Me
              </label>
              <Link to="/forgot-password" style={{ fontSize: 13, color: 'var(--color-gold)' }}>Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>LOGIN</button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <span style={{ fontSize: 14, color: 'var(--color-dark-gray)' }}>New to SAMREE? </span>
            <Link to="/signup" style={{ fontSize: 14, color: 'var(--color-gold)', fontWeight: 600 }}>Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
