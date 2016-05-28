(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .config( LoginRouteProvider );

    LoginRouteProvider.$inject = [ '$stateProvider' ];

    function LoginRouteProvider( $stateProvider ){
        $stateProvider.state( 'login', {
            parent: 'root',
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'LoginController',
            resolve: {
                translations: [ 'loadTranslations', function( loadTranslations ){
                        return loadTranslations( 'login' );
                    } ]
            }
        } );
    }
})();
