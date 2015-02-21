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

    });
});