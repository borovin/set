const get = require('@basket/get');
const _set = require('lodash.set');
const _mergeWith = require('lodash.mergewith');
const _cloneDeep = require('lodash.clonedeep');
const _isPlainObject = require('lodash.isplainobject');
const isArray = Array.isArray;

function merge(...args) {
    return _mergeWith(...args, (objValue, srcValue) => {
        if (isArray(srcValue)) {
            return _cloneDeep(srcValue);
        }
    });
}

function set(object, path, value) {
    if (_isPlainObject(path)) {
        return merge(object, path);
    }

    if (!object || !path) {
        return object;
    }

    let oldValue = get(object, path);
    let newValue = value;

    if (_isPlainObject(oldValue) && _isPlainObject(newValue)) {
        newValue = merge({}, oldValue, newValue);
    }

    return _set(object, path, _cloneDeep(newValue));
}

module.exports = set;