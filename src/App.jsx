import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ToastContainer from './components/ui/ToastContainer';

// Pages
import HomePage from './pages/Home';
import ShopPage from './pages/Shop';
import ProductDetailPage from './pages/ProductDetail';
import CollectionsPage from './pages/Collections';
import GroceryPage from './pages/Grocery';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import WishlistPage from './pages/Wishlist';
import AccountPage from './pages/Account';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import BlogsPage from './pages/Blogs';
import InfoPage from './pages/InfoPages';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname, search]);

  return null;
}

// App Content layout wrapper
function AppContent() {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <ToastContainer />

      {/* Main Header (Sticky/Luxury) */}
      <Header />

      {/* Page Views */}
      <main style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:category" element={<ShopPage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/journal" element={<BlogsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Customer Care, Logistics & Policies */}
          <Route path="/faq" element={<InfoPage pageType="faq" />} />
          <Route path="/shipping" element={<InfoPage pageType="shipping" />} />
          <Route path="/returns" element={<InfoPage pageType="returns" />} />
          <Route path="/track-order" element={<InfoPage pageType="track-order" />} />
          <Route path="/privacy" element={<InfoPage pageType="privacy" />} />
          <Route path="/terms" element={<InfoPage pageType="terms" />} />
          <Route path="/cookie-policy" element={<InfoPage pageType="cookie-policy" />} />

          {/* Fallback to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer (Rendered across site, or minimized for checkout) */}
      {!isCheckout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </StoreProvider>
  );
}
