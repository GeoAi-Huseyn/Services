import { useEffect } from 'react';

/**
 * SEO Head Manager – dynamically manages <title>, meta tags, canonical, OG, Twitter, and JSON-LD.
 * Works with React SPA (no SSR needed) by directly manipulating document.head.
 *
 * Usage:
 *   <SEOHead
 *     title="Page Title | HomePulse"
 *     description="Page description for search engines"
 *     canonical="/about"
 *     ogImage="/assets/images/og-about.jpg"
 *     ogType="website"
 *     jsonLd={[{ "@context": "https://schema.org", ... }]}
 *     keywords="appliance repair, refrigerator, washer"
 *     noIndex={false}
 *   />
 */

const SITE_NAME = 'HomePulse Appliance Repair';
const SITE_URL = 'https://homepulserepair.com';
const DEFAULT_OG_IMAGE = '/homepulse_brand_horizontal.png';
const DEFAULT_DESCRIPTION = 'HomePulse — Professional major home appliance repair services in Massachusetts. Same-day dispatch, certified master technicians, and upfront transparent pricing.';

function setMetaTag(attr, attrValue, content) {
  let tag = document.querySelector(`meta[${attr}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setLinkTag(rel, href, extraAttrs = {}) {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
  Object.entries(extraAttrs).forEach(([k, v]) => tag.setAttribute(k, v));
}

function removeJsonLd(id) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
}

function injectJsonLd(id, schemas) {
  removeJsonLd(id);
  if (!schemas || schemas.length === 0) return;
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
  document.head.appendChild(script);
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd,
  keywords,
  noIndex = false,
}) {
  useEffect(() => {
    // 1. Page Title
    const fullTitle = title || `${SITE_NAME} — Professional Appliance Repair`;
    document.title = fullTitle;

    // 2. Meta Description
    setMetaTag('name', 'description', description || DEFAULT_DESCRIPTION);

    // 3. Keywords (optional but still useful for some engines)
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 4. Canonical URL
    const canonicalUrl = canonical
      ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`)
      : `${SITE_URL}${window.location.pathname}`;
    setLinkTag('canonical', canonicalUrl);

    // 5. Robots
    if (noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 6. Open Graph Tags (Facebook, LinkedIn, etc.)
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description || DEFAULT_DESCRIPTION);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:locale', 'en_US');
    const ogImgUrl = ogImage
      ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`)
      : `${SITE_URL}${DEFAULT_OG_IMAGE}`;
    setMetaTag('property', 'og:image', ogImgUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:alt', fullTitle);

    // 7. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description || DEFAULT_DESCRIPTION);
    setMetaTag('name', 'twitter:image', ogImgUrl);
    setMetaTag('name', 'twitter:image:alt', fullTitle);

    // 8. Additional SEO meta
    setMetaTag('name', 'author', SITE_NAME);
    setMetaTag('name', 'theme-color', '#1b68fe');
    setMetaTag('name', 'format-detection', 'telephone=yes');

    // 9. JSON-LD Structured Data
    if (jsonLd && jsonLd.length > 0) {
      injectJsonLd('homepulse-seo-jsonld', jsonLd);
    }

    // Cleanup on unmount – remove page-specific JSON-LD
    return () => {
      removeJsonLd('homepulse-seo-jsonld');
    };
  }, [title, description, canonical, ogImage, ogType, jsonLd, keywords, noIndex]);

  return null; // This is a side-effect-only component
}

/**
 * Pre-built JSON-LD generators for common schema types
 */
export function buildLocalBusinessSchema(settings = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": SITE_NAME,
    "description": DEFAULT_DESCRIPTION,
    "url": SITE_URL,
    "telephone": settings.phone || "(800) 555-0199",
    "email": settings.email || "info@homepulse.com",
    "priceRange": "$$",
    "image": `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    "logo": `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address || "100 State Street, Suite 400",
      "addressLocality": "Boston",
      "addressRegion": "MA",
      "postalCode": "02109",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.3601,
      "longitude": -71.0589
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "State",
      "name": "Massachusetts"
    },
    "sameAs": [
      settings.facebook_url || "https://www.facebook.com",
      settings.instagram_url || "https://www.instagram.com",
      settings.twitter_url || "https://www.twitter.com",
      settings.linkedin_url || "https://www.linkedin.com"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Appliance Repair Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Refrigerator Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Freezer Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Washer Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dryer Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dishwasher Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Oven & Range Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cooktop & Stove Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Microwave Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ice Maker Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wine Cooler Repair" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Range Hood Repair" } }
      ]
    }
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

export function buildWebPageSchema(title, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url.startsWith('http') ? url : `${SITE_URL}${url}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL
    }
  };
}

export function buildFAQSchema(faqItems) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
