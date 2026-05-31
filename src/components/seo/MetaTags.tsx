import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export const MetaTags = ({
  title = "Dental Practice Dr. Maria Schmidt · Evidence-Based Dentistry Dusseldorf",
  description = "Diagnostics, planning and treatment at a documented high standard in Dusseldorf. Calm processes, clear communication and measurable quality standards.",
  canonical = window.location.href,
  ogImage = "/og-image.png",
  ogType = "website"
}: MetaTagsProps) => {
  const baseUrl = window.location.origin;
  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;
  const absoluteCanonical = canonical.startsWith("http") ? canonical : `${baseUrl}${canonical}`;

  const fullTitle = title.includes("Dr. Maria Schmidt") 
    ? title 
    : `${title} | Dental Practice Dr. Maria Schmidt`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={absoluteCanonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
    </Helmet>
  );
};
