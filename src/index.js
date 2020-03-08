import React from 'react';
import ReactDOM from 'react-dom';
import useFetch from './useFetch';
import { BrowserRouter as Router } from 'react-router-dom';
import endpoint from './endpoint';

import CharacterList from './CharacterList';

import './styles.scss';

const formatCharactersData = data => Object.values(data.characters);

const Application = () => {
  const [loading, error, characters] = useFetch(
    `${endpoint}/characters`,
    formatCharactersData,
  );

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
