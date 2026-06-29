import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Dynamic SEO component that updates meta tags based on route
 */
const SEO = ({ title, description, image, noIndex = false }) => {
  const location = useLocation();
  
  const baseUrl = 'https://bimakey.in';
  const fullUrl = `${baseUrl}${location.pathname}`;
  
  const defaults = {
    title: 'BimaKey — India\'s Only 100% Unbiased Insurance Platform',
    description: 'Compare 150+ insurance plans with transparent ratings. Health, term life & motor insurance. Free expert consultations. Zero insurer commissions.',
    image: `${baseUrl}/og-image.png`,
  };

  const seo = {
    title: title ? `${title} | BimaKey` : defaults.title,
    description: description || defaults.description,
    image: image || defaults.image,
    url: fullUrl,
  };

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update or create meta tags
    const updateMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', seo.description);
    updateMeta('keywords', 'insurance, health insurance, term insurance, motor insurance, unbiased advisory, BimaKey, India');
    
    // Open Graph tags
    updateMeta('og:title', seo.title, true);
    updateMeta('og:description', seo.description, true);
    updateMeta('og:url', seo.url, true);
    updateMeta('og:image', seo.image, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:site_name', 'BimaKey', true);
    
    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', seo.title);
    updateMeta('twitter:description', seo.description);
    updateMeta('twitter:image', seo.image);
    updateMeta('twitter:url', seo.url);

    // Robots
    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow');
      updateMeta('googlebot', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow');
      updateMeta('googlebot', 'index, follow');
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.url);

  }, [seo.title, seo.description, seo.image, seo.url, noIndex]);

  return null;
};

export default SEO;
