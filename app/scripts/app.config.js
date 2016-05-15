(function(){
    'use strict';

    var config = {
        apiUrl: 'http://localhost:8080/roombookingapp/api'
    };



    angular
            .module( 'roomBookingApp' )
            .constant( 'config', config )
            .run( [ '$rootScope', '$state', '$cookies', 'Principal', 'Auth', 'languageService',
                function( $rootScope, $state, $cookies, Principal, Auth, languageService ){
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

                    languageService.initialize( $cookies.get( 'language' ) );

                } ] )
            .config( configure );

    configure.$inject = [
        '$urlRouterProvider',
        '$stateProvider',
        '$httpProvider',
        '$translateProvider',
        'cfpLoadingBarProvider'
    ];

    function configure( $urlRouterProvider, $stateProvider, $httpProvider, $translateProvider, cfpLoadingBarProvider ){
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
                    } ],
                translations: [ 'loadTranslations', function( loadTranslations ){
                        return loadTranslations( 'navbar' );
                    } ]
            }
        } );

        $httpProvider.interceptors.push( 'authInterceptor' );

        // Angular loading bar
        cfpLoadingBarProvider.includeSpinner = false;

        // Angular Translate
        $translateProvider.useLoader( '$translatePartialLoader', {
            urlTemplate: '/i18n/{part}/{lang}.json'
        } );
        $translateProvider.use( 'pl_PL' );
        $translateProvider.useStorage( 'languageStorageService' );
        $translateProvider.useSanitizeValueStrategy( 'escaped' );

    }
})();