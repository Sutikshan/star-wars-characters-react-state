import { ActionTypes } from './fetchReducer';

const fetchCharacters = (dispatch, endpoint, formatData) => {
  dispatch({ type: ActionTypes.FETCHING });

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: ActionTypes.RESPONSE_COMPLETE,
        payload: formatData(data),
      });
    })
    .catch(exc => {
      console.error(exc.message);
      dispatch({ type: ActionTypes.ERROR, payload: exc.message });
    });
};

export default fetchCharacters;
