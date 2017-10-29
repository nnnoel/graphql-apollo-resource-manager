const initialState = {
  started: false,
  succeeded: false,
  errored: false,
  ended: false
};

function updateProgram(state = initialState, { type }) {
  switch (type) {
    case 'UPDATE_PROGRAM_STARTED':
      return {
        started: true,
        succeeded: false,
        errored: false,
        ended: false
      };
    case 'UPDATE_PROGRAM_SUCCESS':
      return {
        started: false,
        succeeded: true,
        errored: false,
        ended: false
      };
    case 'UPDATE_PROGRAM_ERROR':
      return {
        started: false,
        succeeded: false,
        errored: true,
        ended: false
      };
    case 'UPDATE_PROGRAM_ENDED':
      return {
        started: false,
        succeeded: false,
        errored: false,
        ended: true
      };
    default:
      return state;
  }
}

export default updateProgram;
