define(function(require, exports, module) {
    //requirements
    var set = require('../set');

    describe('Основной функционал', function(){

        it('Установка значиния в пустой объект', function(){

            var obj = {};

            set(obj, 'a.b.c', 'abc');

            expect(obj.a.b.c).toBe('abc');
        });

        it('Возвращает только изменненные свойства', function(){

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

        it('Модификация массивов', function(){

            var arr = [1,2,3];

            set(arr, [4,5,6]);

            expect(arr).toEqual([4,5,6]);

        });

        it('Модификация объектов', function(){

            var object = {
                a: {
                    b: 'b'
                }
            };

            set(object, 'a.b', 'c');

            expect(object.a.b).toEqual('c');
        });

        it('Установка булева значения', function(){

            var object = {
                a: {
                    b: 'b'
                }
            };

            set(object, 'a.b', false);

            expect(object.a.b).toBeFalsy();
        });

        it('Установка числового значения', function(){

            var object = {
                a: {
                    b: 'b'
                }
            };

            set(object, 'a.b', 1);

            expect(object.a.b).toBe(1);
        });

        it('Установка массива', function(){

            var object = {
                a: {
                    b: 'b'
                }
            };

            set(object, 'a.b', [4,5]);

            expect(object.a.b).toEqual([4,5]);
        });

        it('Модификация вложенных массивов', function(){

            var object = {
                a: {
                    b: [1,2,3]
                }
            };

            set(object, 'a.b', [4,5]);

            expect(object.a.b).toEqual([4,5]);

        });

    });
});