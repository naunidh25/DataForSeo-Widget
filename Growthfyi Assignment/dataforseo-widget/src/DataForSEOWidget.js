// src/DataForSEOWidget.js
import React, { useState } from 'react';
import axios from 'axios';

const DataForSEOWidget = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCheck = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/dataforseo', { url });

      setResult(response.data);
    } catch (error) {
      setError('Error fetching data from DataForSEO API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>DataForSEO Widget</h1>
      <div>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button onClick={handleCheck} disabled={loading}>
          Check
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {result && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataForSEOWidget;
