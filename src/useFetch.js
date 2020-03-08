import { useEffect, useState } from 'react';

const useFetch = (endpoint, formatData) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCharacters([]);

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setCharacters(formatData(data));
        setLoading(false);
      })
      .catch(exc => {
        console.error(exc.message);
        setError(exc);
        setLoading(false);
      });
  }, [endpoint, formatData]);

  return [loading, error, characters];
};

export default useFetch;
