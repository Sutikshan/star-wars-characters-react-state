import { useEffect } from 'react';
import useThunkReducer from './useThunkReducer';
import { ActionTypes, initialState, fetchReducer } from './fetchReducer';

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

const useFetch = (endpoint, formatData) => {
  const [state, dispatch] = useThunkReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch(dispatch => fetchCharacters(dispatch, endpoint, formatData));
  }, [dispatch, endpoint, formatData]);

  const { loading, error, characters } = state;

  return [loading, error, characters];
};

export default useFetch;
