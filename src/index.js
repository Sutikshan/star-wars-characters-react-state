import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import fetchReducer, { initialState } from './fetchReducer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import endpoint from './endpoint';
import useThunkReducer from './useThunkReducer';
import CharacterList from './CharacterList';
import fetchCharacters from './fetchCharacters';
import CharacterView from './CharacterView';
import './styles.scss';

const formatCharactersData = data => Object.values(data.characters);

const Application = () => {
  const [state, dispatch] = useThunkReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch(dispatch =>
      fetchCharacters(dispatch, `${endpoint}/characters`, formatCharactersData),
    );
  }, [dispatch]);

  const { loading, error, characters } = state;

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
        <section className="CharacterView">
          <Route path="/characters/:id" component={CharacterView} />
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
