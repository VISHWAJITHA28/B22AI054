import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const URLStatistics = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return <Typography>No statistics available.</Typography>;
  }

  return (
    <List>
      {stats.map(({ shortUrl, createdAt, expiry, totalClicks, clicks }, index) => (
        <ListItem key={index} divider>
          <ListItemText
            primary={
              <>
                <Typography variant="body1" component="span">
                  Short URL:{" "}
                </Typography>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </>
            }
            secondary={
              <>
                <Typography variant="body2" component="div">
                  Created At: {new Date(createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" component="div">
                  Expiry: {expiry ? new Date(expiry).toLocaleString() : "N/A"}
                </Typography>
                <Typography variant="body2" component="div">
                  Total Clicks: {totalClicks}
                </Typography>
                <Typography variant="body2" component="div">
                  Click Details:
                </Typography>
                <List dense>
                  {clicks.map((click, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={`Timestamp: ${new Date(click.timestamp).toLocaleString()}`}
                        secondary={`Source: ${click.source}, Location: ${click.location}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default URLStatistics;
