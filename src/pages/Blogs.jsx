import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search, X, Calendar, Clock, ArrowRight, User, Tag,
  ChevronRight, Share2, BookOpen, Sparkles, CheckCircle2
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { blogs, blogCategories } from '../data/blogs';
import { useStore } from '../context/StoreContext';
import './Blogs.css';

export default function BlogsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [activeArticle, setActiveArticle] = useState(null);
  const { addToast } = useStore();

  // Sync state if URL query params change
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Update URL params smoothly
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set('q', value.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const clearSearch = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams);
  };

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = blog.title.toLowerCase().includes(q);
      const excerptMatch = blog.excerpt.toLowerCase().includes(q);
      const authorMatch = blog.author.name.toLowerCase().includes(q);
      const categoryMatch = blog.category.toLowerCase().includes(q);
      const tagsMatch = blog.tags.some((t) => t.toLowerCase().includes(q));
      const contentMatch = blog.content.some((c) => c.toLowerCase().includes(q));

      return titleMatch || excerptMatch || authorMatch || categoryMatch || tagsMatch || contentMatch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredBlog = useMemo(() => {
    return blogs.find((b) => b.featured) || blogs[0];
  }, []);

  const handleShare = (article, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Article link copied to clipboard', 'info');
    }
  };

  return (
    <div className="blogs-page-root">
      <SEO
        title="Editorial Journal & Luxury Guides"
        description="Discover the SAMREE Journal: In-depth perspectives on Haute Couture, heirloom jewellery curation, horology complications, and sustainable luxury living."
        canonical="https://samree.com/blogs"
      />

      {/* ─── 1. LUXURY EDITORIAL HERO ─── */}
      <section className="blogs-hero-section">
        <div className="blogs-hero-ambient" />
        <div className="container blogs-hero-inner">
          <nav className="blogs-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">HOME</Link>
            <ChevronRight size={12} />
            <span>EDITORIAL JOURNAL</span>
          </nav>

          <span className="blogs-hero-kicker">SAMREE CHRONICLES & ATELIER JOURNAL</span>
          <h1 className="blogs-hero-title">PERSPECTIVES IN LUXURY</h1>
          <p className="blogs-hero-subtext">
            Essays on haute couture architecture, mastercrafted 18k heirloom gold, Swiss mechanical complications, and mindful living from our atelier curators.
          </p>

          {/* ─── 2. LIVE SEARCH BAR & FILTERS ─── */}
          <div className="blogs-search-container">
            <div className="blogs-search-input-wrap">
              <Search size={18} className="blogs-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search articles by title, styling topic, author, or keyword..."
                className="blogs-search-input"
                aria-label="Search blog articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="blogs-search-clear"
                  aria-label="Clear search query"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="blogs-search-status">
                <span>
                  Found <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? 'article' : 'articles'} matching “<strong>{searchQuery}</strong>”
                </span>
                <button onClick={clearSearch} className="blogs-status-reset">Clear filter</button>
              </div>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="blogs-category-pills">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`blogs-category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. FEATURED STORY (Shown when no active search query or on initial view) ─── */}
      {!searchQuery && selectedCategory === 'All' && featuredBlog && (
        <section className="container blogs-featured-section">
          <div className="blogs-featured-card" onClick={() => setActiveArticle(featuredBlog)}>
            <div className="blogs-featured-img-wrap">
              <img
                src={featuredBlog.coverImage}
                alt={featuredBlog.title}
                className="blogs-featured-img"
              />
              <div className="blogs-featured-badge">FEATURED ESSAY</div>
            </div>

            <div className="blogs-featured-content">
              <div className="blogs-meta-row">
                <span className="blogs-cat-tag">{featuredBlog.category}</span>
                <span className="blogs-meta-dot">•</span>
                <span className="blogs-meta-time">
                  <Clock size={13} style={{ marginRight: 4 }} />
                  {featuredBlog.readTime}
                </span>
                <span className="blogs-meta-dot">•</span>
                <span className="blogs-meta-date">
                  <Calendar size={13} style={{ marginRight: 4 }} />
                  {featuredBlog.date}
                </span>
              </div>

              <h2 className="blogs-featured-headline">{featuredBlog.title}</h2>
              <p className="blogs-featured-excerpt">{featuredBlog.excerpt}</p>

              <div className="blogs-featured-footer">
                <div className="blogs-author-pill">
                  <img
                    src={featuredBlog.author.avatar}
                    alt={featuredBlog.author.name}
                    className="blogs-author-avatar"
                  />
                  <div>
                    <span className="blogs-author-name">{featuredBlog.author.name}</span>
                    <span className="blogs-author-role">{featuredBlog.author.role}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="blogs-read-cta-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveArticle(featuredBlog);
                  }}
                >
                  READ STORY <ArrowRight size={14} style={{ marginLeft: 6 }} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 4. EDITORIAL ARTICLES GRID ─── */}
      <section className="container blogs-grid-section">
        <div className="blogs-grid-header">
          <h2 className="blogs-section-title">
            {searchQuery
              ? `Search Results (${filteredBlogs.length})`
              : selectedCategory === 'All'
              ? 'LATEST PERSPECTIVES'
              : `${selectedCategory.toUpperCase()} ARTICLES`}
          </h2>
          <span className="blogs-article-count">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Curated Story' : 'Curated Stories'}
          </span>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="blogs-empty-state">
            <BookOpen size={44} className="blogs-empty-icon" />
            <h3 className="blogs-empty-title">No Articles Found</h3>
            <p className="blogs-empty-desc">
              We couldn't find any editorial stories matching your search criteria. Try using different keywords or browse all categories.
            </p>
            <button
              type="button"
              className="blogs-empty-reset-btn"
              onClick={() => {
                clearSearch();
                handleCategoryChange('All');
              }}
            >
              VIEW ALL ARTICLES
            </button>
          </div>
        ) : (
          <div className="blogs-articles-grid">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="blog-card"
                onClick={() => setActiveArticle(blog)}
              >
                <div className="blog-card-media">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="blog-card-img"
                    loading="lazy"
                  />
                  <span className="blog-card-cat-badge">{blog.category}</span>
                </div>

                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-meta-item">
                      <Clock size={12} /> {blog.readTime}
                    </span>
                    <span className="blog-meta-sep">•</span>
                    <span className="blog-meta-item">
                      <Calendar size={12} /> {blog.date}
                    </span>
                  </div>

                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>

                  <div className="blog-card-tags">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="blog-tag-pill">#{tag}</span>
                    ))}
                  </div>

                  <div className="blog-card-footer">
                    <div className="blog-card-author">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="blog-author-img"
                      />
                      <span className="blog-author-text">{blog.author.name}</span>
                    </div>

                    <span className="blog-read-link">
                      READ STORY <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ─── 5. FULL ARTICLE READER MODAL (LUXURY READING EXPERIENCE) ─── */}
      {activeArticle && (
        <div className="article-modal-backdrop" onClick={() => setActiveArticle(null)}>
          <div
            className="article-modal-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-article-title"
          >
            {/* Modal Close Button */}
            <button
              className="article-modal-close"
              onClick={() => setActiveArticle(null)}
              aria-label="Close article modal"
            >
              <X size={20} />
            </button>

            {/* Modal Hero Banner */}
            <div className="article-modal-hero">
              <img
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                className="article-modal-hero-img"
              />
              <div className="article-modal-hero-overlay" />
              <div className="article-modal-hero-meta">
                <span className="article-modal-cat">{activeArticle.category}</span>
                <span className="article-modal-time">
                  <Clock size={12} style={{ marginRight: 4 }} /> {activeArticle.readTime}
                </span>
                <span className="article-modal-time">
                  <Calendar size={12} style={{ marginRight: 4 }} /> {activeArticle.date}
                </span>
              </div>
            </div>

            {/* Modal Article Content */}
            <div className="article-modal-body">
              <h1 id="modal-article-title" className="article-modal-title">
                {activeArticle.title}
              </h1>

              {/* Author Row */}
              <div className="article-modal-author-row">
                <div className="article-author-info">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="article-author-photo"
                  />
                  <div>
                    <h4 className="article-author-name">{activeArticle.author.name}</h4>
                    <span className="article-author-title">{activeArticle.author.role}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="article-share-btn"
                  onClick={(e) => handleShare(activeArticle, e)}
                  aria-label="Share article"
                >
                  <Share2 size={15} />
                  <span>Share Article</span>
                </button>
              </div>

              {/* Pull Quote */}
              {activeArticle.quote && (
                <blockquote className="article-pull-quote">
                  <Sparkles size={18} className="article-quote-icon" />
                  <p>“{activeArticle.quote}”</p>
                </blockquote>
              )}

              {/* Full Text Paragraphs */}
              <div className="article-text-content">
                {activeArticle.content.map((paragraph, index) => (
                  <p key={index} className="article-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Insights Box */}
              {activeArticle.keyPoints && activeArticle.keyPoints.length > 0 && (
                <div className="article-insights-card">
                  <h4 className="article-insights-title">KEY ATELIER INSIGHTS</h4>
                  <ul className="article-insights-list">
                    {activeArticle.keyPoints.map((point, i) => (
                      <li key={i} className="article-insight-item">
                        <CheckCircle2 size={16} className="article-check-icon" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="article-modal-tags">
                <Tag size={14} className="article-tag-icon" />
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="article-modal-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="article-modal-actions">
                <Link
                  to="/shop"
                  className="article-shop-link-btn"
                  onClick={() => setActiveArticle(null)}
                >
                  EXPLORE THE COLLECTION <ArrowRight size={14} style={{ marginLeft: 6 }} />
                </Link>
                <button
                  type="button"
                  className="article-close-link-btn"
                  onClick={() => setActiveArticle(null)}
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 6. NEWSLETTER / PRIVÉ MEMBERSHIP BANNER ─── */}
      <section className="blogs-newsletter-strip">
        <div className="container blogs-newsletter-inner">
          <div className="blogs-newsletter-copy">
            <span className="blogs-prive-tag">SAMREE PRIVÉ DISPATCH</span>
            <h3 className="blogs-prive-title">Receive Curated Dispatches</h3>
            <p className="blogs-prive-desc">
              Subscribe to receive private salon essays, early access to limited capsule releases, and invitations to confidential bespoke trunk shows.
            </p>
          </div>
          <form
            className="blogs-prive-form"
            onSubmit={(e) => {
              e.preventDefault();
              addToast('Thank you for subscribing to the SAMREE Journal dispatch.', 'success');
              e.target.reset();
            }}
          >
            <input
              type="email"
              placeholder="Enter your confidential email..."
              required
              className="blogs-prive-input"
              aria-label="Email address"
            />
            <button type="submit" className="blogs-prive-btn">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
