(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .directive( 'languageFlag', languageFlag );

    languageFlag.$inject = [ ];

    function languageFlag(){
        return {
            restrict: 'AE',
            templateUrl: 'views/languageFlag.html',
            scope: {
                languageFlag: '=',
                withLabel: '='
            }
        };
    }

})();