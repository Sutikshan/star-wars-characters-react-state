import { useEffect, useReducer } from 'react';

const ActionTypes = {
  FETCHING: 'FETCHING',
  RESPONSE_COMPLETE: 'RESPONSE_COMPLETE',
  ERROR: 'ERROR',
};

const reducer = (state, action) => {
  if (action.type === ActionTypes.FETCHING) {
    return {
      loading: true,
      error: null,
      characters: [],
    };
  }

  if (action.type === ActionTypes.RESPONSE_COMPLETE) {
    return {
      loading: false,
      error: null,
      characters: action.payload,
    };
  }

  if (action.type === ActionTypes.ERROR) {
    return {
      loading: false,
      error: action.payload,
      characters: [],
    };
  }

  return state;
};

const useFetch = (endpoint, formatData) => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
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
  }, [endpoint, formatData]);

  const { loading, error, characters } = state;

  return [loading, error, characters];
};

export default useFetch;
