import { enableInitializing } from 'initializable-reducer';

const initialState = {
  isAuthenticated: false,
  token: null,
  error: null
};

function admin(state = initialState, { type, payload }) {
  switch (type) {
    case 'ADMIN_LOGIN_SUCCESS':
      return {
        isAuthenticated: payload.signInAdmin.isAuthenticated,
        token: payload.signInAdmin.token,
        error: false
      };
    case 'ADMIN_LOGIN_ERROR':
      return {
        isAuthenticated: false,
        token: null,
        error: true
      };
    default:
      return state;
  }
}

export { admin };

export default enableInitializing(admin);
