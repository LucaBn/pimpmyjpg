/**
 * Opens a new window for sharing the given URL on Facebook.
 *
 * @param {string} shareUrl - The URL to be shared.
 * @returns {void}
 */
export const shareOnFacebook = (shareUrl: string) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    "_blank"
  );
};

/**
 * Opens a new window for sharing the given URL on Twitter.
 *
 * @param {string} shareUrl - The URL to be shared.
 * @returns {void}
 */
export const shareOnTwitter = (shareUrl: string) => {
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    "_blank"
  );
};

/**
 * Opens a new window for sharing the given URL on WhatsApp.
 *
 * @param {string} shareUrl - The URL to be shared.
 * @returns {void}
 */
export const shareOnWhatsapp = (shareUrl: string) => {
  window.open(
    `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
    "_blank"
  );
};

/**
 * Opens a new window for sharing the given URL on Telegram.
 *
 * @param {string} shareUrl - The URL to be shared.
 * @returns {void}
 */
export const shareOnTelegram = (shareUrl: string) => {
  window.open(
    `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
    "_blank"
  );
};
