import { createContext, useContext, useReducer, useCallback } from 'react';

const StoreContext = createContext(null);

const initialState = {
  cart: [],
  wishlist: [],
  user: null,
  toasts: [],
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(
        (i) => i.id === action.product.id && i.selectedSize === action.selectedSize && i.selectedColor === action.selectedColor
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.product.id && i.selectedSize === action.selectedSize
              ? { ...i, quantity: i.quantity + (action.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            quantity: action.quantity || 1,
            selectedSize: action.selectedSize,
            selectedColor: action.selectedColor,
            cartId: `${action.product.id}-${action.selectedSize}-${action.selectedColor}-${Date.now()}`,
          },
        ],
      };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((i) => i.cartId !== action.cartId) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.cartId === action.cartId ? { ...i, quantity: Math.max(1, action.quantity) } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const inWishlist = state.wishlist.some((i) => i.id === action.product.id);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter((i) => i.id !== action.product.id)
          : [...state.wishlist, action.product],
      };
    }
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.toast }] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const addToCart = useCallback((product, selectedSize, selectedColor, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', product, selectedSize, selectedColor, quantity });
    dispatch({ type: 'ADD_TOAST', toast: { message: 'Added to your bag.', type: 'success' } });
  }, []);

  const removeFromCart = useCallback((cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', cartId });
  }, []);

  const updateQuantity = useCallback((cartId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', cartId, quantity });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const toggleWishlist = useCallback((product) => {
    const inWishlist = state.wishlist.some((i) => i.id === product.id);
    dispatch({ type: 'TOGGLE_WISHLIST', product });
    dispatch({
      type: 'ADD_TOAST',
      toast: {
        message: inWishlist ? 'Removed from wishlist.' : 'Added to wishlist.',
        type: 'success',
      },
    });
  }, [state.wishlist]);

  const isInWishlist = useCallback((id) => state.wishlist.some((i) => i.id === id), [state.wishlist]);

  const addToast = useCallback((message, type = 'success') => {
    dispatch({ type: 'ADD_TOAST', toast: { message, type } });
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE_TOAST', id });
  }, []);

  const login = useCallback((user) => {
    dispatch({ type: 'SET_USER', user });
    dispatch({ type: 'ADD_TOAST', toast: { message: `Welcome back, ${user.firstName}!`, type: 'success' } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'ADD_TOAST', toast: { message: 'Logged out successfully.', type: 'success' } });
  }, []);

  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToast,
        removeToast,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
