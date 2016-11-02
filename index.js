const get = require('@basket/get');
const _set = require('lodash/set');
const mergeWith = require('lodash/mergeWith');
const cloneDeep = require('lodash/cloneDeep');
const isPlainObject = require('lodash/isPlainObject');
const isArray = Array.isArray;

function merge(...args) {
    return mergeWith(...args, (objValue, srcValue) => {
        if (isArray(srcValue)) {
            return cloneDeep(srcValue);
        }
    });
}

function set(object, path, value) {
    if (isPlainObject(path)) {
        return merge(object, path);
    }

    if (!object || !path) {
        return object;
    }

    let oldValue = get(object, path);
    let newValue = value;

    if (isPlainObject(oldValue) && isPlainObject(newValue)) {
        newValue = merge({}, oldValue, newValue);
    }

    return _set(object, path, cloneDeep(newValue));
}

module.exports = set;