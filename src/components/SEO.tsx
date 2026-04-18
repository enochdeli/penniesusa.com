import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  twitterHandle?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "penniesusa | Global Purchasing Power Explorer",
  description = "Convert your net worth into 130+ currencies and find exactly where you are a millionaire today. Explore global purchasing power.",
  canonical = "https://penniesusa.com",
  ogType = "website",
  ogImage = "https://penniesusa.com/og-image.jpg", // Replace with actual asset later
  twitterHandle = "@penniesusa",
  schema
}) => {
  const siteTitle = title.includes("penniesusa") ? title : `${title} | penniesusa`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="penniesusa" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Financial Tool Schema if default */}
      {!schema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "penniesusa",
            "url": "https://penniesusa.com",
            "description": description,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
