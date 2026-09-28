import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80';

export default function ProductCard({ product, isDark = true }) {
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const size = product.sizes?.[0] || 'One Size';
    const color = product.colorNames?.[selectedColorIdx] || product.colorNames?.[0] || 'Gold';
    addToCart(product, size, color, 1);
  };

  const primaryImage = product.images?.[0] || product.image || FALLBACK_IMAGE;
  const hoverImage = product.images?.[1] || primaryImage;
  const currentImage = imgSrc || (hovered ? hoverImage : primaryImage);

  const colors = product.colors || ['#C9A15B', '#050505', '#F3EFE6'];
  const colorNames = product.colorNames || ['Champagne Gold', 'Obsidian Noir', 'Warm Ivory'];
  const activeColorName = colorNames[selectedColorIdx] || colorNames[0];

  return (
    <div
      className="luxury-product-box"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="luxury-box-link">
        {/* Top: Image container */}
        <div className="luxury-box-img-wrap">
          <img
            src={currentImage}
            alt={product.name}
            className="luxury-box-img"
            loading="lazy"
            onError={() => {
              if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
            }}
          />

          {/* Badge */}
          {product.badge && (
            <span className="luxury-box-badge">
              {product.badge}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            className={`luxury-box-wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlist}
            aria-label="Add to Wishlist"
          >
            <Heart size={16} fill={inWishlist ? 'var(--color-gold)' : 'none'} />
          </button>
        </div>

        {/* Middle: Content & Aligned Info */}
        <div className="luxury-box-body">
          <div className="luxury-box-cat-row">
            <span className="luxury-box-cat">{product.category || 'HERITAGE'}</span>
            {product.rating && (
              <div className="luxury-box-stars">
                <Star size={11} fill="var(--color-gold)" color="var(--color-gold)" />
                <span>{product.rating}</span>
                <span className="stars-count">({product.reviewCount || 34})</span>
              </div>
            )}
          </div>

          <h3 className="luxury-box-title" title={product.name}>
            {product.name}
          </h3>

          <div className="luxury-box-price-row">
            <span className="luxury-box-price">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            {product.comparePrice && (
              <span className="luxury-box-compare-price">
                ₹{Number(product.comparePrice).toLocaleString('en-IN')}
              </span>
            )}
            {product.discount && (
              <span className="luxury-box-discount-pill">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Color Options Bar — Perfectly Aligned & Interactive */}
          <div className="luxury-box-colors-section">
            <div className="colors-label-row">
              <span className="colors-meta-tag">FINISH:</span>
              <span className="colors-active-name">{activeColorName}</span>
            </div>
            <div className="colors-swatches-row">
              {colors.map((c, i) => (
                <button
                  type="button"
                  key={i}
                  className={`color-swatch-circle ${i === selectedColorIdx ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIdx(i);
                  }}
                  title={colorNames[i] || ''}
                  aria-label={`Select ${colorNames[i] || 'color'}`}
                >
                  {i === selectedColorIdx && (
                    <span className="swatch-check-dot" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Aligned Quick Add Button */}
        <div className="luxury-box-footer">
          <button
            type="button"
            className="luxury-box-action-btn"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag size={14} className="action-bag-icon" />
            <span>ADD TO BAG</span>
          </button>
        </div>
      </Link>
    </div>
  );
}
