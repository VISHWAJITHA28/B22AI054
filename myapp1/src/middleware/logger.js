const logEvent = (eventType, details) => {
  // Here you can extend to send logs to a backend or external logging service
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${eventType}]`, details);
};

const logUrlShortened = (originalUrl, shortUrl, expiry) => {
  logEvent("URL_SHORTENED", { originalUrl, shortUrl, expiry });
};

const logRedirect = (shortcode, originalUrl) => {
  logEvent("REDIRECT", { shortcode, originalUrl });
};

const logClick = (shortUrl, clickDetails) => {
  logEvent("CLICK", { shortUrl, clickDetails });
};

export { logUrlShortened, logRedirect, logClick };
