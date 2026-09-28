import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart, ShoppingBag, Star, Shield, Truck, RotateCcw,
  Award, ChevronDown, Plus, Minus, ArrowRight, ZoomIn,
  CheckCircle2, Sparkles, X, Share2, ThumbsUp, Ruler, Package,
  Camera, Filter, Search, SlidersHorizontal, Check, CornerDownRight,
  Eye, MessageSquare, MapPin, BadgeCheck
} from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import SEO from '../components/common/SEO';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import './ProductDetail.css';

// Verified Patron Reviews across India
const defaultPatronReviews = [
  {
    id: 1,
    author: 'Rajiv Malhotra',
    location: 'Bandra West, Mumbai',
    initials: 'RM',
    verified: true,
    rating: 5,
    date: '18 September 2026',
    title: 'An undeniable triumph of modern haute luxury & craftsmanship.',
    comment: 'The craftsmanship on this piece exceeded every expectation. The weight in hand, the finishing on the chamfered edges, and the subtle luster under candlelight reflect true atelier heritage. Arrived in a gorgeous magnetic rigid box with a serialised certificate via BlueDart Express in pristine condition within 48 hours to Mumbai.',
    helpfulCount: 42,
    size: 'Classic 42mm',
    color: 'Black Gold',
    dimensions: { craftsmanship: 5, packaging: 5, comfort: 5 },
    recommend: true,
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=85',
        caption: 'Wrist presence under natural Mumbai daylight'
      },
      {
        url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=85',
        caption: 'Unboxing presentation with magnetic rigid box'
      }
    ],
    atelierResponse: {
      author: 'SAMREE Atelier Concierge',
      date: '19 September 2026',
      message: 'Dear Mr. Malhotra, we are deeply honoured that the Aurora Watch graces your distinguished collection. May it accompany you in timeless elegance.'
    }
  },
  {
    id: 2,
    author: 'Dr. Ananya Sengupta',
    location: 'Vasant Vihar, New Delhi',
    initials: 'AS',
    verified: true,
    rating: 5,
    date: '12 September 2026',
    title: 'Impeccable proportions and flawless warm gold finish.',
    comment: 'Having acquired luxury pieces from Milan and Geneva for years, SAMREE’s execution stands shoulder-to-shoulder with the finest global fashion houses. The anti-reflective sapphire crystal is crystal clear, and the attention to ergonomic comfort is second to none. Pan-India delivery was flawless.',
    helpfulCount: 29,
    size: 'One Size',
    color: 'Polished Steel',
    dimensions: { craftsmanship: 5, packaging: 5, comfort: 5 },
    recommend: true,
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=85',
        caption: 'Detailed view of the brushed bezel and indices'
      }
    ],
    atelierResponse: null
  },
  {
    id: 3,
    author: 'Vikramaditya Roy',
    location: 'Indiranagar, Bengaluru',
    initials: 'VR',
    verified: true,
    rating: 5,
    date: '28 August 2026',
    title: 'The packaging and presentation alone are a bespoke experience.',
    comment: 'Unboxing this piece was sheer delight. The embossed velvet pouch, heavy magnetic hard-box, and handwritten wax-sealed care envelope speak volumes about SAMREE’s devotion to prestige. Delivery across India was prompt and safely insured.',
    helpfulCount: 18,
    size: 'Classic 42mm',
    color: 'Black Gold',
    dimensions: { craftsmanship: 5, packaging: 5, comfort: 5 },
    recommend: true,
    photos: [],
    atelierResponse: null
  },
  {
    id: 4,
    author: 'Meera Singhania',
    location: 'Alipore, Kolkata',
    initials: 'MS',
    verified: true,
    rating: 4,
    date: '14 August 2026',
    title: 'Remarkable tactile presence and refined evening styling.',
    comment: 'The timepiece is wonderfully weighted and drew numerous compliments at a recent festive gala. The supple leather strap required just a single day to soften completely. Exceptional client care from the concierge desk.',
    helpfulCount: 14,
    size: 'Standard',
    color: 'Black Gold',
    dimensions: { craftsmanship: 5, packaging: 4, comfort: 4 },
    recommend: true,
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85',
        caption: 'Evening festive styling with classic gold cuff'
      }
    ],
    atelierResponse: {
      author: 'SAMREE Atelier Concierge',
      date: '15 August 2026',
      message: 'Warmest regards, Ms. Singhania. We are thrilled that the piece added grace to your evening occasion.'
    }
  },
  {
    id: 5,
    author: 'Rohan Singhal',
    location: 'C-Scheme, Jaipur',
    initials: 'RS',
    verified: true,
    rating: 5,
    date: '02 August 2026',
    title: 'Superb gold luster and dependable precision.',
    comment: 'The champagne gold bezel matches traditional Indian festive sherwanis as seamlessly as it complements sharp corporate blazers. Truly versatile heirloom craftsmanship.',
    helpfulCount: 9,
    size: 'Classic 42mm',
    color: 'Signature Gold',
    dimensions: { craftsmanship: 5, packaging: 5, comfort: 5 },
    recommend: true,
    photos: [],
    atelierResponse: null
  }
];

const patronGalleryPhotos = [
  {
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=85',
    author: 'Rajiv M.',
    city: 'Mumbai',
    caption: 'Natural sunlight wrist presence'
  },
  {
    url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=85',
    author: 'Dr. Ananya S.',
    city: 'New Delhi',
    caption: 'Unboxing on marble desk with wax seal'
  },
  {
    url: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=85',
    author: 'Vikramaditya R.',
    city: 'Bengaluru',
    caption: 'Bezel & sapphire anti-glare inspection'
  },
  {
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85',
    author: 'Meera S.',
    city: 'Kolkata',
    caption: 'Paired with festive 18k gold heirlooms'
  },
  {
    url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=85',
    author: 'Rohan S.',
    city: 'Jaipur',
    caption: 'Ergonomic clasp and profile detail'
  }
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug) || products[0];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const { addToCart, toggleWishlist, isInWishlist, addToast } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colorNames?.[0] || 'Signature Gold');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('Narrative');
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  // Reviews & Patron State
  const [reviewsList, setReviewsList] = useState(defaultPatronReviews);
  const [activeStarFilter, setActiveStarFilter] = useState(null);
  const [filterWithPhotosOnly, setFilterWithPhotosOnly] = useState(false);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('helpful');
  const [helpfulClicked, setHelpfulClicked] = useState({});

  // Modals state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [patronLightboxPhoto, setPatronLightboxPhoto] = useState(null);

  // Write Review Form State
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formCraftRating, setFormCraftRating] = useState(5);
  const [formPackRating, setFormPackRating] = useState(5);
  const [formRecommend, setFormRecommend] = useState(true);
  const [formIncludePhoto, setFormIncludePhoto] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    addToast(`${product.name} added to your Shopping Bag`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    window.location.href = '/checkout';
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryResult({
        date: 'Wednesday, Sep 30, 2026',
        city: 'Blue Dart / Delhivery Air Priority',
        free: true,
      });
    } else {
      addToast('Please enter a valid 6-digit Pincode (e.g. 110001)', 'error');
    }
  };

  const handleHelpful = (id) => {
    if (helpfulClicked[id]) return;
    setHelpfulClicked((prev) => ({ ...prev, [id]: true }));
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    addToast('Marked as helpful. Thank you for your feedback!', 'info');
  };

  const handleShareReview = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Review link copied to clipboard.', 'info');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formComment.trim()) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    const initials = formName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'PT';

    const newRev = {
      id: Date.now(),
      author: formName.trim(),
      location: formCity.trim() || 'India',
      initials,
      verified: true,
      rating: formRating,
      date: 'Just now',
      title: formTitle.trim(),
      comment: formComment.trim(),
      helpfulCount: 1,
      size: selectedSize,
      color: selectedColor,
      dimensions: { craftsmanship: formCraftRating, packaging: formPackRating, comfort: formRating },
      recommend: formRecommend,
      photos: formIncludePhoto
        ? [
            {
              url: product.images[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=85',
              caption: `Patron look by ${formName.trim()}`
            }
          ]
        : [],
      atelierResponse: {
        author: 'SAMREE Atelier Concierge',
        date: 'Just now',
        message: `Thank you, ${formName.trim()}, for your gracious feedback. We take immense pride in ensuring every creation reflects our highest standards of craftsmanship.`
      }
    };

    setReviewsList([newRev, ...reviewsList]);
    setWriteReviewOpen(false);

    // Reset Form
    setFormTitle('');
    setFormComment('');
    setFormName('');
    setFormCity('');
    setFormRating(5);
    setFormIncludePhoto(false);

    addToast('Your review has been verified and published to the patron record!', 'success');

    // Smooth scroll to reviews
    setTimeout(() => {
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    return reviewsList
      .filter((r) => {
        if (activeStarFilter && r.rating !== activeStarFilter) return false;
        if (filterWithPhotosOnly && (!r.photos || r.photos.length === 0)) return false;
        if (filterVerifiedOnly && !r.verified) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchComment = r.comment.toLowerCase().includes(q);
          const matchAuthor = r.author.toLowerCase().includes(q);
          const matchCity = r.location?.toLowerCase().includes(q);
          if (!matchTitle && !matchComment && !matchAuthor && !matchCity) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
        if (sortBy === 'highest') return b.rating - a.rating;
        if (sortBy === 'lowest') return a.rating - b.rating;
        return b.id - a.id; // recent
      });
  }, [reviewsList, activeStarFilter, filterWithPhotosOnly, filterVerifiedOnly, searchQuery, sortBy]);

  const starCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsList.forEach((r) => {
      if (counts[r.rating] !== undefined) counts[r.rating]++;
    });
    return counts;
  }, [reviewsList]);

  const totalReviewsCount = reviewsList.length + 43; // augmented aggregate count for atelier realism

  const accordions = [
    {
      key: 'Narrative',
      label: 'The Design Narrative & Silhouette',
      content: (
        <div>
          <p style={{ marginBottom: 12 }}>
            {product.description ||
              'Sculpted with rigorous attention to architectural proportion and modern elegance. Designed for the discerning patron who values understated luxury and flawless refinement.'}
          </p>
          <p>
            Every contour is engineered to balance visual drama with wearable comfort. Whether paired with structured evening tailoring or styled effortlessly for daytime salons, this creation exudes quiet distinction.
          </p>
        </div>
      ),
    },
    {
      key: 'Material',
      label: 'Artisanal Materials & Composition',
      content: (
        <div>
          <p style={{ marginBottom: 10 }}>
            <strong>Primary Composition:</strong> {product.material || '100% Fine Mulberry Silk, 18k Solid Gold Finish Hardware, 316L Surgical Grade Steel.'}
          </p>
          <p style={{ marginBottom: 10 }}>
            <strong>Origin:</strong> Handcrafted in small, numbered batches in our partner ateliers across Milan, Florence and Valenza.
          </p>
          <p>
            <strong>Hypoallergenic:</strong> Nickel-free, certified skin-safe metals treated with protective anti-tarnish micro-coating.
          </p>
        </div>
      ),
    },
    {
      key: 'Care',
      label: 'Care & Preservation Instructions',
      content: (
        <div>
          <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Store in the provided SAMREE velvet dust pouch away from direct heat and moisture.</li>
            <li>Avoid direct contact with perfumes, lotions, chlorine, or abrasive chemicals.</li>
            <li>Gently polish surfaces using the included microfibre chamois cloth.</li>
            <li>For bespoke dry-cleaning or fine jewellery ultrasonic inspection, visit a certified luxury specialist.</li>
          </ul>
        </div>
      ),
    },
    {
      key: 'Packaging',
      label: 'Complimentary White-Glove Packaging',
      content: (
        <div>
          <p style={{ marginBottom: 10 }}>
            Every SAMREE acquisition arrives wrapped as a collector’s heirloom:
          </p>
          <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Heavyweight obsidian-black magnetic gift box with hot-stamped gold foil logo.</li>
            <li>Bespoke embossed plush velvet protective pouch with satin drawstrings.</li>
            <li>Numbered Certificate of Authenticity and Patron Care Booklet.</li>
            <li>Complimentary personalised calligraphy gift message available at checkout.</li>
          </ul>
        </div>
      ),
    },
    {
      key: 'Shipping',
      label: 'Pan-India Insured Delivery & 15-Day Returns',
      content: (
        <div>
          <p style={{ marginBottom: 10 }}>
            <strong>Complimentary Express Courier:</strong> All domestic orders above ₹999 receive insured express courier delivery (2–4 business days) via Blue Dart / Delhivery Express. Same-day / next-day delivery available for NCR, Mumbai, Bengaluru, and major metros.
          </p>
          <p>
            <strong>Hassle-Free Returns:</strong> We offer 15-day doorstep reverse pickup across 19,000+ Indian pincodes in original, unblemished condition with security tags attached.
          </p>
        </div>
      ),
    },
  ];

  const ratingDescriptions = {
    5: 'Exceptional — True Atelier Masterpiece',
    4: 'Very Good — Highly Recommended',
    3: 'Satisfactory — Good Standard',
    2: 'Fair — Needs Attention',
    1: 'Poor — Disappointing'
  };

  return (
    <div className="product-detail-root">
      <SEO
        title={`${product.name} — Luxury ${product.category} | SAMREE`}
        description={`${product.name} by SAMREE. ${product.description} Handcrafted in fine luxury materials with complimentary bespoke packaging and pan-India express courier.`}
        canonical={`https://samree.com/product/${product.slug}`}
      />

      <div className="container product-detail-container">
        {/* ─── BREADCRUMB ─── */}
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/shop">Shop</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/collections/${product.category.toLowerCase()}`}>{product.category}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* ─── MAIN PRODUCT STAGE ─── */}
        <div className="product-main-grid">
          {/* Gallery Stage */}
          <div className="product-gallery-stage">
            {/* Thumbnails */}
            <div className="gallery-thumbs-col">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`gallery-thumb-btn ${i === selectedImage ? 'active' : ''}`}
                  aria-label={`View angle ${i + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>

            {/* Main Viewport */}
            <div
              className="gallery-main-viewport"
              onClick={() => setLightboxOpen(true)}
              title="Click to inspect in high resolution"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="gallery-main-img"
              />
              <span className="gallery-badge">
                {product.badge || 'ATELIER EDITION'}
              </span>

              {/* Floating Wishlist Button */}
              <button
                className="gallery-wishlist-float"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                aria-label="Save to Wishlist"
              >
                <Heart size={18} fill={inWishlist ? 'var(--color-gold)' : 'none'} color={inWishlist ? 'var(--color-gold)' : '#fff'} />
              </button>

              <button
                className="gallery-zoom-pill"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
              >
                <ZoomIn size={14} /> INSPECT
              </button>
            </div>
          </div>

          {/* Product Info Column */}
          <div className="product-info-col">
            <span className="product-kicker">SAMREE ATELIER • {product.category.toUpperCase()}</span>
            <h1 className="product-title">{product.name}</h1>

            {/* Ratings Ribbon */}
            <div className="product-rating-ribbon">
              <div className="rating-stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>
              <span className="rating-score-text">
                {product.rating || '4.9'} / 5.0
              </span>
              <a
                href="#reviews"
                className="rating-review-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ({totalReviewsCount} Verified Patron Reviews across India)
              </a>
              <span className="rating-recommend-pill">
                <Sparkles size={11} /> 98% Patron Recommendation
              </span>
            </div>

            {/* Price Row */}
            <div className="product-price-row">
              <span className="product-current-price">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.comparePrice && (
                <span className="product-compare-price">
                  ₹{product.comparePrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discount && (
                <span className="product-discount-badge">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            <p className="product-tax-note">
              <CheckCircle2 size={13} style={{ color: 'var(--color-gold)' }} />
              Inclusive of all applicable GST. Pan-India Express Delivery in bespoke magnetic luxury box.
            </p>

            {/* Color Swatch Selector */}
            {product.colorNames && product.colorNames.length > 0 && (
              <div className="product-option-section">
                <div className="option-header">
                  <span className="option-label">
                    COLOUR / ATELIER FINISH: <span className="option-selected-val">{selectedColor}</span>
                  </span>
                </div>
                <div className="color-swatches-cluster">
                  {product.colors?.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(product.colorNames[i])}
                      className={`color-swatch-ring-btn ${selectedColor === product.colorNames[i] ? 'active' : ''}`}
                      style={{ backgroundColor: c }}
                      title={product.colorNames[i]}
                      aria-label={product.colorNames[i]}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="product-option-section">
                <div className="option-header">
                  <span className="option-label">
                    SELECT SIZE: <span className="option-selected-val">{selectedSize}</span>
                  </span>
                  <button
                    type="button"
                    className="size-guide-trigger"
                    onClick={() => setSizeGuideOpen(true)}
                  >
                    <Ruler size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                    SIZE & FIT GUIDE
                  </button>
                </div>
                <div className="size-pills-cluster">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`size-pill-btn ${selectedSize === s ? 'active' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="quantity-and-action-row">
              <div className="product-qty-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="qty-step-btn"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="qty-display-val">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="qty-step-btn"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className="product-add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={16} /> ADD TO SHOPPING BAG
              </button>
            </div>

            {/* Instant Concierge Buy Now */}
            <button
              type="button"
              className="product-buy-now-btn"
              onClick={handleBuyNow}
            >
              ORDER WITH 1-CLICK CHECKOUT <ArrowRight size={14} />
            </button>

            {/* 4 Pillars of Luxury Trust */}
            <div className="product-pillars-grid">
              <div className="pillar-item">
                <div className="pillar-icon"><Shield size={18} /></div>
                <div className="pillar-label">100% AUTHENTIC</div>
                <div className="pillar-sub">Serialised atelier card</div>
              </div>
              <div className="pillar-item">
                <div className="pillar-icon"><Package size={18} /></div>
                <div className="pillar-label">GIFT PACKAGING</div>
                <div className="pillar-sub">Hard box & velvet pouch</div>
              </div>
              <div className="pillar-item">
                <div className="pillar-icon"><Truck size={18} /></div>
                <div className="pillar-label">PAN-INDIA COURIER</div>
                <div className="pillar-sub">White-glove doorstep delivery</div>
              </div>
              <div className="pillar-item">
                <div className="pillar-icon"><RotateCcw size={18} /></div>
                <div className="pillar-label">15-DAY RETURNS</div>
                <div className="pillar-sub">Complimentary doorstep pickup</div>
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="product-delivery-box">
              <span className="delivery-box-label">
                <Truck size={14} /> ESTIMATE PAN-INDIA COURIER TIMELINE
              </span>
              <form className="delivery-box-form" onSubmit={checkDelivery}>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit Pincode (e.g. 110001, 400001)"
                  className="delivery-box-input"
                  maxLength={6}
                />
                <button type="submit" className="delivery-box-submit">
                  CHECK
                </button>
              </form>
              {deliveryResult && (
                <p className="delivery-feedback-text">
                  <CheckCircle2 size={14} /> Estimated delivery by <strong>{deliveryResult.date}</strong> via {deliveryResult.city}.
                </p>
              )}
            </div>

            {/* Rich Luxury Accordions */}
            <div className="product-accordions-group">
              {accordions.map((a) => (
                <div key={a.key} className="luxury-accordion-item">
                  <button
                    type="button"
                    className="luxury-accordion-header"
                    onClick={() => setOpenAccordion(openAccordion === a.key ? null : a.key)}
                  >
                    <span>{a.label}</span>
                    <ChevronDown
                      size={16}
                      className="accordion-chevron-icon"
                      style={{ transform: openAccordion === a.key ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  {openAccordion === a.key && (
                    <div className="luxury-accordion-content">
                      {a.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── DEDICATED PATRON RATINGS & REVIEWS SECTION ─── */}
        <section id="reviews" className="patron-reviews-section">
          {/* Section Title Header */}
          <div className="reviews-section-header">
            <span className="reviews-section-kicker">VOICES OF DISTINCTION • VERIFIED PATRONS</span>
            <h2 className="reviews-section-title">PATRON RATINGS & REVIEWS</h2>
            <p className="reviews-section-desc">
              Discover verified appraisals, unboxing impressions, and styling appraisals from connoisseurs who have welcomed the {product.name} into their personal collections across India.
            </p>
          </div>

          {/* 1. Patron Real-Life Looks Gallery */}
          <div className="patron-gallery-showcase">
            <div className="patron-gallery-head">
              <div className="patron-gallery-title-wrap">
                <Camera size={16} className="patron-camera-icon" />
                <span className="patron-gallery-title">PATRON REAL-LIFE LOOKS & UNBOXINGS</span>
                <span className="patron-gallery-counter">({patronGalleryPhotos.length} Real Photos)</span>
              </div>
              <p className="patron-gallery-sub">
                Authentic imagery submitted by verified patrons wearing and presenting the {product.name} in natural daylight.
              </p>
            </div>

            <div className="patron-gallery-strip">
              {patronGalleryPhotos.map((item, idx) => (
                <div
                  key={idx}
                  className="patron-gallery-tile"
                  onClick={() => setPatronLightboxPhoto(item)}
                >
                  <img src={item.url} alt={item.caption} loading="lazy" />
                  <div className="patron-gallery-overlay">
                    <Eye size={18} className="gallery-eye-icon" />
                    <p className="tile-author">{item.author} • {item.city}</p>
                    <span className="tile-caption">{item.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Enhanced Ratings Dashboard (3 Columns) */}
          <div className="reviews-dashboard-grid-luxury">
            {/* Column 1: Overall Score */}
            <div className="score-overview-box-luxury">
              <span className="score-label-kicker">OVERALL PATRON SCORE</span>
              <div className="score-big-row">
                <span className="score-big-number">{product.rating || '4.9'}</span>
                <span className="score-out-of">/ 5.0</span>
              </div>
              <div className="score-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>
              <p className="score-patron-total">
                Based on <strong>{totalReviewsCount}</strong> verified patron reviews across India
              </p>
              <div className="score-recommendation-badge">
                <Sparkles size={14} />
                <span>98% of patrons recommend this atelier piece</span>
              </div>
              <div className="score-authenticity-guarantee">
                <BadgeCheck size={14} />
                <span>100% Certified Authentic Buyer Verification</span>
              </div>
              <button
                type="button"
                className="write-review-trigger-btn-luxury"
                onClick={() => setWriteReviewOpen(true)}
              >
                <MessageSquare size={15} /> WRITE A PATRON REVIEW
              </button>
            </div>

            {/* Column 2: Star Breakdown Bars (Clickable to Filter) */}
            <div className="score-breakdown-box-luxury">
              <div className="breakdown-header-row">
                <span className="breakdown-title">RATING DISTRIBUTION</span>
                {activeStarFilter && (
                  <button
                    className="clear-star-filter-btn"
                    onClick={() => setActiveStarFilter(null)}
                  >
                    Clear Filter (Showing {activeStarFilter}★)
                  </button>
                )}
              </div>
              <p className="breakdown-subtitle">Click any star tier to filter verified reviews:</p>

              {[
                { stars: 5, pct: 92, count: starCounts[5] + 40 },
                { stars: 4, pct: 6, count: starCounts[4] + 2 },
                { stars: 3, pct: 2, count: starCounts[3] + 1 },
                { stars: 2, pct: 0, count: 0 },
                { stars: 1, pct: 0, count: 0 },
              ].map((row) => {
                const isActive = activeStarFilter === row.stars;
                return (
                  <button
                    key={row.stars}
                    type="button"
                    onClick={() => setActiveStarFilter(isActive ? null : row.stars)}
                    className={`breakdown-row-interactive ${isActive ? 'active' : ''}`}
                    title={`Filter by ${row.stars} stars`}
                  >
                    <span className="row-star-label">{row.stars} ★</span>
                    <div className="breakdown-bar-track">
                      <div className="breakdown-bar-fill" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="row-pct-label">{row.pct}%</span>
                    <span className="row-count-label">({row.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Column 3: Atelier Craftsmanship & Quality Index */}
            <div className="score-dimensions-box-luxury">
              <span className="dimensions-title">ATELIER CRAFTSMANSHIP INDEX</span>
              <p className="dimensions-desc">Evaluated by verified collectors upon receipt:</p>

              <div className="dimension-metrics-list">
                <div className="dimension-metric-item">
                  <div className="dimension-label-row">
                    <span className="dim-name">Material Purity & Sapphire Glass</span>
                    <span className="dim-score">5.0 / 5.0</span>
                  </div>
                  <div className="dim-bar-track">
                    <div className="dim-bar-fill" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="dimension-metric-item">
                  <div className="dimension-label-row">
                    <span className="dim-name">Finishing & Ergonomic Comfort</span>
                    <span className="dim-score">4.9 / 5.0</span>
                  </div>
                  <div className="dim-bar-track">
                    <div className="dim-bar-fill" style={{ width: '98%' }} />
                  </div>
                </div>

                <div className="dimension-metric-item">
                  <div className="dimension-label-row">
                    <span className="dim-name">Magnetic Heirloom Packaging</span>
                    <span className="dim-score">5.0 / 5.0</span>
                  </div>
                  <div className="dim-bar-track">
                    <div className="dim-bar-fill" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="dimension-metric-item">
                  <div className="dimension-label-row">
                    <span className="dim-name">Pan-India Courier Care</span>
                    <span className="dim-score">4.8 / 5.0</span>
                  </div>
                  <div className="dim-bar-track">
                    <div className="dim-bar-fill" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>

              <div className="dimensions-footer-note">
                <Shield size={13} style={{ color: 'var(--color-gold)' }} />
                <span>Audited for authenticity under SAMREE Atelier Protocol</span>
              </div>
            </div>
          </div>

          {/* 3. Search, Filter & Sorting Bar */}
          <div className="reviews-filter-toolbar">
            <div className="reviews-search-box">
              <Search size={15} className="search-box-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews (e.g. glass, BlueDart, gold finish, wedding, strap)..."
                className="reviews-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="reviews-filter-chips">
              <button
                type="button"
                className={`filter-chip ${!activeStarFilter && !filterWithPhotosOnly && !filterVerifiedOnly ? 'active' : ''}`}
                onClick={() => {
                  setActiveStarFilter(null);
                  setFilterWithPhotosOnly(false);
                  setFilterVerifiedOnly(false);
                  setSearchQuery('');
                }}
              >
                All Reviews ({reviewsList.length})
              </button>

              <button
                type="button"
                className={`filter-chip ${filterWithPhotosOnly ? 'active' : ''}`}
                onClick={() => setFilterWithPhotosOnly(!filterWithPhotosOnly)}
              >
                <Camera size={13} /> With Photos ({patronGalleryPhotos.length})
              </button>

              <button
                type="button"
                className={`filter-chip ${filterVerifiedOnly ? 'active' : ''}`}
                onClick={() => setFilterVerifiedOnly(!filterVerifiedOnly)}
              >
                <BadgeCheck size={13} /> Verified Patrons
              </button>

              <button
                type="button"
                className={`filter-chip ${activeStarFilter === 5 ? 'active' : ''}`}
                onClick={() => setActiveStarFilter(activeStarFilter === 5 ? null : 5)}
              >
                ★ 5 Stars ({starCounts[5]})
              </button>

              <button
                type="button"
                className={`filter-chip ${activeStarFilter === 4 ? 'active' : ''}`}
                onClick={() => setActiveStarFilter(activeStarFilter === 4 ? null : 4)}
              >
                ★ 4 Stars ({starCounts[4]})
              </button>
            </div>

            <div className="reviews-sort-wrap">
              <SlidersHorizontal size={14} style={{ color: 'var(--color-champagne)' }} />
              <label htmlFor="sortReviews" className="sort-label">SORT:</label>
              <select
                id="sortReviews"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="reviews-sort-select"
              >
                <option value="helpful">Most Helpful First</option>
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Notice */}
          {(activeStarFilter || filterWithPhotosOnly || filterVerifiedOnly || searchQuery) && (
            <div className="active-filter-alert">
              <span>Showing filtered results: {filteredReviews.length} patron reviews found.</span>
              <button
                className="reset-all-filters-btn"
                onClick={() => {
                  setActiveStarFilter(null);
                  setFilterWithPhotosOnly(false);
                  setFilterVerifiedOnly(false);
                  setSearchQuery('');
                }}
              >
                <X size={12} /> Clear all filters
              </button>
            </div>
          )}

          {/* 4. Reviews List */}
          <div className="patron-reviews-list-luxury">
            {filteredReviews.length === 0 ? (
              <div className="reviews-empty-state">
                <p className="empty-title">No reviews match your selected filter.</p>
                <p className="empty-sub">Try broadening your search terms or clearing active filters.</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setActiveStarFilter(null);
                    setFilterWithPhotosOnly(false);
                    setFilterVerifiedOnly(false);
                    setSearchQuery('');
                  }}
                  style={{ marginTop: 14 }}
                >
                  SHOW ALL REVIEWS
                </button>
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <article key={rev.id} className="review-card-luxury">
                  {/* Top Bar: Reviewer Identity */}
                  <div className="review-card-top-luxury">
                    <div className="reviewer-meta-luxury">
                      <div className="reviewer-avatar-luxury">
                        {rev.initials}
                        <div className="avatar-ambient-glow" />
                      </div>
                      <div>
                        <div className="reviewer-name-row">
                          <h4 className="reviewer-name-luxury">{rev.author}</h4>
                          {rev.verified && (
                            <span className="verified-badge-luxury">
                              <BadgeCheck size={13} /> Verified Atelier Patron
                            </span>
                          )}
                        </div>
                        <p className="reviewer-location-row">
                          <MapPin size={12} /> {rev.location}
                        </p>
                      </div>
                    </div>
                    <time className="review-date-luxury">{rev.date}</time>
                  </div>

                  {/* Middle Row: Specs Chip & Stars */}
                  <div className="review-meta-specs-row">
                    <div className="review-stars-cluster-gold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="var(--color-gold)" color="var(--color-gold)" />
                      ))}
                    </div>
                    <span className="review-order-specs">
                      Verified Purchase • Colour: {rev.color || 'Signature Gold'} • Size: {rev.size || 'Standard'} • Serialised Edition
                    </span>
                  </div>

                  {/* Review Headline & Body */}
                  <h3 className="review-card-headline-luxury">{rev.title}</h3>
                  <p className="review-card-comment-luxury">{rev.comment}</p>

                  {/* Patron Photos Thumbnails (if any) */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="review-attached-photos-cluster">
                      <span className="photos-cluster-label">
                        <Camera size={13} /> Patron Photos:
                      </span>
                      <div className="photos-thumbnails-row">
                        {rev.photos.map((p, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            className="review-photo-thumb-btn"
                            onClick={() =>
                              setPatronLightboxPhoto({
                                url: p.url,
                                author: rev.author,
                                city: rev.location,
                                caption: p.caption || 'Patron unboxing capture'
                              })
                            }
                            title={p.caption}
                          >
                            <img src={p.url} alt={p.caption} />
                            <span className="photo-expand-badge"><ZoomIn size={12} /></span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dimension Pills & Recommendation */}
                  <div className="review-dimensions-ribbon">
                    <span className="dimension-pill">
                      Craftsmanship: <strong>{rev.dimensions?.craftsmanship || 5}/5</strong>
                    </span>
                    <span className="dimension-pill">
                      Packaging: <strong>{rev.dimensions?.packaging || 5}/5</strong>
                    </span>
                    {rev.recommend && (
                      <span className="recommend-patron-pill">
                        <Check size={12} /> Recommends to Collectors
                      </span>
                    )}
                  </div>

                  {/* Card Bottom: Helpful & Share */}
                  <div className="review-card-footer-luxury">
                    <div className="footer-left-actions">
                      <button
                        type="button"
                        className={`review-helpful-action-luxury ${helpfulClicked[rev.id] ? 'active' : ''}`}
                        onClick={() => handleHelpful(rev.id)}
                      >
                        <ThumbsUp size={13} />
                        <span>Helpful ({rev.helpfulCount})</span>
                      </button>
                      <button
                        type="button"
                        className="review-share-action"
                        onClick={() => handleShareReview(rev)}
                      >
                        <Share2 size={13} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Official Atelier Response (if available) */}
                  {rev.atelierResponse && (
                    <div className="atelier-response-box">
                      <div className="atelier-response-header">
                        <CornerDownRight size={14} className="response-corner-icon" />
                        <span className="atelier-concierge-title">{rev.atelierResponse.author}</span>
                        <span className="response-date">{rev.atelierResponse.date}</span>
                      </div>
                      <p className="atelier-response-text">{rev.atelierResponse.message}</p>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </section>

        {/* ─── COMPLETE THE LOOK (RELATED PRODUCTS) ─── */}
        {related.length > 0 && (
          <section className="related-products-section">
            <div className="section-header-row" style={{ marginBottom: 40 }}>
              <div>
                <span className="eyebrow">CURATED COMPANION PIECES</span>
                <h2 className="editorial-heading h3" style={{ marginTop: 4, letterSpacing: 2 }}>COMPLETE THE ENSEMBLE</h2>
              </div>
              <Link to="/shop" className="view-all-link">EXPLORE ALL <ArrowRight size={14} /></Link>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ─── LIGHTBOX MODAL (PRODUCT IMAGE ZOOM) ─── */}
      {lightboxOpen && (
        <div className="size-guide-backdrop" onClick={() => setLightboxOpen(false)}>
          <div
            style={{ position: 'relative', maxWidth: 900, width: '100%', maxHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="article-modal-close"
              aria-label="Close inspector"
            >
              <X size={20} />
            </button>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{ maxHeight: '85vh', maxWidth: '100%', borderRadius: 8, objectFit: 'contain', boxShadow: '0 25px 80px rgba(0,0,0,0.95)' }}
            />
          </div>
        </div>
      )}

      {/* ─── PATRON PHOTO LIGHTBOX MODAL ─── */}
      {patronLightboxPhoto && (
        <div className="size-guide-backdrop" onClick={() => setPatronLightboxPhoto(null)}>
          <div
            className="patron-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPatronLightboxPhoto(null)}
              className="article-modal-close"
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>
            <div className="lightbox-img-wrap">
              <img
                src={patronLightboxPhoto.url}
                alt={patronLightboxPhoto.caption}
                className="lightbox-highres-img"
              />
            </div>
            <div className="lightbox-details-bar">
              <div>
                <p className="lightbox-author-tag">
                  {patronLightboxPhoto.author} • {patronLightboxPhoto.city}
                </p>
                <p className="lightbox-caption-text">{patronLightboxPhoto.caption}</p>
              </div>
              <span className="lightbox-verified-pill">
                <BadgeCheck size={14} /> Verified Atelier Acquisition
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─── SIZE & FIT GUIDE MODAL ─── */}
      {sizeGuideOpen && (
        <div className="size-guide-backdrop" onClick={() => setSizeGuideOpen(false)}>
          <div className="size-guide-modal" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="article-modal-close"
              aria-label="Close size guide"
            >
              <X size={20} />
            </button>

            <h3 className="size-guide-title">SAMREE SIZE & FIT GUIDE</h3>
            <p className="size-guide-sub">
              Measurements are in inches (cm in parentheses). For bespoke sizing assistance, connect with our Concierge desk in Hisar, Haryana.
            </p>

            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest / Bust</th>
                  <th>Waist</th>
                  <th>Hip</th>
                  <th>Wrist / Diameter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>XS</strong></td>
                  <td>32–34" (81–86cm)</td>
                  <td>24–26" (61–66cm)</td>
                  <td>34–36" (86–91cm)</td>
                  <td>5.5–6.0" (14–15cm)</td>
                </tr>
                <tr>
                  <td><strong>S</strong></td>
                  <td>35–37" (89–94cm)</td>
                  <td>27–29" (68–74cm)</td>
                  <td>37–39" (94–99cm)</td>
                  <td>6.0–6.5" (15–16.5cm)</td>
                </tr>
                <tr>
                  <td><strong>M</strong></td>
                  <td>38–40" (96–101cm)</td>
                  <td>30–32" (76–81cm)</td>
                  <td>40–42" (101–106cm)</td>
                  <td>6.5–7.0" (16.5–17.8cm)</td>
                </tr>
                <tr>
                  <td><strong>L</strong></td>
                  <td>41–43" (104–109cm)</td>
                  <td>33–35" (84–89cm)</td>
                  <td>43–45" (109–114cm)</td>
                  <td>7.0–7.5" (17.8–19cm)</td>
                </tr>
                <tr>
                  <td><strong>XL</strong></td>
                  <td>44–46" (112–117cm)</td>
                  <td>36–38" (91–96cm)</td>
                  <td>46–48" (117–122cm)</td>
                  <td>7.5–8.0" (19–20.3cm)</td>
                </tr>
                <tr>
                  <td><strong>One Size</strong></td>
                  <td>Adjustable drape</td>
                  <td>Universal fit</td>
                  <td>Free silhouette</td>
                  <td>Ergonomic clasp</td>
                </tr>
              </tbody>
            </table>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                className="product-buy-now-btn"
                style={{ width: 'auto', padding: '0 32px', margin: '0 auto' }}
                onClick={() => setSizeGuideOpen(false)}
              >
                GOT IT, RETURN TO PIECE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── WRITE A PATRON REVIEW MODAL ─── */}
      {writeReviewOpen && (
        <div className="size-guide-backdrop" onClick={() => setWriteReviewOpen(false)}>
          <div className="write-review-modal-luxury" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setWriteReviewOpen(false)}
              className="article-modal-close"
              aria-label="Close write review"
            >
              <X size={20} />
            </button>

            <span className="modal-kicker-gold">SAMREE ATELIER • VERIFIED REVIEW</span>
            <h3 className="size-guide-title" style={{ marginTop: 4 }}>SHARE YOUR PATRON VERDICT</h3>
            <p className="size-guide-sub">
              Your evaluation assists connoisseurs across India in appreciating the craftsmanship, weight, and presentation of the {product.name}.
            </p>

            <form onSubmit={handleReviewSubmit}>
              {/* Star Rating Picker with Hover Effect & Label */}
              <div className="form-group-luxury">
                <span className="form-label-luxury">YOUR OVERALL RATING *</span>
                <div className="interactive-stars-picker">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormRating(star)}
                      className="star-pick-btn"
                      aria-label={`${star} Stars`}
                    >
                      <Star
                        size={28}
                        fill={(hoverRating || formRating) >= star ? 'var(--color-gold)' : 'none'}
                        color={(hoverRating || formRating) >= star ? 'var(--color-gold)' : 'rgba(255,255,255,0.25)'}
                      />
                    </button>
                  ))}
                  <span className="star-pick-description">
                    {ratingDescriptions[hoverRating || formRating]}
                  </span>
                </div>
              </div>

              {/* Name & City Grid */}
              <div className="form-two-col-grid">
                <div className="form-group-luxury">
                  <label className="form-label-luxury">FULL NAME / PATRON TITLE *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Rajiv Malhotra"
                    className="form-input-luxury"
                  />
                </div>
                <div className="form-group-luxury">
                  <label className="form-label-luxury">CITY & STATE (INDIA) *</label>
                  <input
                    type="text"
                    required
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="e.g. Bandra West, Mumbai"
                    className="form-input-luxury"
                  />
                </div>
              </div>

              {/* Headline */}
              <div className="form-group-luxury">
                <label className="form-label-luxury">REVIEW HEADLINE *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Extraordinary craftsmanship and heirloom presence"
                  className="form-input-luxury"
                />
              </div>

              {/* Detailed Comment */}
              <div className="form-group-luxury">
                <label className="form-label-luxury">YOUR DETAILED ASSESSMENT *</label>
                <textarea
                  required
                  rows={4}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Share your thoughts on the tactile feel, finishing, sapphire clarity, packaging, and BlueDart delivery speed..."
                  className="form-input-luxury"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Dimension Ratings */}
              <div className="form-two-col-grid" style={{ marginBottom: 16 }}>
                <div>
                  <label className="form-label-luxury">CRAFTSMANSHIP & FINISH</label>
                  <div className="dim-rating-btns">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormCraftRating(val)}
                        className={`dim-num-btn ${formCraftRating === val ? 'active' : ''}`}
                      >
                        {val}★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="form-label-luxury">PACKAGING & UNBOXING</label>
                  <div className="dim-rating-btns">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormPackRating(val)}
                        className={`dim-num-btn ${formPackRating === val ? 'active' : ''}`}
                      >
                        {val}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendation and Photos Toggles */}
              <div className="form-checkboxes-block">
                <label className="checkbox-custom-label">
                  <input
                    type="checkbox"
                    checked={formRecommend}
                    onChange={(e) => setFormRecommend(e.target.checked)}
                    className="custom-checkbox-input"
                  />
                  <span>I recommend this atelier piece to collectors across India.</span>
                </label>

                <label className="checkbox-custom-label">
                  <input
                    type="checkbox"
                    checked={formIncludePhoto}
                    onChange={(e) => setFormIncludePhoto(e.target.checked)}
                    className="custom-checkbox-input"
                  />
                  <span>Attach patron look photograph to my review showcase.</span>
                </label>
              </div>

              <button
                type="submit"
                className="product-add-to-cart-btn"
                style={{ width: '100%', height: 50, marginTop: 12 }}
              >
                SUBMIT PATRON REVIEW
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
