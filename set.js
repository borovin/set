define(function (require) {
    //requirements
    var deepExtend = require('bower_components/deepExtend/deepExtend'),
        _ = require('bower_components/lodash/lodash');

    function getChanges(newData, oldData) {

        var changes = {};

        if (newData === oldData) {
            return {};
        }

        if (!_.isPlainObject(newData) || !_.isPlainObject(oldData)) {
            return newData;
        }

        _.forOwn(newData, function (value, key) {
            if (_.isPlainObject(value)) {
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

    function set(object, path, newData, extra) {

        if (_.isPlainObject(newData)) {
            _.forEach(newData, function (value, pathPart) {
                set(object, (path ? path + '.' : '') + pathPart, value, extra);
            });
        } else {
            deepExtend(object, pathToObject(path, newData));
        }
    }

    return function (object, path, data, extra) {

        var changedData;

        if (typeof path === 'string') {
            data = pathToObject(path, data);
        } else {
            extra = data;
            data = path;
        }

        changedData = getChanges(data, object);

        set(object, null, changedData, extra);

        return changedData;
    }
});