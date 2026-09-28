import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { useStore } from '../context/StoreContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <div style={{ paddingTop: 88, background: 'var(--color-primary-black)', minHeight: '100vh' }}>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">MY WISHLIST</span>
          <h1 className="editorial-heading h2">Saved Pieces</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Heart size={56} style={{ color: 'var(--color-dark-gray)', opacity: 0.4, margin: '0 auto 24px' }} />
            <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 36, marginBottom: 14 }}>Your Wishlist Is Waiting.</h2>
            <p style={{ color: 'var(--color-muted-gray)', marginBottom: 32 }}>Save your favourite SAMREE pieces here.</p>
            <Link to="/shop" className="btn btn-primary">EXPLORE COLLECTION <ArrowRight size={14} className="arrow-icon" /></Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
              <p style={{ color: 'var(--color-muted-gray)', fontSize: 14 }}>{wishlist.length} saved items</p>
              <button
                onClick={() => wishlist.forEach((p) => addToCart(p, p.sizes?.[0], p.colorNames?.[0]))}
                className="btn btn-secondary"
                style={{ height: 44, fontSize: 12 }}
              >
                MOVE ALL TO BAG
              </button>
            </div>
            <div className="product-grid">
              {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
