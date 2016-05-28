(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'LoginController', LoginController );

    LoginController.$inject = [ '$scope', '$rootScope', '$state', 'Auth' ];

    function LoginController( $scope, $rootScope, $state, Auth ){
        $scope.login = login;
        $scope.username = "";
        $scope.password = "";

        function login( event ){
            event.preventDefault();
            Auth.login( {
                username: $scope.username,
                password: $scope.password
            } ).then( function(){
                $scope.authenticationError = false;
                $state.go( 'dashboard' );
            } ).catch( function(){
                $scope.authenticationError = true;
            } );
        }
    }
})();
