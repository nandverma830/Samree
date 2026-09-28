import { Link, useLocation } from 'react-router-dom';
import { Package, Heart, MapPin, User, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const sidebarLinks = [
  { label: 'Overview', href: '/account', icon: <User size={16} /> },
  { label: 'My Orders', href: '/account/orders', icon: <Package size={16} /> },
  { label: 'Wishlist', href: '/wishlist', icon: <Heart size={16} /> },
  { label: 'Addresses', href: '/account/addresses', icon: <MapPin size={16} /> },
  { label: 'Profile', href: '/account/profile', icon: <User size={16} /> },
];

const mockOrders = [
  { id: '#SAM102487', date: 'Sep 24, 2026', status: 'Shipped', items: 3, total: 8799 },
  { id: '#SAM102341', date: 'Sep 12, 2026', status: 'Delivered', items: 2, total: 5998 },
  { id: '#SAM101892', date: 'Aug 28, 2026', status: 'Delivered', items: 1, total: 4999 },
];

const statusColors = {
  Shipped: '#C9A15B',
  Delivered: '#5bc97a',
  Pending: '#a7a7a7',
  Processing: '#d9ba78',
};

export default function AccountPage() {
  const { user, logout } = useStore();
  const location = useLocation();

  const isOrders = location.pathname.includes('/orders');
  const isAddresses = location.pathname.includes('/addresses');

  const displayName = user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Guest';

  return (
    <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh' }}>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">MY ACCOUNT</span>
          <h1 className="editorial-heading h2">Welcome, {user?.firstName || 'Customer'}</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80, display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48 }}>
        {/* Sidebar */}
        <aside>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {sidebarLinks.map((l) => (
              <Link key={l.label} to={l.href} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500,
                color: location.pathname === l.href ? 'var(--color-gold)' : 'var(--color-muted-gray)',
                background: location.pathname === l.href ? 'rgba(201,161,91,0.08)' : 'transparent',
                border: `1px solid ${location.pathname === l.href ? 'var(--border-gold)' : 'transparent'}`,
                transition: 'all 0.2s ease',
              }}>
                <span style={{ color: 'inherit' }}>{l.icon}</span>
                {l.label}
              </Link>
            ))}
            <button
              onClick={logout}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                color: 'var(--color-dark-gray)', background: 'transparent', border: 'none', marginTop: 8, width: '100%', textAlign: 'left',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e05252'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark-gray)'}
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main>
          {isOrders ? (
            <div>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 28, marginBottom: 28 }}>My Orders</h2>
              {mockOrders.map((o) => (
                <div key={o.id} style={{ background: 'var(--color-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 24, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{o.id}</p>
                    <p style={{ fontSize: 13, color: 'var(--color-dark-gray)', marginBottom: 4 }}>Placed: {o.date}</p>
                    <p style={{ fontSize: 13, color: 'var(--color-dark-gray)' }}>{o.items} items</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, background: 'rgba(0,0,0,0.3)', color: statusColors[o.status] || 'var(--color-muted-gray)', border: `1px solid ${statusColors[o.status]}40`, marginBottom: 8 }}>
                      {o.status}
                    </span>
                    <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-gold)' }}>₹{o.total.toLocaleString('en-IN')}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Link to="/account/orders" className="btn btn-dark" style={{ height: 40, padding: '0 18px', fontSize: 11 }}>VIEW</Link>
                    <Link to="/track-order" className="btn btn-secondary" style={{ height: 40, padding: '0 18px', fontSize: 11 }}>TRACK</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : isAddresses ? (
            <div>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 28, marginBottom: 28 }}>Saved Addresses</h2>
              <div style={{ background: 'var(--color-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 24, maxWidth: 400 }}>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Home</p>
                <p style={{ fontSize: 14, color: 'var(--color-muted-gray)', lineHeight: 1.7 }}>Paschim Vihar Phase 2<br />Hisar, Haryana 125001<br />India</p>
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <button className="btn btn-dark" style={{ height: 38, padding: '0 16px', fontSize: 11 }}>EDIT</button>
                  <button className="btn btn-secondary" style={{ height: 38, padding: '0 16px', fontSize: 11 }}>REMOVE</button>
                </div>
              </div>
            </div>
          ) : (
            // Overview
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
                {[
                  { label: 'Total Orders', value: mockOrders.length, sub: 'lifetime orders', href: '/account/orders' },
                  { label: 'Wishlist Items', value: 0, sub: 'saved pieces', href: '/wishlist' },
                  { label: 'Saved Addresses', value: 1, sub: 'delivery addresses', href: '/account/addresses' },
                ].map((card) => (
                  <Link key={card.label} to={card.href} style={{ background: 'var(--color-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 24, transition: 'border-color 0.2s ease', display: 'block' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                  >
                    <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 42, fontWeight: 400, color: 'var(--color-gold)', marginBottom: 4 }}>{card.value}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{card.label}</p>
                    <p style={{ fontSize: 12, color: 'var(--color-dark-gray)' }}>{card.sub}</p>
                  </Link>
                ))}
              </div>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 24, marginBottom: 20 }}>Recent Orders</h2>
              {mockOrders.slice(0, 2).map((o) => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: 4 }}>{o.id}</p>
                    <p style={{ fontSize: 13, color: 'var(--color-dark-gray)' }}>{o.date} · {o.items} items · ₹{o.total.toLocaleString('en-IN')}</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: statusColors[o.status] }}>{o.status}</span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
