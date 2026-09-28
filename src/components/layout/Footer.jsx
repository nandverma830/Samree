import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import {
  InstagramIcon as Instagram,
  FacebookIcon as Facebook,
  YoutubeIcon as Youtube,
  PinterestIcon as Pinterest
} from '../ui/SocialIcons';
import SamreeLogo from '../ui/SamreeLogo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-gold-top" />
      <div className="container">
        <div className="footer-main">
          {/* Brand Column with authentic asset logo */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-wrap" aria-label="SAMREE Home">
              <SamreeLogo height={70} />
            </Link>
            <p className="footer-brand-desc">
              SAMREE brings together premium fashion, fine heirlooms and everyday grocery essentials through a carefully curated shopping experience.
            </p>
            <div className="footer-contact-list">
              <a href="mailto:nand@samree.com" className="footer-contact-item">
                <Mail size={14} />
                nand@samree.com
              </a>
              <a href="tel:+919992150052" className="footer-contact-item">
                <Phone size={14} />
                +91 99921 50052
              </a>
              <span className="footer-contact-item">
                <MapPin size={14} />
                Paschim Vihar Phase 2, Hisar, Haryana, India
              </span>
            </div>
          </div>

          {/* Shop */}
          <div className="footer-col">
            <p className="footer-col-title">SHOP</p>
            <ul className="footer-links">
              <li><Link to="/shop?collection=new" className="footer-link">New Arrivals</Link></li>
              <li><Link to="/shop?collection=best" className="footer-link">Best Sellers</Link></li>
              <li><Link to="/collections" className="footer-link">Collections</Link></li>
              <li><Link to="/shop" className="footer-link">Shop All</Link></li>
              <li><Link to="/grocery" className="footer-link">Grocery Essentials</Link></li>
              <li><Link to="/wishlist" className="footer-link">Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <p className="footer-col-title">CUSTOMER CARE</p>
            <ul className="footer-links">
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/track-order" className="footer-link">Track Order</Link></li>
              <li><Link to="/shipping" className="footer-link">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="footer-link">Returns & Refunds</Link></li>
              <li><Link to="/blogs" className="footer-link">Journal & Blogs</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="footer-col">
            <p className="footer-col-title">ABOUT SAMREE</p>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">Our Story</Link></li>
              <li><Link to="/about" className="footer-link">Ateliers & Artistry</Link></li>
              <li><Link to="/grocery" className="footer-link">Gourmet Archive</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <p className="footer-col-title">STAY CONNECTED</p>
            <p className="footer-newsletter-text">
              Sign up for new arrivals, exclusive collections and private invitations.
            </p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="footer-newsletter-input"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="footer-newsletter-btn">SUBSCRIBE</button>
            </form>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="footer-social" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="footer-social" aria-label="Pinterest">
                <Pinterest size={18} />
              </a>
              <a href="#" className="footer-social" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} SAMREE. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-legal-link">Terms & Conditions</Link>
            <Link to="/cookie-policy" className="footer-legal-link">Cookie Policy</Link>
          </div>
          <div className="footer-payments">
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MC</span>
            <span className="payment-badge">RuPay</span>
            <span className="footer-locale">India | INR ₹</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
