define(function(require, exports, module) {
    //requirements
    var set = require('../set');

    describe('Основной функционал', function(){

        it('Установка значиния в пустой объект', function(){

            var obj = {};

            set(obj, 'a.b.c', 'abc');

            expect(obj.a.b.c).toBe('abc');
        });

        it('Установка значиния в частично заполненный объект', function(){

            var obj = {
                a: {
                    b: 'b',
                    c: 'c',
                    d: 'd'
                }
            };

            set(obj, 'a', {
                e: 'e',
                b: 'f'
            });

            expect(obj.a.e).toBe('e');
            expect(obj.a.b).toBe('f');
        });

    });
});