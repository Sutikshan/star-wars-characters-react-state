export const ActionTypes = {
  FETCHING: 'FETCHING',
  RESPONSE_COMPLETE: 'RESPONSE_COMPLETE',
  CHARACTER_RESPONSE_COMPLETE: 'CHARACTER_RESPONSE_COMPLETE',
  ERROR: 'ERROR',
};

export const initialState = {
  error: null,
  loading: true,
  result: null,
};

export const fetchReducer = (state, action) => {
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

  if (action.type === ActionTypes.CHARACTER_RESPONSE_COMPLETE) {
    return {
      ...state,
      loading: false,
      error: null,
      character: action.payload,
    };
  }

  return state;
};

export default fetchReducer;
