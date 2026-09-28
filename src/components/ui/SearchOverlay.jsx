import { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { blogs } from '../../data/blogs';
import './SearchOverlay.css';

const popularSearches = ['New Arrivals', 'Editorial Journal', 'Accessories', 'Haute Couture', 'Fine Jewellery', 'Grocery'];

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const results = query.length >= 2
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const blogResults = query.length >= 2
    ? blogs.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        b.category.toLowerCase().includes(query.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 2)
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      {open && <div className="search-backdrop" onClick={onClose} />}
      <div className={`search-overlay ${open ? 'open' : ''}`}>
        <div className="search-overlay-inner">
          <form className="search-form" onSubmit={handleSearch}>
            <Search size={20} className="search-form-icon" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, collections and categories..."
              className="search-input"
              aria-label="Search"
            />
            {query && (
              <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
            <button type="submit" className="search-submit">
              Search
            </button>
          </form>
          <button className="search-overlay-close" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        <div className="search-results-panel">
          {query.length === 0 ? (
            <div className="search-popular">
              <p className="search-popular-label">POPULAR SEARCHES</p>
              <div className="search-popular-tags">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    className="search-tag"
                    onClick={() => { setQuery(term); }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 || blogResults.length > 0 ? (
            <div className="search-results">
              {results.length > 0 && (
                <>
                  <p className="search-results-label">PRODUCTS</p>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="search-result-item"
                      onClick={onClose}
                    >
                      <div className="search-result-img">
                        <img src={product.images[0]} alt={product.name} />
                      </div>
                      <div className="search-result-info">
                        <p className="search-result-name">{product.name}</p>
                        <p className="search-result-cat">{product.category}</p>
                        <p className="search-result-price">₹{product.price.toLocaleString('en-IN')}</p>
                      </div>
                    </Link>
                  ))}
                </>
              )}

              {blogResults.length > 0 && (
                <div style={{ marginTop: results.length > 0 ? 16 : 0 }}>
                  <p className="search-results-label">EDITORIAL JOURNAL & ARTICLES</p>
                  {blogResults.map((article) => (
                    <Link
                      key={article.id}
                      to={`/blogs?q=${encodeURIComponent(article.title)}`}
                      className="search-result-item"
                      onClick={onClose}
                    >
                      <div className="search-result-img" style={{ borderRadius: 4 }}>
                        <img src={article.coverImage} alt={article.title} />
                      </div>
                      <div className="search-result-info">
                        <p className="search-result-name">{article.title}</p>
                        <p className="search-result-cat" style={{ color: 'var(--color-champagne)' }}>
                          {article.category} • {article.readTime}
                        </p>
                        <p className="search-result-price" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                          Read in Journal <ArrowRight size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <button
                  className="search-view-all"
                  onClick={() => { onClose(); navigate(`/search?q=${encodeURIComponent(query)}`); }}
                >
                  VIEW ALL PRODUCTS FOR "{query}" <ArrowRight size={14} />
                </button>
                <button
                  className="search-view-all"
                  style={{ background: 'rgba(201,161,91,0.1)', borderColor: 'rgba(201,161,91,0.4)', color: 'var(--color-champagne)' }}
                  onClick={() => { onClose(); navigate(`/blogs?q=${encodeURIComponent(query)}`); }}
                >
                  SEARCH JOURNAL FOR "{query}" <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="search-no-result">
              <p className="search-no-result-title">No results found for "{query}"</p>
              <p className="search-no-result-text">Try searching another term, explore our collections, or search the SAMREE Journal.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
