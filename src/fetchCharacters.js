import { ActionTypes } from './fetchReducer';

const fetchCharacters = (
  dispatch,
  endpoint,
  formatData,
  type = ActionTypes.RESPONSE_COMPLETE,
) => {
  dispatch({ type: ActionTypes.FETCHING });

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type,
        payload: formatData(data),
      });
    })
    .catch(exc => {
      dispatch({ type: ActionTypes.ERROR, payload: exc.message });
    });
};

export default fetchCharacters;
