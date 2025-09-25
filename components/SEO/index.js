import Head from "next/head";
import portfolioData from "../../data/portfolio.json";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ahmadevelops.com").replace(/\/$/, "");

const sanitizeText = (value) =>
  value ? value.replace(/\s+/g, " ").trim() : "";

const toAbsoluteUrl = (value) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}/${value.replace(/^\//, "")}`;
};

const defaultTitle = `${portfolioData.name} | Full Stack Software Engineer`;
const defaultDescription = sanitizeText(portfolioData.aboutpara);

const SEO = ({
  title,
  description,
  image,
  canonical,
  type = "website",
  datePublished,
  structuredData,
}) => {
  const pageTitle = title ? `${title} | ${portfolioData.name}` : defaultTitle;
  const metaDescription = sanitizeText(description) || defaultDescription;
  const canonicalUrl = canonical ? canonical.replace(/\/$/, "") : SITE_URL;
  const imageUrl = toAbsoluteUrl(image) || toAbsoluteUrl("/images/logo.svg");
  const jsonLd = structuredData ? JSON.stringify(structuredData) : null;

  return (
    <Head>
      <title>{pageTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      <meta name="author" content={portfolioData.name} />
      <meta name="robots" content="index,follow" />
      <meta
        name="keywords"
        content="Full Stack Engineer, Software Engineer, Web Developer, React, Next.js, Tailwind CSS, JavaScript, Portfolio, Product Engineer"
      />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={portfolioData.name} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {metaDescription && (
        <meta name="twitter:description" content={metaDescription} />
      )}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
    </Head>
  );
};

export default SEO;
export { SITE_URL };

