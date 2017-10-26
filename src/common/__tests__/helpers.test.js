import { createThunk } from '../helpers';
import { first, last } from 'lodash';

describe('Helpers', () => {
  describe('createThunk', () => {
    let mockCallback = jest.fn();
    let mockDispatch = jest.fn();
    const payload = { something: true };
    const type = 'TEST_ACTION';
    const asyncAction = createThunk(type, mockCallback)(payload);

    beforeEach(() => {
      mockCallback.mockReset();
      mockDispatch.mockReset();
    });

    it(`should dispatch an action of type ${type}_STARTED`, () => {
      return asyncAction(mockDispatch).then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_STARTED`,
          payload
        });
      });
    });

    it(`should dispatch an action of type ${type}_ENDED`, () => {
      return asyncAction(mockDispatch).then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_ENDED`,
          payload
        });
      });
    });

    it(`should dispatch an action of type ${type}_SUCCESS when the callback has no errors`, () => {
      const response = { data: { some: 'fake data' } };
      mockCallback.mockReturnValue(response);

      return asyncAction(mockDispatch).then(() => {
        expect(mockCallback).toBeCalled();
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_SUCCESS`,
          payload: response.data
        });
      });
    });

    it(`should dispatch an action of type ${type}_ERROR when the callback throws any error`, () => {
      mockCallback.mockImplementation(() => {
        throw 'some error';
      });

      return asyncAction(mockDispatch).then(() => {
        expect(mockCallback).toBeCalled();
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_ERROR`,
          payload: 'some error'
        });
      });
    });

    it(`should call dispatch exactly 3 times`, () => {
      return asyncAction(mockDispatch).then(() => {
        expect(mockDispatch.mock.calls.length).toEqual(3);
      });
    });

    it(`should always dispatch an action of type ${type}_STARTED first`, () => {
      return asyncAction(mockDispatch).then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_STARTED`,
          payload
        });
        expect(first(mockDispatch.mock.calls)[0].type).toEqual(
          `${type}_STARTED`
        );
      });
    });

    it(`should always dispatch an action of type ${type}_ENDED last`, () => {
      return asyncAction(mockDispatch).then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_ENDED`,
          payload
        });
        expect(last(mockDispatch.mock.calls)[0].type).toEqual(`${type}_ENDED`);
      });
    });
  });
});
