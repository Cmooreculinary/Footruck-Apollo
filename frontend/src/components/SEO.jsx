import React from "react";
import { Helmet } from "react-helmet-async";

const DEFAULT_IMAGE = "https://design-studio-614.preview.emergentagent.com/og-image.png";
const SITE_URL = "https://design-studio-614.preview.emergentagent.com";

const SEO = ({ 
  title = "Food Truck Launch Pad",
  description = "The ultimate platform for food truck entrepreneurs. From concept to Day One — design your truck, plan your kitchen, master your finances.",
  image = DEFAULT_IMAGE,
  url = "",
  type = "website"
}) => {
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullImage = image && image.startsWith("http") ? image : DEFAULT_IMAGE;
  const safeTitle = title || "Food Truck Launch Pad";
  const safeDescription = description || "The ultimate platform for food truck entrepreneurs.";
  
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
      <meta property="og:image:secure_url" content={fullImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="1200" />
      <meta property="og:image:alt" content={safeTitle} />
      <meta property="og:site_name" content="Food Truck Launch Pad" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={safeTitle} />
      
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
