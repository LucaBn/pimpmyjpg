import React, { useEffect } from "react";

type LangUrlsType = {
  it: string;
  en: string;
  jp: string;
};

interface MetatagsProps {
  title: string;
  description: string;
  keywords?: string;
  langUrls?: LangUrlsType;
  image: `${string}.jpg`;
}

const Metatags: React.FC<MetatagsProps> = ({
  title,
  description,
  keywords,
  langUrls,
  image,
}) => {
  useEffect(() => {
    const head = document.getElementsByTagName("head")[0];

    // Title
    document.title = title;

    const ogMetaTitle = document.querySelector('meta[name="og:title"]');
    if (ogMetaTitle) {
      ogMetaTitle.setAttribute("content", title);
    } else {
      const ogMetaTitleTag = document.createElement("meta");
      ogMetaTitleTag.setAttribute("property", "og:title");
      ogMetaTitleTag.setAttribute("content", title);
      head.appendChild(ogMetaTitleTag);
    }

    // Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const metaDescTag = document.createElement("meta");
      metaDescTag.setAttribute("name", "description");
      metaDescTag.setAttribute("content", description);
      head.appendChild(metaDescTag);
    }

    const ogMetaDescription = document.querySelector(
      'meta[name="og:description"]'
    );
    if (ogMetaDescription) {
      ogMetaDescription.setAttribute("content", description);
    } else {
      const ogMetaDescTag = document.createElement("meta");
      ogMetaDescTag.setAttribute("property", "og:description");
      ogMetaDescTag.setAttribute("content", description);
      head.appendChild(ogMetaDescTag);
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    metaKeywords?.remove();

    if (keywords) {
      const metaKeywordsTag = document.createElement("meta");
      metaKeywordsTag.setAttribute("name", "keywords");
      metaKeywordsTag.setAttribute("content", keywords);
      head.appendChild(metaKeywordsTag);
    }

    // Hreflang
    const existingHrefLangs = document.querySelectorAll(
      'link[rel="alternate"]'
    );
    existingHrefLangs.forEach((el) => el.remove());

    if (langUrls) {
      Object.entries(langUrls).forEach(([lang, url]) => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", lang);
        link.setAttribute("href", url);
        head.appendChild(link);
      });
    }

    // Image
    const ogMetaImage = document.querySelector('meta[property="og:image"]');
    if (ogMetaImage) {
      ogMetaImage.setAttribute("content", image);
    } else {
      const ogMetaImageTag = document.createElement("meta");
      ogMetaImageTag.setAttribute("property", "og:image");
      ogMetaImageTag.setAttribute("content", image);
      head.appendChild(ogMetaImageTag);
    }
  }, [title, description, keywords, langUrls]);

  return null;
};

export default Metatags;
