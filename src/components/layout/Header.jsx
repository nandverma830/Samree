import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search, User, Heart, ShoppingBag, Menu, X, ChevronDown,
  ArrowRight
} from 'lucide-react';
import { InstagramIcon as Instagram, FacebookIcon as Facebook } from '../ui/SocialIcons';
import SamreeLogo from '../ui/SamreeLogo';
import { useStore } from '../../context/StoreContext';
import CartDrawer from '../ui/CartDrawer';
import SearchOverlay from '../ui/SearchOverlay';
import './Header.css';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'COLLECTIONS', href: '/collections', hasMega: true },
  { label: 'GROCERY', href: '/grocery' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SHOP', href: '/shop', hasMega: true },
];

const megaMenuData = {
  COLLECTIONS: {
    col1: {
      title: 'SHOP BY CATEGORY',
      links: [
        { label: 'Women', href: '/collections/women' },
        { label: 'Men', href: '/collections/men' },
        { label: 'Accessories', href: '/collections/accessories' },
        { label: 'Lifestyle', href: '/collections/lifestyle' },
      ],
    },
    col2: {
      title: 'FEATURED',
      links: [
        { label: 'New Arrivals', href: '/shop?collection=new' },
        { label: 'Best Sellers', href: '/shop?collection=best' },
        { label: 'Premium Collection', href: '/shop?collection=premium' },
        { label: 'Exclusive Edit', href: '/shop?collection=exclusive' },
      ],
    },
    col3: {
      title: 'GROCERY ARCHIVE',
      links: [
        { label: 'Fresh & Everyday', href: '/grocery?cat=fresh' },
        { label: 'Pantry Staples', href: '/grocery?cat=pantry' },
        { label: 'Single-Origin Teas', href: '/grocery?cat=beverages' },
        { label: 'Gourmet Snacks', href: '/grocery?cat=snacks' },
        { label: 'All Essentials', href: '/grocery' },
      ],
    },
    promo: {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
      eyebrow: 'SAMREE SIGNATURE',
      heading: 'Discover the New Collection',
      cta: 'SHOP NOW',
      href: '/collections',
    },
  },
  SHOP: {
    col1: {
      title: 'CATEGORIES',
      links: [
        { label: 'Women', href: '/collections/women' },
        { label: 'Men', href: '/collections/men' },
        { label: 'Accessories', href: '/collections/accessories' },
        { label: 'Lifestyle', href: '/collections/lifestyle' },
      ],
    },
    col2: {
      title: 'CURATED EDITS',
      links: [
        { label: 'New Arrivals', href: '/shop?collection=new' },
        { label: 'Best Sellers', href: '/shop?collection=best' },
        { label: 'Signature Pieces', href: '/shop?collection=signature' },
        { label: 'All Catalog', href: '/shop' },
      ],
    },
    col3: {
      title: 'SPECIALTY DEPARTMENTS',
      links: [
        { label: 'Gourmet Grocery', href: '/grocery' },
        { label: 'Artisanal Pantry', href: '/grocery' },
        { label: 'Fine Chronographs', href: '/shop?category=Accessories' },
        { label: 'Gift Inquiries', href: '/contact' },
      ],
    },
    promo: {
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      eyebrow: 'LIMITED RELEASES',
      heading: 'Enduring Luxury Pieces',
      cta: 'EXPLORE SHOP',
      href: '/shop',
    },
  },
};

export default function Header() {
  const location = useLocation();
  const { cartCount, wishlist } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const megaTimeout = useRef(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMegaEnter = (label) => {
    clearTimeout(megaTimeout.current);
    if (megaMenuData[label]) setActiveMega(label);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 180);
  };

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/shop') {
      return location.pathname === '/shop' || location.pathname.startsWith('/shop/');
    }
    if (href === '/grocery') {
      return location.pathname === '/grocery' || location.pathname.startsWith('/grocery/');
    }
    if (href === '/collections') {
      return location.pathname === '/collections' || location.pathname.startsWith('/collections/');
    }
    if (href === '/about') {
      return location.pathname === '/about' || location.pathname.startsWith('/about/');
    }
    return location.pathname === href;
  };

  const headerClass = [
    'header',
    scrolled || !isHome ? 'header--scrolled' : '',
    mobileOpen ? 'header--menu-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="header-inner">
          {/* Mobile Menu Toggle */}
          <button
            className="header-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo — Prominent luxury branding */}
          <Link to="/" className="header-logo" aria-label="SAMREE Home">
            <SamreeLogo height={66} />
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="header-nav-item"
                onMouseEnter={() => handleMegaEnter(link.label)}
                onMouseLeave={handleMegaLeave}
              >
                <Link
                  to={link.href}
                  className={`header-nav-link ${isActive(link.href) ? 'active' : ''}`}
                >
                  {link.label}
                  {link.hasMega && <ChevronDown size={13} className="nav-chevron" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button
              className="header-action-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={19} />
            </button>
            <Link to="/account" className="header-action-btn" aria-label="My Account">
              <User size={19} />
            </Link>
            <Link to="/wishlist" className="header-action-btn" aria-label="Wishlist">
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="header-badge">{wishlist.length}</span>
              )}
            </Link>
            <button
              className="header-action-btn cart-btn"
              aria-label="Shopping Cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={19} className="gold-cart-icon" />
              <span className="header-badge gold-badge">{cartCount > 0 ? cartCount : 2}</span>
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        {activeMega && megaMenuData[activeMega] && (
          <div
            className="mega-menu"
            onMouseEnter={() => clearTimeout(megaTimeout.current)}
            onMouseLeave={handleMegaLeave}
          >
            <div className="mega-menu-inner">
              <div className="mega-col">
                <p className="mega-col-title">{megaMenuData[activeMega].col1.title}</p>
                <ul className="mega-links">
                  {megaMenuData[activeMega].col1.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="mega-link">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mega-col">
                <p className="mega-col-title">{megaMenuData[activeMega].col2.title}</p>
                <ul className="mega-links">
                  {megaMenuData[activeMega].col2.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="mega-link">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mega-col">
                <p className="mega-col-title">{megaMenuData[activeMega].col3.title}</p>
                <ul className="mega-links">
                  {megaMenuData[activeMega].col3.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="mega-link">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mega-promo">
                <img
                  src={megaMenuData[activeMega].promo.image}
                  alt={megaMenuData[activeMega].promo.heading}
                  className="mega-promo-img"
                />
                <div className="mega-promo-overlay">
                  <span className="mega-promo-eyebrow">{megaMenuData[activeMega].promo.eyebrow}</span>
                  <p className="mega-promo-heading">{megaMenuData[activeMega].promo.heading}</p>
                  <Link to={megaMenuData[activeMega].promo.href} className="mega-promo-cta">
                    {megaMenuData[activeMega].promo.cta} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-topbar">
            <SamreeLogo height={26} />
            <button
              className="mobile-menu-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`mobile-nav-link ${isActive(link.href) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </Link>
            ))}
          </nav>

          <div className="mobile-nav-divider" />

          <div className="mobile-secondary">
            <Link to="/account" className="mobile-secondary-link" onClick={() => setMobileOpen(false)}>
              <User size={18} /> Account
            </Link>
            <Link to="/wishlist" className="mobile-secondary-link" onClick={() => setMobileOpen(false)}>
              <Heart size={18} /> Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
            <Link to="/contact" className="mobile-secondary-link" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </div>

          <div className="mobile-socials">
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
      {mobileOpen && <div className="overlay-backdrop" onClick={() => setMobileOpen(false)} />}

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
