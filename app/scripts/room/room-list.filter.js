(function () {
    'use strict';

    angular
            .module('roomBookingApp')
            .filter('roomListFilter', roomListFilter);

    function roomListFilter() {
        return filter;

        function filter(value, input) {
            var result = [];
            for (var i = 0; i < value.length; i++) {
                if (input !== undefined) {
                    if (!isMatchFloor(value[i], input)) {
                        continue;
                    }
                    
                }
                result.push(value[i]);
            }
            return result;
        }
        
        function isMatchFloor(value, floor) {
            if (value.floor !== floor) {
                return false;
            }
            return true;
        }

    }
})();