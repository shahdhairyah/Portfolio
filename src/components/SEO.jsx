import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://shahdhairyah.in";

export const SEO = ({
  title,
  description,
  path = "/",
  image = "/og-image.png",
  type = "website",
  noindex = false,
  jsonLd = null,
  citation = null,
  keywords = null,
}) => {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Shah Dhairya" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Google Scholar & Academic Citation Meta Tags */}
      {citation && (
        <>
          {citation.title && <meta name="citation_title" content={citation.title} />}
          {citation.author && <meta name="citation_author" content={citation.author} />}
          {citation.date && <meta name="citation_publication_date" content={citation.date} />}
          {citation.journal && <meta name="citation_journal_title" content={citation.journal} />}
          {citation.issn && <meta name="citation_issn" content={citation.issn} />}
          {citation.volume && <meta name="citation_volume" content={citation.volume} />}
          {citation.issue && <meta name="citation_issue" content={citation.issue} />}
          {citation.doi && <meta name="citation_doi" content={citation.doi} />}
          {citation.pdfUrl && <meta name="citation_pdf_url" content={citation.pdfUrl} />}
        </>
      )}

      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((schema, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  noindex: PropTypes.bool,
  jsonLd: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  citation: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    journal: PropTypes.string,
    issn: PropTypes.string,
    volume: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    issue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    doi: PropTypes.string,
    pdfUrl: PropTypes.string,
  }),
  keywords: PropTypes.string,
};
