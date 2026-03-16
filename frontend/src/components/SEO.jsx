import React from "react";
import { Helmet } from "react-helmet-async";

const DEFAULT_IMAGE = "https://customer-assets.emergentagent.com/job_750cf976-26d8-4bfa-9e94-eee06e714e86/artifacts/svuwg9mb_274d8457-be63-45b6-9aaa-51fbc158cbbf.png";

const SEO = ({ 
  title = "Food Truck Launch Pad",
  description = "The ultimate platform for food truck entrepreneurs. From concept to Day One — design your truck, plan your kitchen, master your finances.",
  image = DEFAULT_IMAGE,
  url = "",
  type = "website"
}) => {
  // Use the actual deployed URL
  const siteUrl = "https://ftlp-showroom-dev.preview.emergentagent.com";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="1200" />
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
