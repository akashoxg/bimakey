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
    title: 'BimaKey — India\'s #1 Unbiased Insurance Comparison & Claim Assistance Platform',
    description: 'Compare 150+ health insurance, car insurance, bike insurance & term life plans. Get 100% free insurance claim assistance and expert advice with zero commission.',
    image: `${baseUrl}/logo.png`,
  };

  const seo = {
    title: title ? (title.includes('BimaKey') ? title : `${title} | BimaKey`) : defaults.title,
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
    updateMeta('keywords', 'bima insurance, bimakey, car insurance, bike insurance, two wheeler insurance, health insurance, term insurance, life insurance, insurance claim assistance, free claim help, zero commission insurance, India insurance comparison, best insurance advisor');
    
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
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
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

    // Inject Schema.org JSON-LD Structured Data for search engine rich results
    let scriptTag = document.querySelector('script[id="json-ld-seo"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('id', 'json-ld-seo');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          "name": "BimaKey Insurance Advisory",
          "alternateName": ["Bima Insurance", "BimaKey", "BimaKey India"],
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "description": "India's only 100% unbiased insurance comparison and claim assistance platform for health, car, bike, and term insurance.",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9717427154",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
          }
        },
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "url": baseUrl,
          "name": "BimaKey",
          "description": seo.description,
          "publisher": {
            "@id": `${baseUrl}/#organization`
          }
        },
        {
          "@type": "Service",
          "name": "Insurance Comparison & Claim Assistance",
          "provider": {
            "@id": `${baseUrl}/#organization`
          },
          "serviceType": ["Health Insurance Advisory", "Car Insurance Advisory", "Bike Insurance Advisory", "Term Insurance Advisory", "Insurance Claim Assistance"],
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        }
      ]
    };

    scriptTag.textContent = JSON.stringify(structuredData);

  }, [seo.title, seo.description, seo.image, seo.url, noIndex]);

  return null;
};

export default SEO;
