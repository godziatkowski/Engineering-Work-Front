(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'NavbarController', NavbarController );

    NavbarController.$inject = [
        '$scope',
        '$cookies',
        '$state',
        'Auth',
        'Principal',
        'languageService',
        'toaster' ];

    function NavbarController( $scope, $cookies, $state, Auth, Principal, languageService, toaster ){
        $scope.logout = logout;
        $scope.changeLanguage = changeLanguage;
        if($cookies.get( 'language' )){
            $scope.activeLanguage = $cookies.get( 'language' );
        } else{
            changeLanguage( 'pl_PL' );
        }

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
        }
    }
})();
