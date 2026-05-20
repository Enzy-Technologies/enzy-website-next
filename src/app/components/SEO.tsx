import React, { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  canonical?: string;
}

const DEFAULT_SEO = {
  title: "Enzy - The Agentic Engine for High Performance Sales Teams",
  description: "Transform your sales team with Enzy's agentic performance system. Streamline workflows, boost productivity, and close more deals with intelligent automation and real-time insights.",
  image: "https://enzy.com/og-image.jpg", // Replace with your actual OG image URL
  url: "https://enzy.com",
};

export function SEO({
  title,
  description,
  image,
  type = "website",
  canonical
}: SEOProps) {
  const pageTitle = title || DEFAULT_SEO.title;
  const pageDescription = description || DEFAULT_SEO.description;
  const pageImage = image || DEFAULT_SEO.image;
  const pageUrl =
    canonical ||
    (typeof window !== "undefined"
      ? `${DEFAULT_SEO.url}${window.location.pathname}`
      : DEFAULT_SEO.url);

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", pageDescription);
    updateMetaTag("robots", "index, follow");

    // Open Graph tags
    updateMetaTag("og:title", pageTitle, true);
    updateMetaTag("og:description", pageDescription, true);
    updateMetaTag("og:image", pageImage, true);
    updateMetaTag("og:url", pageUrl, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "Enzy", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", pageTitle);
    updateMetaTag("twitter:description", pageDescription);
    updateMetaTag("twitter:image", pageImage);

    // Canonical URL
    let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.setAttribute("rel", "canonical");
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute("href", pageUrl);

  }, [pageTitle, pageDescription, pageImage, pageUrl, type]);

  return null;
}

// Structured Data Component for Organization
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Enzy",
    "url": "https://enzy.com",
    "logo": "https://enzy.com/logo.png", // Replace with your actual logo URL
    "description": "The Agentic Engine for High Performance Sales Teams",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "email": "sales@enzy.com"
    },
    "sameAs": [
      "https://twitter.com/enzy",
      "https://linkedin.com/company/enzy",
      "https://github.com/enzy"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Structured Data Component for SoftwareApplication
export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Enzy",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
