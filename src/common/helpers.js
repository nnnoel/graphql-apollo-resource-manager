// Used primarily for apollo mutation lifecycles
// Inspiration from https://medium.com/@machadogj/async-action-creators-with-redux-thunk-83af81994250 and https://github.com/Carlows/alt-market
export function createThunk(type, fn) {
  return payload => async dispatch => {
    dispatch({
      type: `${type}_STARTED`,
      payload
    });

    try {
      const response = await fn(payload);
      dispatch({
        type: `${type}_SUCCESS`,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: `${type}_ERROR`,
        payload: error
      });
    }

    dispatch({
      type: `${type}_ENDED`,
      payload
    });
  };
}
