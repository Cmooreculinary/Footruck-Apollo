import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ 
  title = "Food Truck Launch Pad",
  description = "Industrial-grade platform for food truck entrepreneurs. From concept to Day One, build your mobile food empire with precision.",
  image = "/og-image.png",
  url = "",
  type = "website"
}) => {
  // Use the actual deployed URL
  const siteUrl = "https://ftlp-showroom-dev.preview.emergentagent.com";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image && image.startsWith("http") ? image : `${siteUrl}${image || '/og-image.png'}`;
  const safeTitle = title || "Food Truck Launch Pad";
  const safeDescription = description || "Industrial-grade platform for food truck entrepreneurs.";
  
  return (
    <Helmet>
      <title>{`${safeTitle} | Blue Collar Apps Co.`}</title>
      <meta name="title" content={`${safeTitle} | Blue Collar Apps Co.`} />
      <meta name="description" content={safeDescription} />
      
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Food Truck Launch Pad" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
