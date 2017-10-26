import compactObject from '../utilities/compactObject';

describe('Utilities', () => {
  describe('compactObject', () => {
    const object = { a: 'foo', b: false, c: undefined, d: null, e: () => {} };
    const compactedObject = compactObject(object);
    it('should return a new object with all falsy props removed', () => {
      expect(compactedObject).not.toHaveProperty('b');
      expect(compactedObject).not.toHaveProperty('c');
      expect(compactedObject).not.toHaveProperty('d');
      expect(compactedObject).toHaveProperty('a');
      expect(compactedObject).toHaveProperty('e');
      expect(compactedObject).not.toMatchObject(object);
    });
  });
});
