import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  jsonLd?: object | object[];
}

// Local cities for SEO targeting
const targetCities = ['Suceava', 'Botoșani', 'Piatra Neamț', 'Iași'];
const targetCitiesKeywords = 'Suceava, Botoșani, Piatra Neamț, Iași, Moldova';

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
  const fullTitle = `${title} | Auto Har - Dezmembrări Auto Suceava, Botoșani, Piatra Neamț, Iași`;
  
  // Enhanced keywords with local cities
  const enhancedKeywords = keywords 
    ? `${keywords}, piese auto ${targetCitiesKeywords}, dezmembrări auto ${targetCitiesKeywords}` 
    : `piese auto din dezmembrări, piese auto ${targetCitiesKeywords}, dezmembrări auto Moldova`;

  // Handle single or multiple JSON-LD schemas
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={enhancedKeywords} />
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
      <meta property="og:site_name" content="Auto Har - Piese Auto din Dezmembrări Suceava, Botoșani, Piatra Neamț, Iași" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Geo Tags for Local SEO - Primary Location */}
      <meta name="geo.region" content="RO-SV" />
      <meta name="geo.placename" content="Suceava, România" />
      <meta name="geo.position" content="47.6517;26.2458" />
      <meta name="ICBM" content="47.6517, 26.2458" />
      
      {/* Additional Local SEO Meta Tags */}
      <meta name="author" content="Auto Har - Dezmembrări Auto" />
      <meta name="publisher" content="Auto Har" />
      <meta name="copyright" content="Auto Har SRL" />
      <meta name="language" content="Romanian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="local" />
      <meta name="coverage" content="Suceava, Botoșani, Piatra Neamț, Iași, Moldova, România" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />

      {/* JSON-LD Structured Data - Multiple Schemas */}
      {jsonLdArray.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

// Enhanced Local Business JSON-LD with multiple service areas
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": "https://pieseautohar.ro/#organization",
  "name": "Auto Har - Piese Auto din Dezmembrări",
  "alternateName": [
    "Auto Har Suceava", 
    "Dezmembrări Auto Suceava", 
    "Piese Auto Botoșani", 
    "Piese Auto Piatra Neamț", 
    "Piese Auto Iași",
    "Dezmembrări Moldova"
  ],
  "description": "Piese auto din dezmembrări Suceava - piese originale second-hand pentru toate mărcile. Livrare rapidă în Suceava, Botoșani, Piatra Neamț, Iași și toată Moldova. Import din Belgia, Spania, Germania, Italia. Garanție inclusă.",
  "url": "https://pieseautohar.ro",
  "logo": "https://pieseautohar.ro/logo.png",
  "image": "https://pieseautohar.ro/og-image.jpg",
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
  "areaServed": [
    {
      "@type": "City",
      "name": "Suceava",
      "sameAs": "https://www.wikidata.org/wiki/Q189179"
    },
    {
      "@type": "City",
      "name": "Botoșani",
      "sameAs": "https://www.wikidata.org/wiki/Q191458"
    },
    {
      "@type": "City",
      "name": "Piatra Neamț",
      "sameAs": "https://www.wikidata.org/wiki/Q192022"
    },
    {
      "@type": "City",
      "name": "Iași",
      "sameAs": "https://www.wikidata.org/wiki/Q182136"
    },
    {
      "@type": "State",
      "name": "Județul Suceava"
    },
    {
      "@type": "State",
      "name": "Județul Botoșani"
    },
    {
      "@type": "State",
      "name": "Județul Neamț"
    },
    {
      "@type": "State",
      "name": "Județul Iași"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Moldova, România"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 47.6517,
      "longitude": 26.2458
    },
    "geoRadius": "150000"
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
  "paymentAccepted": ["Cash", "Card", "Transfer bancar"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Piese Auto din Dezmembrări",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Piese Motor",
          "description": "Motoare complete, injectoare, turbine, pompe pentru toate mărcile auto"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Cutii de Viteze",
          "description": "Cutii manuale, automate, DSG pentru VW, Audi, BMW, Mercedes și alte mărci"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Elemente Caroserie",
          "description": "Uși, capote, aripi, bare, oglinzi pentru reparații auto"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Electronice Auto",
          "description": "ECU, calculatoare motor, senzori, module ABS și ESP"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://wa.me/40749707694"
  ],
  "potentialAction": {
    "@type": "OrderAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pieseautohar.ro/contact",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "deliveryMethod": {
      "@type": "DeliveryMethod",
      "name": "Livrare prin curier în 24-48 ore"
    }
  }
};

// Website Schema
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://pieseautohar.ro/#website",
  "url": "https://pieseautohar.ro",
  "name": "Auto Har - Piese Auto din Dezmembrări Suceava",
  "description": "Piese auto din dezmembrări pentru Suceava, Botoșani, Piatra Neamț, Iași. Import din Europa, garanție inclusă.",
  "publisher": {
    "@id": "https://pieseautohar.ro/#organization"
  },
  "inLanguage": "ro-RO",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pieseautohar.ro/contact?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Breadcrumb helper function
export const createBreadcrumbJsonLd = (items: Array<{name: string; url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://pieseautohar.ro${item.url}`
  }))
});

// Service JSON-LD for service pages
export const createServiceJsonLd = (serviceName: string, serviceDescription: string, serviceUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": {
    "@id": "https://pieseautohar.ro/#organization"
  },
  "areaServed": [
    { "@type": "City", "name": "Suceava" },
    { "@type": "City", "name": "Botoșani" },
    { "@type": "City", "name": "Piatra Neamț" },
    { "@type": "City", "name": "Iași" }
  ],
  "description": serviceDescription,
  "url": `https://pieseautohar.ro${serviceUrl}`
});

// FAQ Schema helper
export const createFAQJsonLd = (faqs: Array<{question: string; answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
