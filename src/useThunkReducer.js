import { useCallback, useReducer } from 'react';
import isFunction from 'lodash/isFunction';

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    action => {
      if (isFunction(action)) {
        action(dispatch);
        return;
      }

      dispatch(action);
    },
    [dispatch],
  );

  return [state, enhancedDispatch];
};

export default useThunkReducer;
