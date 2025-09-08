import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import URLList from "./URLList";
import { logUrlShortened } from "../middleware/logger";

const MAX_URLS = 5;

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isValidShortcode = (code) => {
  const regex = /^[a-zA-Z0-9_-]{3,20}$/; // Alphanumeric, underscore, dash, length 3-20
  return regex.test(code);
};

const URLShortenerForm = ({ onSubmit }) => {
  const [urls, setUrls] = useState(
    Array(MAX_URLS).fill({ originalUrl: "", validity: "", shortcode: "" })
  );
  const [errors, setErrors] = useState(Array(MAX_URLS).fill({}));
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const validate = () => {
    const newErrors = urls.map(({ originalUrl, validity, shortcode }) => {
      const err = {};
      if (originalUrl && !isValidUrl(originalUrl)) {
        err.originalUrl = "Invalid URL format";
      }
      if (validity && (!Number.isInteger(Number(validity)) || Number(validity) <= 0)) {
        err.validity = "Validity must be a positive integer";
      }
      if (shortcode && !isValidShortcode(shortcode)) {
        err.shortcode = "Shortcode must be 3-20 chars, alphanumeric, _ or -";
      }
      return err;
    });
    setErrors(newErrors);
    return newErrors.every((e) => Object.keys(e).length === 0);
  };

  const generateShortUrl = (originalUrl, shortcode) => {
    // For now, generate a dummy short URL using shortcode or random string
    const baseUrl = window.location.origin + "/";
    const code = shortcode || Math.random().toString(36).substring(2, 8);
    return baseUrl + code;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const validUrls = urls.filter((u) => u.originalUrl.trim() !== "");
      const newShortened = validUrls.map(({ originalUrl, validity, shortcode }) => {
        const shortUrl = generateShortUrl(originalUrl, shortcode);
        const expiry = validity
          ? new Date(Date.now() + Number(validity) * 60000).toISOString()
          : new Date(Date.now() + 30 * 60000).toISOString(); // default 30 mins
        logUrlShortened(originalUrl, shortUrl, expiry);
        return {
          originalUrl,
          shortUrl,
          expiry,
        };
      });
      setShortenedUrls(newShortened);
      onSubmit(validUrls);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Shorten up to {MAX_URLS} URLs
        </Typography>
        <Grid container spacing={2}>
          {urls.map((url, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Original URL"
                  fullWidth
                  value={url.originalUrl}
                  onChange={(e) => handleChange(index, "originalUrl", e.target.value)}
                  error={!!errors[index]?.originalUrl}
                  helperText={errors[index]?.originalUrl}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Validity (minutes)"
                  fullWidth
                  value={url.validity}
                  onChange={(e) => handleChange(index, "validity", e.target.value)}
                  error={!!errors[index]?.validity}
                  helperText={errors[index]?.validity}
                  type="number"
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Custom Shortcode"
                  fullWidth
                  value={url.shortcode}
                  onChange={(e) => handleChange(index, "shortcode", e.target.value)}
                  error={!!errors[index]?.shortcode}
                  helperText={errors[index]?.shortcode}
                />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Shorten URLs
            </Button>
          </Grid>
        </Grid>
      </form>
      <URLList urls={shortenedUrls} />
    </>
  );
};

export default URLShortenerForm;
