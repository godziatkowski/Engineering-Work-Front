(function(){
    'use strict';

    angular
            .module( 'roomBookingApp', [
                'angular-loading-bar',
                'ngAnimate',
                'ngCookies',
                'ngResource',
                'LocalStorageModule',
                'pascalprecht.translate',
                'ui.router',
                'ui.bootstrap',
                'ui.calendar',
                'toaster'
            ] );
})();
