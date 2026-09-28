import { useEffect } from 'react';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './CartDrawer.css';

export default function CartDrawer({ open, onClose }) {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <div>
            <p className="cart-drawer-title">YOUR BAG</p>
            {cart.length > 0 && (
              <p className="cart-drawer-count">{cart.reduce((s, i) => s + i.quantity, 0)} ITEMS</p>
            )}
          </div>
          <button className="cart-drawer-close" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} className="cart-empty-icon" />
            <p className="cart-empty-title">Your Bag Is Empty.</p>
            <p className="cart-empty-text">Explore SAMREE and discover something exceptional.</p>
            <button className="btn btn-primary" onClick={() => { onClose(); navigate('/shop'); }}>
              SHOP NOW <ArrowRight size={14} className="arrow-icon" />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem key={item.cartId} item={item} onRemove={removeFromCart} onQtyChange={updateQuantity} />
              ))}
            </div>
            <div className="cart-drawer-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span className="cart-subtotal-price">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="cart-shipping-note">Pan-India Express Delivery & GST included at checkout.</p>
              <button className="btn btn-primary cart-checkout-btn" onClick={handleCheckout}>
                CHECKOUT <ArrowRight size={14} className="arrow-icon" />
              </button>
              <Link to="/cart" className="btn btn-secondary cart-view-btn" onClick={onClose}>
                VIEW BAG
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div className="cart-item">
      <div className="cart-item-img-wrap">
        <img src={item.images?.[0]} alt={item.name} className="cart-item-img" />
      </div>
      <div className="cart-item-info">
        <p className="cart-item-brand">SAMREE</p>
        <p className="cart-item-name">{item.name}</p>
        {item.selectedSize && (
          <p className="cart-item-variant">Size: {item.selectedSize}</p>
        )}
        {item.selectedColor && (
          <p className="cart-item-variant">Colour: {item.selectedColor}</p>
        )}
        <div className="cart-item-actions">
          <div className="qty-control">
            <button
              className="qty-btn"
              onClick={() => onQtyChange(item.cartId, item.quantity - 1)}
              aria-label="Decrease quantity"
            >−</button>
            <span className="qty-value">{item.quantity}</span>
            <button
              className="qty-btn"
              onClick={() => onQtyChange(item.cartId, item.quantity + 1)}
              aria-label="Increase quantity"
            >+</button>
          </div>
          <button
            className="cart-item-remove"
            onClick={() => onRemove(item.cartId)}
            aria-label="Remove item"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="cart-item-price">
        <p>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
}
