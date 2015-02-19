define(function(require) {
    //requirements
    var deepExtend = require('bower_components/deepExtend/deepExtend'),
        _ = require('bower_components/lodash/lodash');

    function pathToObject(path, value){
        var object = {},
            attr = object,
            segments = path.split('.');

        _.each(segments, function(segment, index){
            if (index === segments.length - 1){
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
            _.forEach(newData, function(value, pathPart) {
                set(object, (path ? path + '.' : '') + pathPart, value, extra);
            });
        } else {
            deepExtend(object, pathToObject(path, newData));
        }
    }

    return function(object, path, data, extra) {

        if (typeof path === 'string'){
            data = pathToObject(path, data);
        } else {
            extra = data;
            data = path;
        }

        return set(object, null, data, extra);
    }
});