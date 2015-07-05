define(function (require) {
    //requirements
    var _ = require('bower_components/lodash/lodash.js'),
        deepExtend = require('bower_components/deepExtend/deepExtend.js');

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
        var object = {},
            attr = object,
            segments = path.split('.');

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

    return function (object, path, data) {

        var changedData;

        if (typeof path === 'string') {
            data = pathToObject(path, data);
        } else {
            data = path;
        }

        changedData = getChanges(data, object);

        deepExtend(object, changedData);

        return changedData;
    }
});