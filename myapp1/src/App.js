import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import URLShortenerForm from "./components/URLShortenerForm";
import URLStatistics from "./components/URLStatistics";
import RedirectHandler from "./components/RedirectHandler";

// Placeholder components for routing
const URLShortenerPage = () => <URLShortenerForm onSubmit={(urls) => console.log("Submitted URLs:", urls)} />;
const URLStatisticsPage = () => <URLStatistics stats={[]} />; // Placeholder empty stats

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortenerPage />} />
        <Route path="/stats" element={<URLStatisticsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
