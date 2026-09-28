import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections } from '../data/products';

export default function CollectionsPage() {
  return (
    <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--color-deep-black)', padding: '80px 0 60px', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,161,91,0.06) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" style={{ marginBottom: 20 }}>
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: 'var(--color-gold)' }}>Collections</span>
          </nav>
          <span className="eyebrow">EXPLORE</span>
          <h1 className="editorial-heading h2">Our Collections</h1>
          <p style={{ color: 'var(--color-muted-gray)', fontSize: 16, marginTop: 12, maxWidth: 500 }}>
            Explore carefully curated SAMREE collections designed for modern living.
          </p>
        </div>
      </div>

      {/* Collection Cards */}
      <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {collections.map((col) => (
            <Link key={col.id} to={col.slug} style={{ display: 'block', position: 'relative', borderRadius: 6, overflow: 'hidden', aspectRatio: '3/4' }}>
              <img src={col.image} alt={col.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.1) 70%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px' }}>
                <p style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 8 }}>
                  {col.productCount} Products
                </p>
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 28, fontWeight: 400, color: 'var(--color-pure-white)', marginBottom: 8 }}>
                  {col.name}
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>{col.description}</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  Explore Collection <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
