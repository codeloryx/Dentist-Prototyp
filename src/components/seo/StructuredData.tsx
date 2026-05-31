import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../contexts/LanguageContext";
import { premiumLandingContent } from "../../screens/PremiumLanding/premiumLandingContent";

export const StructuredData = () => {
  const { language } = useLanguage();
  const content = premiumLandingContent[language];
  const baseUrl = window.location.origin;
  const practiceSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": content.footer.copyright,
    "image": `${baseUrl}/og-image.png`,
    "@id": baseUrl,
    "url": baseUrl,
    "telephone": "0211 1593 482",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Charlottenring 12",
      "addressLocality": "Düsseldorf",
      "postalCode": "40227",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.2217,
      "longitude": 6.7762
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.instagram.com/zahnarztpraxis.schmidt",
      "https://www.linkedin.com/company/zahnarztpraxis-schmidt"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faq.items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(practiceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};
