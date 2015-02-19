define(function(require, exports, module) {
    //requirements
    var set = require('../set');

    describe('Основной функционал', function(){

        it('Установка значиния в пустой объект', function(){

            var obj = {};

            set(obj, 'a.b.c', 'abc');

            expect(obj.a.b.c).toBe('abc');
        });

    });
});