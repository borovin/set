const set = require('../index');

it('should set new properties', () => {
    const obj = {};

    set(obj, 'a.b.c', 'abc');

    expect(obj.a.b.c).toEqual('abc');
});

it('should set object', () => {
    const object = {
        a: {
            b: 'b',
        },
    };

    set(object, 'a', {c: 'c'});

    expect(object.a).toEqual({
        b: 'b',
        c: 'c'
    });
});

it('should set string', () => {
    const object = {
        a: {
            b: 'b',
        },
    };

    set(object, 'a.b', 'c');

    expect(object.a.b).toEqual('c');
});

it('should set boolean', () => {
    const object = {
        a: {
            b: 'b',
        },
    };

    set(object, 'a.b', false);

    expect(object.a.b).toEqual(false);
});

it('should set number', () => {
    const object = {
        a: {
            b: 'b',
        },
    };

    set(object, 'a.b', 1);

    expect(object.a.b).toEqual(1);
});

it('should set array', () => {
    const object = {
        a: {
            b: 'b',
        },
    };

    set(object, 'a.b', [4, 5]);

    expect(object.a.b).toEqual([4, 5]);
});

it('should replace array', () => {
    const object = {
        a: {
            b: [1, 2, 3],
        },
    };

    set(object, 'a.b', [4, 5]);

    expect(object.a.b).toEqual([4, 5]);
});

it('should set all properties by values', () => {
    const a = {};
    const b = {};
    const object = {
        value: 1,
    };

    set(a, 'path', object);
    set(b, 'path', object);

    a.path.value = 2;

    expect(b.path.value).toEqual(1);
});

it('should merge value if path not passed', () => {
    const a = {};

    set(a, {b: 1});

    expect(a.b).toEqual(1);
});

it('should replace arrays if path not passed', () => {
    const a = {
        array: [1, 2]
    };

    set(a, {array: [3, 4]});

    expect(a.array).toEqual([3, 4]);
});

it('should return object if value not passed', () => {
    const a = {
        b: 1
    };

    expect(set(a)).toEqual({b: 1});
});
