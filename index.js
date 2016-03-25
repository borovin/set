import map from 'lodash/map';
import forOwn from 'lodash/forOwn';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import each from 'lodash/each';

function deepExtend(obj) {

    var cloneArray;

    if (typeof obj === 'undefined') {
        obj = {};
    }

    cloneArray = function (arr) {
        return map(arr, function (item) {
            if (isPlainObject(item)) {
                return deepExtend({}, item);
            } else if (isArray(item)) {
                return cloneArray(item);
            } else {
                return item;
            }
        });
    };

    each([].slice.call(arguments, 1), function (source) {
        forOwn(source, function (value, key) {
            if (isPlainObject(value)) {
                obj[key] = deepExtend({}, obj[key], value);
            } else if (isArray(value)) {
                obj[key] = cloneArray(value);
            } else {
                obj[key] = value;
            }
        });
    });

    return obj;

}

function getChanges(newData, oldData) {

    var changes = {};

    if (newData === oldData) {
        return {};
    }

    if (!isPlainObject(newData)) {
        return newData;
    }

    forOwn(newData, function (value, key) {
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

    var object = {};
    var attr = object;
    var segments = path.split('.');

    each(segments, function (segment, index) {
        if (index === segments.length - 1) {
            attr[segments[segments.length - 1]] = value;
        } else {
            attr[segment] = {};
        }
        attr = attr[segment];
    });

    return object;
}

export default function (object, path, data) {

    var changedData;

    if (typeof path === 'string') {
        data = pathToObject(path, deepExtend.apply(null, [].slice.call(arguments, 2)));
    } else {
        data = deepExtend.apply(null, [].slice.call(arguments, 1));
    }

    changedData = getChanges(data, object);

    deepExtend(object, data);

    return changedData;

};
