import { reduce } from 'lodash';

// Remove any falsy values from object so they don't appear at all
function compactObject(obj) {
  const compacted = reduce(
    obj,
    (acc, val, key) => {
      if (val) {
        acc[key] = val;
        return acc;
      }
      return acc;
    },
    {}
  );
  return compacted;
}

export default compactObject;
