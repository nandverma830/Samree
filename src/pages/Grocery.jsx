import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { groceryProducts } from '../data/products';
import { ShoppingCart, Plus, Minus, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const cats = ['All', 'Fresh & Everyday', 'Pantry Staples', 'Beverages', 'Snacks', 'Personal Care', 'Household'];

export default function GroceryPage() {
  const [activecat, setActivecat] = useState('All');
  const [quantities, setQuantities] = useState({});
  const { addToCart, addToast } = useStore();

  const addQty = (id) => setQuantities((q) => ({ ...q, [id]: (q[id] || 0) + 1 }));
  const subQty = (id) => setQuantities((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) - 1) }));

  const handleAdd = (p) => {
    const qty = quantities[p.id] || 1;
    addToCart(p, null, null, qty);
    setQuantities((q) => ({ ...q, [p.id]: 0 }));
  };

  return (
    <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', padding: '80px 0 60px', background: 'var(--color-warm-ivory)', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow">SAMREE GROCERY</span>
          <h1 className="editorial-heading h2" style={{ color: 'var(--color-primary-black)', marginBottom: 16, marginTop: 4 }}>
            Everyday Essentials,<br />Elevated.
          </h1>
          <p style={{ fontSize: 16, color: '#4a4235', lineHeight: 1.75, maxWidth: 520, marginBottom: 32 }}>
            From pantry staples to everyday necessities, discover quality products selected for convenience and thoughtful living.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 4, padding: '0 16px', maxWidth: 400 }}>
            <Search size={18} style={{ color: '#888' }} />
            <input placeholder="Search groceries..." style={{ flex: 1, height: 48, background: 'none', border: 'none', outline: 'none', fontSize: 15, color: 'var(--color-primary-black)' }} />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ background: 'var(--color-deep-black)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActivecat(c)}
                style={{
                  padding: '18px 24px', fontSize: 12, fontWeight: 600, letterSpacing: 1.2,
                  textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', border: 'none',
                  background: 'none', color: activecat === c ? 'var(--color-gold)' : 'var(--color-dark-gray)',
                  borderBottom: activecat === c ? '2px solid var(--color-gold)' : '2px solid transparent',
                  transition: 'color 0.2s ease, border-bottom 0.2s ease',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {groceryProducts.map((p) => (
            <div key={p.id} style={{ background: 'var(--color-elevated)', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <div style={{ aspectRatio: '1', overflow: 'hidden', position: 'relative' }}>
                <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {p.badge && (
                  <span className={`badge badge-${p.badge.toLowerCase()}`} style={{ position: 'absolute', top: 10, left: 10 }}>{p.badge}</span>
                )}
                {p.discount && (
                  <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--color-gold)', color: 'var(--color-primary-black)', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 3 }}>
                    {p.discount}% OFF
                  </span>
                )}
              </div>
              <div style={{ padding: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-pure-white)', marginBottom: 4, lineHeight: 1.3 }}>{p.name}</p>
                <p style={{ fontSize: 12, color: 'var(--color-dark-gray)', marginBottom: 10 }}>{p.weight}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-pure-white)' }}>₹{p.price}</span>
                  {p.comparePrice && <span style={{ fontSize: 12, color: 'var(--color-dark-gray)', textDecoration: 'line-through' }}>₹{p.comparePrice}</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: 3 }}>
                    <button onClick={() => subQty(p.id)} style={{ width: 30, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted-gray)', cursor: 'pointer', fontSize: 16 }}>
                      <Minus size={12} />
                    </button>
                    <span style={{ width: 30, textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--color-pure-white)', borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)', height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {quantities[p.id] || 1}
                    </span>
                    <button onClick={() => addQty(p.id)} style={{ width: 30, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted-gray)', cursor: 'pointer' }}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <button onClick={() => handleAdd(p)} className="btn btn-primary" style={{ flex: 1, height: 34, fontSize: 11, padding: '0 12px', gap: 6 }}>
                    <ShoppingCart size={12} /> ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
