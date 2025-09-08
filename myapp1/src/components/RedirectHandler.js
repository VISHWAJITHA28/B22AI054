import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logRedirect } from "../middleware/logger";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // For now, simulate lookup of original URL from shortcode
    // In real app, this would query client-side state or backend
    const urlMapping = {
      // Example mapping; in real app, replace with actual data source
      "abc123": "https://www.example.com",
      "xyz789": "https://www.google.com",
    };

    const originalUrl = urlMapping[shortcode];

    if (originalUrl) {
      // Log redirect event using middleware
      logRedirect(shortcode, originalUrl);

      // Redirect to original URL
      window.location.href = originalUrl;
    } else {
      // If shortcode not found, navigate to home or show error
      navigate("/", { replace: true });
    }
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
