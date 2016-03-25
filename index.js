import map from 'lodash/map';
import forOwn from 'lodash/forOwn';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import each from 'lodash/each';

function deepExtend(obj = {}, ...args) {
  const result = obj;

  function cloneArray(arr) {
    return map(arr, (item) => {
      if (isPlainObject(item)) {
        return deepExtend({}, item);
      } else if (isArray(item)) {
        return cloneArray(item);
      }

      return item;
    });
  }

  each(args, (source) => {
    forOwn(source, (value, key) => {
      if (isPlainObject(value)) {
        result[key] = deepExtend({}, result[key], value);
      } else if (isArray(value)) {
        result[key] = cloneArray(value);
      } else {
        result[key] = value;
      }
    });
  });

  return result;
}

function getChanges(newData, oldData) {
  const changes = {};

  if (newData === oldData) {
    return {};
  }

  if (!isPlainObject(newData)) {
    return newData;
  }

  forOwn(newData, (value, key) => {
    if (isPlainObject(value) && oldData[key]) {
      changes[key] = getChanges(value, oldData[key]);

      if (isEmpty(changes[key]) && !isEmpty(value)) {
        delete changes[key];
      }
    } else if (oldData[key] !== value) {
      changes[key] = value;
    }
  });

  return isEmpty(changes) ? null : changes;
}

function pathToObject(path, value) {
  const object = {};
  let attr = object;
  const segments = path.split('.');

  each(segments, (segment, index) => {
    if (index === segments.length - 1) {
      attr[segments[segments.length - 1]] = value;
    } else {
      attr[segment] = {};
    }
    attr = attr[segment];
  });

  return object;
}

export default function (...args) {
  const object = args[0];
  const path = args[1];
  let result = args[2];

  if (typeof path === 'string') {
    result = pathToObject(path, deepExtend.apply(null, args.slice(2)));
  } else {
    result = deepExtend.apply(null, args.slice(1));
  }

  const changedData = getChanges(result, object);

  deepExtend(object, result);

  return changedData;
}
