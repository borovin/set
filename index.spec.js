var set = require('./index.js');

describe(module.id, function(){

    it('Set new props', function(){

        var obj = {};

        set(obj, 'a.b.c', 'abc');

        expect(obj.a.b.c).toEqual('abc');
    });

    it('Set return only changed properties', function(){

        var obj = {
            a: {
                b: 'b',
                c: 'c',
                d: 'd'
            }
        };

        var changedProps = set(obj, 'a', {
            e: 'e',
            b: 'b',
            c: 'cc'
        });

        expect(changedProps).toEqual({a: {e: 'e', c: 'cc'}});
    });

    it('Array modification', function(){

        var arr = [1,2,3];

        set(arr, [4,5,6]);

        expect(arr).toEqual([4,5,6]);

    });

    it('Object modification', function(){

        var object = {
            a: {
                b: 'b'
            }
        };

        set(object, 'a.b', 'c');

        expect(object.a.b).toEqual('c');
    });

    it('Set boolean', function(){

        var object = {
            a: {
                b: 'b'
            }
        };

        set(object, 'a.b', false);

        expect(object.a.b).toEqual(false);
    });

    it('Set number', function(){

        var object = {
            a: {
                b: 'b'
            }
        };

        set(object, 'a.b', 1);

        expect(object.a.b).toEqual(1);
    });

    it('Set array', function(){

        var object = {
            a: {
                b: 'b'
            }
        };

        set(object, 'a.b', [4,5]);

        expect(object.a.b).toEqual([4,5]);
    });

    it('Set nested array', function(){

        var object = {
            a: {
                b: [1,2,3]
            }
        };

        set(object, 'a.b', [4,5]);

        expect(object.a.b).toEqual([4,5]);

    });

    it('Set multiple objects on object', function(){

        var object = {
            a: 1
        };

        set(object, {
            b: 2
        }, {
            c: 3
        });

        expect(object).toEqual({a: 1, b: 2, c: 3});

    });

    it('Set multiple objects on object path', function(){

        var object = {
            a: 1
        };

        set(object, 'a.b', {
            c: 2
        }, {
            d: 3
        });

        expect(object).toEqual({a: {b: {c: 2, d: 3}}});

    });

    it('Set multiple objects on empty object return all new properties', function(){

        var object = set({}, {
            a: 1
        }, {
            b: 2
        });

        expect(object).toEqual({a: 1, b: 2});

    });

});