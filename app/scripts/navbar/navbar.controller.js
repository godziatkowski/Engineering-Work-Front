(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'NavbarController', NavbarController );

    NavbarController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        'Auth',
        'Principal',
        'languageService',
        'toaster' ];

    function NavbarController( $scope, $rootScope, $state, Auth, Principal, languageService, toaster ){
        $scope.logout = logout;
        $scope.changeLanguage = changeLanguage;
        $scope.activeLanguage = languageService.getActiveLanguage();

        Principal.identity().then( function( identity ){
            $scope.identity = identity;
        } );

        $scope.$on( 'loginSuccess', function( eventm, identity ){
            $scope.identity = identity;
        } );


        function logout(){
            Auth.logout();
            $scope.identity = null;

            toaster.pop( 'success', 'Logged out' );
            $state.go( 'login' );
        }

        function changeLanguage( language ){
            $scope.activeLanguage = language;
            languageService.setActiveLanguage( language );
            $rootScope.$broadcast('languageChange');
        }
    }
})();
