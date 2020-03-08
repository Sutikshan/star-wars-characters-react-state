import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import './styles.scss';
import endpoint from './endpoint';

const Application = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCharacters([]);

    fetch(`${endpoint}/characters`)
      .then(response => response.json())
      .then(data => {
        setCharacters(Object.values(data.characters));
        setLoading(false);
      })
      .catch(exc => {
        console.error(exc.message);
        setError(exc);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
