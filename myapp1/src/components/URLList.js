import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const URLList = ({ urls }) => {
  if (!urls || urls.length === 0) {
    return <Typography>No shortened URLs to display.</Typography>;
  }

  return (
    <List>
      {urls.map(({ originalUrl, shortUrl, expiry }, index) => (
        <ListItem key={index} divider>
          <ListItemText
            primary={
              <>
                <Typography variant="body1" component="span">
                  Original URL:{" "}
                </Typography>
                <a href={originalUrl} target="_blank" rel="noopener noreferrer">
                  {originalUrl}
                </a>
              </>
            }
            secondary={
              <>
                <Typography variant="body2" component="span">
                  Short URL:{" "}
                </Typography>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
                <br />
                <Typography variant="body2" component="span">
                  Expiry: {expiry ? new Date(expiry).toLocaleString() : "N/A"}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default URLList;
