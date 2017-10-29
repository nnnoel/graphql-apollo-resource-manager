import { combineReducers } from 'redux';
import createProgram from './createProgram';
import updateProgram from './updateProgram';
import deleteProgram from './deleteProgram';

export default combineReducers({
  create: createProgram,
  update: updateProgram,
  delete: deleteProgram
});
