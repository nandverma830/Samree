import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { Filter, SlidersHorizontal, X, ChevronDown, Check, Grid3X3, LayoutGrid } from 'lucide-react';
import './Shop.css';

const categories = ['All', 'Women', 'Men', 'Accessories', 'Lifestyle', 'Grocery'];
const priceRanges = [
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: 'Above ₹10,000', min: 10000, max: Infinity },
];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('category') ? [searchParams.get('category')] : ['All']
  );
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilters, setMobileFilters] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState({
    category: true,
    price: true,
    size: true,
  });

  const toggleCategory = (cat) => {
    if (cat === 'All') {
      setSelectedCategories(['All']);
      return;
    }
    const withoutAll = selectedCategories.filter((c) => c !== 'All');
    if (withoutAll.includes(cat)) {
      const next = withoutAll.filter((c) => c !== cat);
      setSelectedCategories(next.length ? next : ['All']);
    } else {
      setSelectedCategories([...withoutAll, cat]);
    }
  };

  const togglePrice = (label) => {
    setSelectedPrices((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAll = () => {
    setSelectedCategories(['All']);
    setSelectedPrices([]);
    setSelectedSizes([]);
  };

  // Filtered and sorted products
  const filtered = useMemo(() => {
    let result = [...products];

    // Category
    if (!selectedCategories.includes('All')) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price
    if (selectedPrices.length > 0) {
      result = result.filter((p) =>
        selectedPrices.some((label) => {
          const r = priceRanges.find((range) => range.label === label);
          return r && p.price >= r.min && p.price < r.max;
        })
      );
    }

    // Size
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((s) => selectedSizes.includes(s))
      );
    }

    // Sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return result;
  }, [selectedCategories, selectedPrices, selectedSizes, sortBy]);

  const activeFilters = [
    ...selectedCategories.filter((c) => c !== 'All'),
    ...selectedPrices,
    ...selectedSizes,
  ];

  return (
    <div className="shop-page-wrapper">
      <div className="container">
        {/* Breadcrumb & Header */}
        <div className="shop-header">
          <span className="gold-eyebrow">CATALOG ARCHIVE</span>
          <h1 className="luxury-serif-title shop-title">Curated Collection</h1>
          <p className="shop-subtitle">
            Showing {filtered.length} impeccably crafted pieces tailored for enduring elegance.
          </p>
        </div>

        {/* Toolbar Bar */}
        <div className="shop-toolbar">
          <div className="shop-toolbar-left">
            <button
              className="shop-filter-toggle-btn"
              onClick={() => setMobileFilters(!mobileFilters)}
              aria-label="Filter products"
            >
              <SlidersHorizontal size={15} />
              <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
            </button>
            <span className="shop-result-count">{filtered.length} Items</span>
          </div>

          <div className="shop-toolbar-right">
            <div className="shop-sort-wrap">
              <span className="shop-sort-label">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="shop-sort-select"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="shop-chips-bar">
            {activeFilters.map((f) => (
              <span key={f} className="shop-chip">
                {f}
                <button
                  onClick={() => {
                    if (selectedCategories.includes(f)) toggleCategory(f);
                    else if (selectedPrices.includes(f)) togglePrice(f);
                    else if (selectedSizes.includes(f)) toggleSize(f);
                  }}
                  className="shop-chip-remove"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <button onClick={clearAll} className="shop-clear-all-btn">
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="shop-main-layout">
          {/* Sidebar Filters */}
          <aside className={`shop-sidebar ${mobileFilters ? 'mobile-visible' : ''}`}>
            <div className="shop-sidebar-header-mobile">
              <h3>Filter Products</h3>
              <button onClick={() => setMobileFilters(false)} className="shop-sidebar-close">
                <X size={20} />
              </button>
            </div>

            {/* 1. Categories */}
            <div className="shop-filter-group">
              <div
                onClick={() => setFilterExpanded((f) => ({ ...f, category: !f.category }))}
                className="shop-filter-group-header"
              >
                <h4>Category</h4>
                <ChevronDown
                  size={14}
                  className={`chevron ${filterExpanded.category ? 'expanded' : ''}`}
                />
              </div>
              {filterExpanded.category && (
                <ul className="shop-filter-list">
                  {categories.map((c) => (
                    <li key={c}>
                      <label className="shop-filter-label">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(c)}
                          onChange={() => toggleCategory(c)}
                          className="shop-checkbox"
                        />
                        <span className={selectedCategories.includes(c) ? 'active' : ''}>{c}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 2. Price Ranges */}
            <div className="shop-filter-group">
              <div
                onClick={() => setFilterExpanded((f) => ({ ...f, price: !f.price }))}
                className="shop-filter-group-header"
              >
                <h4>Price</h4>
                <ChevronDown
                  size={14}
                  className={`chevron ${filterExpanded.price ? 'expanded' : ''}`}
                />
              </div>
              {filterExpanded.price && (
                <ul className="shop-filter-list">
                  {priceRanges.map((p) => (
                    <li key={p.label}>
                      <label className="shop-filter-label">
                        <input
                          type="checkbox"
                          checked={selectedPrices.includes(p.label)}
                          onChange={() => togglePrice(p.label)}
                          className="shop-checkbox"
                        />
                        <span className={selectedPrices.includes(p.label) ? 'active' : ''}>
                          {p.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 3. Sizes */}
            <div className="shop-filter-group">
              <div
                onClick={() => setFilterExpanded((f) => ({ ...f, size: !f.size }))}
                className="shop-filter-group-header"
              >
                <h4>Size</h4>
                <ChevronDown
                  size={14}
                  className={`chevron ${filterExpanded.size ? 'expanded' : ''}`}
                />
              </div>
              {filterExpanded.size && (
                <div className="shop-size-grid">
                  {sizes.map((s) => {
                    const active = selectedSizes.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`shop-size-btn ${active ? 'active' : ''}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="shop-sidebar-footer-mobile">
              <button
                className="hero-discover-btn"
                style={{ width: '100%' }}
                onClick={() => setMobileFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Backdrop on mobile */}
          {mobileFilters && (
            <div className="shop-filter-backdrop" onClick={() => setMobileFilters(false)} />
          )}

          {/* Product Grid Area */}
          <div className="shop-product-grid-area">
            {filtered.length > 0 ? (
              <div className="shop-responsive-grid">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} isDark={true} />
                ))}
              </div>
            ) : (
              <div className="shop-empty-state">
                <p className="shop-empty-title">No Matching Products</p>
                <p className="shop-empty-desc">
                  Try relaxing your search criteria or resetting applied filters.
                </p>
                <button onClick={clearAll} className="hero-discover-btn">
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
