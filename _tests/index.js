import set from '../index';

describe('set', () => {
  it('Set new props', () => {
    const obj = {};

    set(obj, 'a.b.c', 'abc');

    expect(obj.a.b.c).toEqual('abc');
  });

  it('Set return only changed properties', () => {
    const obj = {
      a: {
        b: 'b',
        c: 'c',
        d: 'd',
      },
    };

    const changedProps = set(obj, 'a', {
      e: 'e',
      b: 'b',
      c: 'cc',
    });

    expect(changedProps).toEqual({ a: { e: 'e', c: 'cc' } });
  });

  it('Array modification', () => {
    const arr = [1, 2, 3];

    set(arr, [4, 5, 6]);

    expect(arr).toEqual([4, 5, 6]);
  });

  it('Object modification', () => {
    const object = {
      a: {
        b: 'b',
      },
    };

    set(object, 'a.b', 'c');

    expect(object.a.b).toEqual('c');
  });

  it('Set boolean', () => {
    const object = {
      a: {
        b: 'b',
      },
    };

    set(object, 'a.b', false);

    expect(object.a.b).toEqual(false);
  });

  it('Set number', () => {
    const object = {
      a: {
        b: 'b',
      },
    };

    set(object, 'a.b', 1);

    expect(object.a.b).toEqual(1);
  });

  it('Set array', () => {
    const object = {
      a: {
        b: 'b',
      },
    };

    set(object, 'a.b', [4, 5]);

    expect(object.a.b).toEqual([4, 5]);
  });

  it('Set nested array', () => {
    const object = {
      a: {
        b: [1, 2, 3],
      },
    };

    set(object, 'a.b', [4, 5]);

    expect(object.a.b).toEqual([4, 5]);
  });

  it('Set multiple objects on object', () => {
    const object = {
      a: 1,
    };

    set(object, {
      b: 2,
    }, {
      c: 3,
    });

    expect(object).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('Set multiple objects on object path', () => {
    const object = {
      a: 1,
    };

    set(object, 'a.b', {
      c: 2,
    }, {
      d: 3,
    });

    expect(object).toEqual({
      a: {
        b: {
          c: 2,
          d: 3,
        },
      },
    });
  });

  it('Set multiple objects on empty object return all new properties', () => {
    const object = set({}, {
      a: 1,
    }, {
      b: 2,
    });

    expect(object).toEqual({ a: 1, b: 2 });
  });

  it('All properties set by values', () => {
    const a = {};
    const b = {};
    const object = {
      c: {
        d: 1,
      },
    };

    set(a, object);
    set(b, object);

    a.c.d = 2;

    expect(b.c.d).toEqual(1);
  });

  it('Unchanged properties set by values', () => {
    const object = {
      c: 1,
    };

    const a = { object };

    const b = { object };

    set(a, { object });

    set(b, { object });

    a.object.c = 2;

    expect(b.object.c).toEqual(1);
  });

  it('Set undefined', () => {
    const a = {};

    set(a, a.test, { b: 1 }, { c: 2 });

    expect(a).toEqual({ b: 1, c: 2 });
  });
});
