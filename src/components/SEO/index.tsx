import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

const SITE_NAME = "Todo Pet";
const DEFAULT_SITE_URL = "https://todopetclient.vercel.app";
const DEFAULT_DESCRIPTION = "할 일을 완료하며, 펫과 함께 성장하세요. Todo Pet에서 재미있게 목표를 달성하세요!";
const DEFAULT_KEYWORDS = "할일, 투두, todo, 펫, 목표달성, 습관";
const DEFAULT_IMAGE = "/openGraph.png";

const getSiteUrl = () => {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return DEFAULT_SITE_URL;
};

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url = "/",
  noIndex = false,
}: SEOProps) => {
  const siteUrl = getSiteUrl();
  const pageTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${siteUrl}${url}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
