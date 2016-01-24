var _ = require('lodash');

function deepExtend(obj) {

    var cloneArray;

    if (typeof obj === 'undefined') {
        obj = {};
    }

    cloneArray = function (arr) {
        return _.map(arr, function (item) {
            if (_.isPlainObject(item)) {
                return deepExtend({}, item);
            } else if (_.isArray(item)) {
                return cloneArray(item);
            } else {
                return item;
            }
        });
    };

    _.each([].slice.call(arguments, 1), function (source) {
        _.forOwn(source, function (value, key) {
            if (_.isPlainObject(value)) {
                obj[key] = deepExtend({}, obj[key], value);
            } else if (_.isArray(value)) {
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

    if (!_.isPlainObject(newData)) {
        return newData;
    }

    _.forOwn(newData, function (value, key) {
        if (_.isPlainObject(value) && oldData[key]) {
            changes[key] = getChanges(value, oldData[key]);

            if (_.isEmpty(changes[key]) && !_.isEmpty(value)) {
                delete changes[key];
            }

        } else if (oldData[key] !== value) {
            changes[key] = value;
        }
    });

    return changes;
}

function pathToObject(path, value) {

    var object = {};
    var attr = object;
    var segments = path.split('.');

    _.each(segments, function (segment, index) {
        if (index === segments.length - 1) {
            attr[segments[segments.length - 1]] = value;
        } else {
            attr[segment] = {};
        }
        attr = attr[segment];
    });

    return object;
}

module.exports = function (object, path, data) {

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
