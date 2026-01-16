import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  jsonLd?: object;
}

export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  type = 'website',
  image = '/og-image.jpg',
  jsonLd
}: SEOProps) => {
  const siteUrl = 'https://pieseautohar.ro';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullTitle = `${title} | Auto Har - Dezmembrări Auto`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Ensure indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:site_name" content="Auto Har - Piese Auto din Dezmembrări" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="RO" />
      <meta name="geo.placename" content="România" />
      <meta name="geo.position" content="45.9432;24.9668" />
      <meta name="ICBM" content="45.9432, 24.9668" />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

// Local Business JSON-LD for all pages
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": "https://pieseautohar.ro/#auto-har",
  "name": "Auto Har - Piese Auto din Dezmembrări",
  "alternateName": ["Auto Har", "Dezmembrări Auto", "Piese Auto România"],
  "description": "Piese auto din dezmembrări - piese originale second-hand pentru toate mărcile. Livrare rapidă în toată țara. Import din Belgia, Spania, Germania, Italia. Garanție inclusă.",
  "url": "https://pieseautohar.ro",
  "hasMap": "https://maps.app.goo.gl/vw2xepCXj4bJWZJ66",
  "telephone": ["+40749707694", "+40748951120"],
  "email": "autohargrup@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Strada Traian Popovici 156",
    "addressLocality": "Suceava",
    "addressRegion": "Suceava",
    "postalCode": "720000",
    "addressCountry": "RO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.6517,
    "longitude": 26.2458
  },
  "areaServed": {
    "@type": "Country",
    "name": "România",
    "@id": "https://www.wikidata.org/wiki/Q218"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "priceRange": "$$",
  "currenciesAccepted": "RON",
  "paymentAccepted": "Cash, Card",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Piese Auto din Dezmembrări",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Piese Motor"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Cutii de Viteze"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Elemente Caroserie"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Electronice Auto"
        }
      }
    ]
  },
  "sameAs": [
    "https://wa.me/40749707694"
  ]
};
