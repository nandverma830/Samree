import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const sections = [
    { title: '01 Our Story', content: 'SAMREE was born from a simple belief: that quality products, thoughtfully chosen, can transform the everyday. Founded in Hisar, Haryana, we\'ve grown into a curated marketplace that brings together premium fashion, lifestyle essentials and quality grocery items — all under one roof.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', imgLeft: false },
    { title: '02 Our Philosophy', content: 'Every item we stock is evaluated on quality, design and lasting value. We don\'t chase trends — we curate pieces that transcend them. Our philosophy is rooted in the belief that style is a quiet language of intentionality.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', imgLeft: true },
    { title: '03 Our Commitment to Quality', content: 'We partner only with brands and suppliers who share our standards. From the fabric of a tailored blazer to the freshness of pantry essentials — quality is non-negotiable at SAMREE.', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', imgLeft: false },
  ];

  return (
    <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 560, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85" alt="About SAMREE" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.2))' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="eyebrow">OUR STORY</span>
          <h1 className="editorial-heading h2" style={{ maxWidth: 560 }}>
            More Than Shopping.<br />A World of SAMREE.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 460, marginTop: 16, lineHeight: 1.8 }}>
            SAMREE is built around thoughtful selection, modern style and a belief that everyday products can feel extraordinary.
          </p>
        </div>
      </div>

      {/* Alternating Sections */}
      {sections.map((s, i) => (
        <div key={s.title} style={{ background: i % 2 === 0 ? 'var(--color-primary-black)' : 'var(--color-warm-ivory)', padding: '80px 0' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            {s.imgLeft ? (
              <>
                <div style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <span className="eyebrow">{s.title}</span>
                  <p style={{ fontSize: 16, lineHeight: 1.85, color: i % 2 === 0 ? 'var(--color-muted-gray)' : '#4a4235', marginTop: 8 }}>{s.content}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="eyebrow">{s.title}</span>
                  <p style={{ fontSize: 16, lineHeight: 1.85, color: i % 2 === 0 ? 'var(--color-muted-gray)' : '#4a4235', marginTop: 8 }}>{s.content}</p>
                </div>
                <div style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Customer Promise */}
      <div style={{ background: 'var(--color-deep-black)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow">OUR CUSTOMER PROMISE</span>
          <h2 className="editorial-heading h2" style={{ marginBottom: 20 }}>You Deserve the Best.</h2>
          <p style={{ color: 'var(--color-muted-gray)', fontSize: 16, maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.8 }}>
            Every order placed with SAMREE comes with our commitment to quality, care and genuine service — from the moment you browse to long after delivery.
          </p>
          <Link to="/shop" className="btn btn-primary">EXPLORE SAMREE <ArrowRight size={14} className="arrow-icon" /></Link>
        </div>
      </div>
    </div>
  );
}
