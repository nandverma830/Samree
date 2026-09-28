import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronLeft, ChevronRight, Shield, RotateCcw,
  Truck, Star, Quote, ShoppingBag, Heart
} from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/ui/SocialIcons';
import ProductCard from '../components/ui/ProductCard';
import { products, testimonials } from '../data/products';
import { useStore } from '../context/StoreContext';
import './Home.css';

// Hero Slides matching luxury aesthetic with verified high-res assets
const heroSlides = [
  {
    id: 1,
    tag: 'HAUTE COUTURE & ACCESSORIES',
    title: 'GOLD & ELEGANCE',
    subtitle: 'Our luxury brand is for quality, styling luxury brand, sophistication and preeminent realities.',
    ctaText: 'DISCOVER NOW',
    ctaLink: '/shop',
    modelImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=85',
  },
  {
    id: 2,
    tag: 'SIGNATURE COLLECTION 2026',
    title: 'TIMELESS NOIR',
    subtitle: 'Impeccable tailoring, architectural silhouettes, and understated modern distinction designed to endure.',
    ctaText: 'EXPLORE COLLECTION',
    ctaLink: '/collections',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85',
  },
  {
    id: 3,
    tag: 'THE FINE JEWELLERY EDIT',
    title: 'AURA OF LUXURY',
    subtitle: 'Mastercrafted 18k gold accents, precision chronographs, and heirloom accessories for the discerning collector.',
    ctaText: 'SHOP THE EDIT',
    ctaLink: '/shop?collection=signature',
    modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85',
  },
];

// Showcase Products with verified non-broken URLs
const showcaseProducts = [
  {
    id: 10,
    slug: 'aurora-watch',
    name: 'AURORA WATCH',
    price: '₹1,200',
    numericPrice: 1200,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=85',
  },
  {
    id: 11,
    slug: 'velvet-clutch',
    name: 'VELVET CLUTCH',
    price: '₹1,200',
    numericPrice: 1200,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=85',
  },
  {
    id: 12,
    slug: 'gld-bracelet',
    name: 'GLD BRACELET',
    price: '₹1,200',
    numericPrice: 1200,
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=85',
  },
  {
    id: 13,
    slug: 'silk-scarf',
    name: 'SILK SCARF',
    price: '₹7,200',
    numericPrice: 7200,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=85',
  },
];

const curatedCollections = [
  {
    title: 'Women',
    tag: 'HAUTE COUTURE',
    desc: 'Refined modern tailoring, sculptural silk gowns & elevated blazers.',
    href: '/collections/women',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80',
    gridSpan: 'span-2',
  },
  {
    title: 'Men',
    tag: 'SAVILE BESPOKE',
    desc: 'Impeccable wool coats, structured tuxedos & cashmere knits.',
    href: '/collections/men',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    gridSpan: 'span-1',
  },
  {
    title: 'Fine Jewellery & Watches',
    tag: 'PRECISION',
    desc: 'Chronographs, 18k solid gold cuffs & sculpted rings.',
    href: '/shop?collection=signature',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    gridSpan: 'span-1',
  },
  {
    title: 'SAMREE Luxury Grocery',
    tag: 'GOURMET PANTRY',
    desc: 'Organic cold-pressed oils, rare single-origin teas & California almonds.',
    href: '/grocery',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    gridSpan: 'span-2',
  },
];

const instagramPhotos = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const { addToCart, addToast } = useStore();

  // Auto advance Hero slide every 5.5s with pause on hover
  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered]);

  // Auto advance Testimonial carousel every 5s with pause on hover
  useEffect(() => {
    if (isTestimonialHovered) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestimonialHovered]);

  const nextHeroSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevHeroSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const slide = heroSlides[currentSlide];
  const curTestimonial = testimonials[activeTestimonial];

  const handleHeroQuickAdd = (p, e) => {
    e.preventDefault();
    e.stopPropagation();
    const productItem = products.find((prod) => prod.id === p.id) || {
      id: p.id,
      name: p.name,
      price: p.numericPrice,
      images: [p.image],
      slug: p.slug,
    };
    addToCart(productItem, 'One Size', 'Gold', 1);
  };

  return (
    <div className="samree-home-root">
      {/* ────────────────────────────────────────────────────────
          1. HERO SECTION (FULL-BLEED BACKGROUND SLIDER & LUXURY STAGE)
      ──────────────────────────────────────────────────────── */}
      <section
        className="hero-mockup-wrapper"
        aria-label="Hero Spotlight"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        {/* Full Slider Background Images (pure slider k piche) */}
        <div className="hero-full-slider-bg" aria-hidden="true">
          {heroSlides.map((s, idx) => (
            <div
              key={s.id}
              className={`hero-bg-slide ${idx === currentSlide ? 'active' : ''}`}
            >
              <img
                src={s.modelImage}
                alt=""
                className="hero-bg-slide-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&q=85';
                }}
              />
            </div>
          ))}

          {/* Luxury Multi-layer Gradient Overlays for pristine typography legibility */}
          <div className="hero-bg-overlay-left" />
          <div className="hero-bg-overlay-top" />
          <div className="hero-bg-overlay-bottom" />
          <div className="hero-bg-overlay-vignette" />
        </div>

        {/* Ambient Dark Spotlight Glow */}
        <div className="hero-ambient-glow" />

        <div className="container hero-mockup-container">
          <div className="hero-split-stage">
            {/* Left: Text, CTA & Slide Controls */}
            <div className="hero-left-content">
              <span className="hero-gold-tag">{slide.tag}</span>
              <h1 className="hero-gold-headline" key={`head-${currentSlide}`}>
                {slide.title}
              </h1>
              <p className="hero-gold-subtext" key={`sub-${currentSlide}`}>
                {slide.subtitle}
              </p>
              
              <div className="hero-cta-group">
                <Link to={slide.ctaLink} className="hero-discover-btn">
                  {slide.ctaText} <ArrowRight size={14} style={{ marginLeft: 6 }} />
                </Link>
                <Link to="/collections" className="hero-text-link">
                  VIEW LOOKBOOK <ArrowRight size={13} />
                </Link>
              </div>

              {/* Slider Progress Bar & Controls */}
              <div className="hero-nav-controls">
                <button
                  className="hero-arrow-btn"
                  onClick={prevHeroSlide}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="hero-progress-line-track">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`hero-progress-seg ${idx === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  className="hero-arrow-btn"
                  onClick={nextHeroSlide}
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>

                <span className="hero-slide-counter">
                  0{currentSlide + 1} <span className="hero-counter-sep">/</span> 0{heroSlides.length}
                </span>
              </div>
            </div>

            {/* Right: Floating Luxury Atelier Callout over Full Background */}
            <div className="hero-right-visual">
              <div className="hero-editorial-badge">
                <div className="hero-badge-header">
                  <span className="hero-badge-kicker">SAMREE ATELIER</span>
                  <span className="hero-badge-edition">EDITION 0{currentSlide + 1}</span>
                </div>
                <h2 className="hero-badge-title">{slide.title}</h2>
                <p className="hero-badge-detail">
                  Sculpted silhouettes, artisanal finishes and rare craftsmanship tailored for timeless luxury.
                </p>
                <div className="hero-badge-footer">
                  <Link to="/collections" className="hero-badge-link">
                    EXPLORE EDIT <ArrowRight size={12} />
                  </Link>
                  <span className="hero-badge-provenance">MMXXVI</span>
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────
              2. FOUR FLOATING SHOWCASE CARDS
          ──────────────────────────────────────────────────────── */}
          <div className="hero-showcase-row">
            {showcaseProducts.map((p) => (
              <div key={p.id} className="hero-showcase-card">
                <Link to={`/product/${p.slug}`} className="showcase-img-link">
                  <div className="showcase-img-box">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="showcase-img"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80';
                      }}
                    />
                  </div>
                </Link>

                <div className="showcase-info-bar">
                  <div className="showcase-text">
                    <h3 className="showcase-title">{p.name}</h3>
                    <p className="showcase-price">{p.price}</p>
                  </div>
                  <button
                    className="showcase-shop-action"
                    onClick={(e) => handleHeroQuickAdd(p, e)}
                    aria-label={`Quick add ${p.name}`}
                  >
                    <ShoppingBag size={13} className="showcase-bag-icon" />
                    <span>SHOP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          3. BENEFITS BAR WITH GOLD GLOW DIVIDERS
      ──────────────────────────────────────────────────────── */}
      <section className="samree-benefits-bar" aria-label="Brand Benefits">
        <div className="container benefits-inner">
          <div className="benefit-cell">
            <Shield size={20} className="benefit-gold-icon" />
            <div>
              <h4 className="benefit-h">EXQUISITE QUALITY</h4>
              <p className="benefit-p">Mastercrafted with verified materials</p>
            </div>
          </div>
          <div className="benefit-cell">
            <Truck size={20} className="benefit-gold-icon" />
            <div>
              <h4 className="benefit-h">INSURED COURIER</h4>
              <p className="benefit-p">Complimentary Pan-India white-glove express dispatch</p>
            </div>
          </div>
          <div className="benefit-cell">
            <RotateCcw size={20} className="benefit-gold-icon" />
            <div>
              <h4 className="benefit-h">DISCREET RETURNS</h4>
              <p className="benefit-p">15-day complimentary doorstep return & exchange</p>
            </div>
          </div>
          <div className="benefit-cell">
            <Star size={20} className="benefit-gold-icon" />
            <div>
              <h4 className="benefit-h">AUTHENTIC LUXURY</h4>
              <p className="benefit-p">Direct from our heritage workshops</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          4. CURATED COLLECTIONS MOSAIC
      ──────────────────────────────────────────────────────── */}
      <section className="curated-mosaic-section" aria-label="Collections">
        <div className="container">
          <div className="section-head text-center">
            <span className="gold-eyebrow">CURATED PIECES</span>
            <h2 className="luxury-serif-title">Explore by Domain</h2>
            <p className="section-subtext">Four expressions of modern luxury, engineered without compromise.</p>
          </div>

          <div className="collections-mosaic-grid">
            {curatedCollections.map((col, idx) => (
              <Link to={col.href} key={idx} className={`mosaic-card ${col.gridSpan}`}>
                <img
                  src={col.image}
                  alt={col.title}
                  className="mosaic-bg-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80';
                  }}
                />
                <div className="mosaic-gradient-overlay" />
                <div className="mosaic-content">
                  <span className="mosaic-tag">{col.tag}</span>
                  <h3 className="mosaic-title">{col.title}</h3>
                  <p className="mosaic-desc">{col.desc}</p>
                  <span className="mosaic-cta">
                    DISCOVER <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          5. FEATURED SIGNATURE PRODUCTS
      ──────────────────────────────────────────────────────── */}
      <section className="featured-gallery-section" aria-label="Signature Releases">
        <div className="container">
          <div className="section-head-split">
            <div>
              <span className="gold-eyebrow">THE ARCHIVE</span>
              <h2 className="luxury-serif-title">Signature Releases</h2>
            </div>
            <Link to="/shop" className="view-archive-link">
              VIEW COMPLETE CATALOG <ArrowRight size={14} />
            </Link>
          </div>

          <div className="product-grid">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} isDark={true} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          6. BRAND PHILOSOPHY SPREAD
      ──────────────────────────────────────────────────────── */}
      <section className="editorial-spread-section" aria-label="Brand Philosophy">
        <div className="container">
          <div className="spread-grid">
            <div className="spread-visual-box">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85"
                alt="Brand Aesthetic"
                className="spread-img"
              />
              <div className="spread-gold-frame" />
            </div>

            <div className="spread-text-box">
              <span className="gold-eyebrow">PHILOSOPHY & VISION</span>
              <h2 className="luxury-serif-title" style={{ fontSize: 36, lineHeight: 1.2 }}>
                Luxury Lives in the Quiet Details.
              </h2>
              <p className="spread-paragraph">
                Born with the conviction that elegance is not about being noticed, but being remembered. Every silhouette in our ateliers undergoes exacting tailoring, using pure silks, virgin wools, and certified conflict-free gold hardware.
              </p>
              <div className="spread-points">
                <div className="spread-point">
                  <span className="point-number">01</span>
                  <div>
                    <h4 className="point-title">Sartorial Precision</h4>
                    <p className="point-desc">Couture drape crafted to flatter movement naturally.</p>
                  </div>
                </div>
                <div className="spread-point">
                  <span className="point-number">02</span>
                  <div>
                    <h4 className="point-title">Lasting Artistry</h4>
                    <p className="point-desc">Designed to transcend seasonal trends for enduring beauty.</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="hero-discover-btn" style={{ marginTop: 36, display: 'inline-flex' }}>
                DISCOVER OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          7. SAMREE GOURMET & PANTRY (DARK LUXURY GROCERY)
      ──────────────────────────────────────────────────────── */}
      <section className="grocery-noir-section" aria-label="SAMREE Gourmet">
        <div className="container">
          <div className="grocery-noir-inner">
            <div className="grocery-noir-text">
              <span className="gold-eyebrow">THE GOURMET ARCHIVE</span>
              <h2 className="luxury-serif-title" style={{ fontSize: 36 }}>
                Everyday Essentials, Elevated.
              </h2>
              <p className="grocery-noir-desc">
                From hand-selected California almonds to single-estate Darjeeling teas and organic cold-pressed oils. Everyday living deserves extraordinary quality.
              </p>

              <div className="grocery-noir-pills">
                {['Single-Origin Teas', 'Artisanal Pantry', 'Cold-Pressed Oils', 'Roasted Almonds'].map((item) => (
                  <span key={item} className="grocery-noir-pill">
                    {item}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
                <Link to="/grocery" className="hero-discover-btn">
                  SHOP THE PANTRY
                </Link>
                <Link to="/grocery" className="hero-text-link" style={{ alignSelf: 'center' }}>
                  VIEW ALL ESSENTIALS <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="grocery-noir-media">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                alt="Gourmet Pantry"
                className="grocery-noir-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          8. TESTIMONIALS & CLIENT REVIEWS (WITH CLIENT IMAGE & AUTO-SLIDE)
      ──────────────────────────────────────────────────────── */}
      <section
        className="testimonials-dark-section"
        aria-label="Client Testimonials"
        onMouseEnter={() => setIsTestimonialHovered(true)}
        onMouseLeave={() => setIsTestimonialHovered(false)}
      >
        <div className="container text-center">
          <span className="gold-eyebrow">CLIENT TESTIMONIALS</span>
          <h2 className="luxury-serif-title" style={{ fontSize: 32, marginBottom: 40 }}>
            Voices of Our Patrons
          </h2>

          <div className="patrons-stage-wrapper">
            <button
              type="button"
              className="testimonial-nav-arrow prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Hardware-accelerated sliding carousel viewport & track */}
            <div className="patrons-carousel-viewport">
              <div
                className="patrons-carousel-track"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((t, idx) => (
                  <div
                    key={t.id || idx}
                    className={`patrons-slide-item ${idx === activeTestimonial ? 'active' : ''}`}
                  >
                    <div className="patrons-quote-card">
                      {/* Patron Avatar with ambient gold halo */}
                      <div className="testimonial-avatar-wrap">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="testimonial-avatar-img"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80';
                          }}
                        />
                        <div className="testimonial-avatar-ring" />
                      </div>

                      {/* 5-Star Rating in Gold */}
                      <div className="testimonial-stars-row">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} size={15} fill="var(--color-gold)" color="var(--color-gold)" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="testimonial-quote-text">
                        "{t.quote}"
                      </blockquote>

                      {/* Patron Metadata */}
                      <p className="testimonial-collector-name">
                        {t.name}
                      </p>
                      <p className="testimonial-collector-role">
                        {t.role} — <span>{t.location}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="testimonial-nav-arrow next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="testimonial-dots-row">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`testimonial-dot-btn ${i === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          9. INSTAGRAM EDITORIAL VIGNETTES
      ──────────────────────────────────────────────────────── */}
      <section className="instagram-noir-section" aria-label="Instagram">
        <div className="container">
          <div className="instagram-head">
            <h2 className="luxury-serif-title" style={{ fontSize: 28 }}>The World of SAMREE</h2>
            <p style={{ color: 'var(--color-dark-gray)', fontSize: 13, marginTop: 4 }}>
              Follow our visual diary <strong style={{ color: 'var(--color-gold)' }}>@SAMREE_OFFICIAL</strong>
            </p>
          </div>
        </div>
        <div className="instagram-six-grid">
          {instagramPhotos.map((photo, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="insta-tile">
              <img src={photo} alt={`SAMREE aesthetic ${i + 1}`} loading="lazy" />
              <div className="insta-hover-overlay">
                <Instagram size={24} color="#C9A15B" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          10. VIP PRIVÉ NEWSLETTER
      ──────────────────────────────────────────────────────── */}
      <section className="newsletter-prive-section" aria-label="VIP Newsletter">
        <div className="container text-center">
          <span className="gold-eyebrow">BY INVITATION</span>
          <h2 className="luxury-serif-title" style={{ fontSize: 34, marginBottom: 12 }}>
            Join the SAMREE Privé Club
          </h2>
          <p style={{ color: 'var(--color-muted-gray)', fontSize: 14, maxWidth: 500, margin: '0 auto 32px' }}>
            Receive priority invitations to private archive releases, bespoke trunk shows, and seasonal previews.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addToast('Welcome to the SAMREE Privé Club.', 'success');
            }}
            className="prive-form"
          >
            <input
              type="email"
              required
              placeholder="Enter your confidential email..."
              className="prive-input"
            />
            <button type="submit" className="hero-discover-btn prive-btn">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
