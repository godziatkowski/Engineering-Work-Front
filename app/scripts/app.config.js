(function(){
    'use strict';

    var config = {
        apiUrl: 'http://localhost:8080/roombookingapp/api'
    };

    angular
            .module( 'roomBookingApp' )
            .constant( 'config', config )
            .run( function( $rootScope, $state, Principal, Auth ){

                $rootScope.$on( '$stateChangeStart', function( event, toState,
                        toStateParams ){
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;
                    if(Principal.isIdentityResolved()){
                        Auth.authorize();
                    }

                } );

                $rootScope.back = function(){
                    if($state.get( $rootScope.previousStateName ) === null){
                        $state.go( 'login' );
                    } else{
                        $state.go( $rootScope.previousStateName, $rootScope.previousStateParams );
                    }
                };
            } )
            .config( configure );

    configure.$inject = [
        '$urlRouterProvider',
        '$stateProvider',
        '$httpProvider',
        'cfpLoadingBarProvider'
    ];

    function configure( $urlRouterProvider, $stateProvider, $httpProvider,
            cfpLoadingBarProvider ){
        $urlRouterProvider.otherwise( '/' );

        $stateProvider.state( 'root', {
            abstract: true,
            views: {
                'content@': {
                    template: '<ui-view />'
                },
                'navbar@': {
                    templateUrl: 'views/navbar/navbar.html',
                    controller: 'NavbarController'
                }
            },
            resolve: {
                identity: [ 'Auth', function( Auth ){
                        return Auth.authorize();
                    } ]
            }
        } );

        $httpProvider.interceptors.push( 'authInterceptor' );

        // Angular loading bar
        cfpLoadingBarProvider.includeSpinner = false;
    }
})();