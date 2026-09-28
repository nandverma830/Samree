import { useEffect } from 'react';

/**
 * Lightweight dynamic SEO component for managing document title & meta tags.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/logo.png',
  type = 'website'
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | SAMREE Modern Luxury` : 'SAMREE — Modern Luxury Fashion, Fine Jewellery & Curated Living';
    document.title = fullTitle;

    // Update meta description
    if (description) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
    }

    // Update OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    // Update OG image
    if (ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', ogImage);
    }

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
  }, [title, description, keywords, canonical, ogImage, type]);

  return null;
}
