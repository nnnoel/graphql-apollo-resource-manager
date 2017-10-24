import { enableInitializing } from 'initializable-reducer';

const initialState = {
  started: false,
  succeeded: false,
  errored: false,
  ended: false
};

function deleteProgram(state = initialState, { type }) {
  switch (type) {
    case 'DELETE_PROGRAM_STARTED':
      return {
        started: true,
        succeeded: false,
        errored: false,
        ended: false
      };
    case 'DELETE_PROGRAM_SUCCESS':
      return {
        started: false,
        succeeded: true,
        errored: false,
        ended: false
      };
    case 'DELETE_PROGRAM_ERROR':
      return {
        started: false,
        succeeded: false,
        errored: true,
        ended: false
      };
    case 'DELETE_PROGRAM_ENDED':
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

export { deleteProgram };

export default enableInitializing(deleteProgram);
