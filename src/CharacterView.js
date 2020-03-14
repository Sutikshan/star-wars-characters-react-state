import React, { useEffect } from 'react';
import useThunkReducer from './useThunkReducer';
import fetchCharacters from './fetchCharacters';
import fetchReducer, { initialState, ActionTypes } from './fetchReducer';
import endpoint from './endpoint';

const formatCharacterData = data => data.character;

const CharacterView = ({ match }) => {
  const characterId = match && match.params && match.params.id;
  const [state, dispatch] = useThunkReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!characterId) {
      return;
    }

    dispatch(dispatch =>
      fetchCharacters(
        dispatch,
        `${endpoint}/characters/${characterId}`,
        formatCharacterData,
        ActionTypes.CHARACTER_RESPONSE_COMPLETE,
      ),
    );
  }, [dispatch, characterId]);
  const { character } = state;

  if (!character) {
    return null;
  }

  return (
    <section className="CharacterView">
      <h2>{character.name}</h2>
      <ul className="CharacterDetails">
        <li>
          <strong>Birth Year</strong>: {character.birthYear}
        </li>
        <li>
          <strong>Eye Color</strong>: {character.eyeColor}
        </li>
        <li>
          <strong>Gender</strong>: {character.gender}
        </li>
        <li>
          <strong>Hair Color</strong>: {character.hairColor}
        </li>
        <li>
          <strong>Heigh</strong>: {character.height}
        </li>
        <li>
          <strong>Mass</strong>: {character.mass}
        </li>
        <li>
          <strong>Skin Color</strong>: {character.skinColor}
        </li>
      </ul>
    </section>
  );
};

export default CharacterView;
