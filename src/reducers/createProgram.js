import { enableInitializing } from 'initializable-reducer';

const initialState = {
  started: false,
  succeeded: false,
  errored: false,
  ended: false
};

function createProgram(state = initialState, { type }) {
  switch (type) {
    case 'CREATE_PROGRAM_STARTED':
      return {
        started: true,
        succeeded: false,
        errored: false,
        ended: false
      };
    case 'CREATE_PROGRAM_SUCCESS':
      return {
        started: false,
        succeeded: true,
        errored: false,
        ended: false
      };
    case 'CREATE_PROGRAM_ERROR':
      return {
        started: false,
        succeeded: false,
        errored: true,
        ended: false
      };
    case 'CREATE_PROGRAM_ENDED':
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

export { createProgram };

export default enableInitializing(createProgram);
