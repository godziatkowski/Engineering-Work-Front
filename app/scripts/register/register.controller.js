(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RegisterController', RegisterController );

    RegisterController.$inject = [ '$scope', '$rootScope', '$state', 'toaster',
        'Auth' ];

    function RegisterController( $scope, $rootScope, $state, toaster, Auth ){
        $scope.username = '';
        $scope.password = '';
        $scope.confirmPassword = '';
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.submitted = false;
        $scope.errors = { };
        $scope.constraints = {
            loginMax: 20,
            loginMin: 3,
            loginPattern: '^[a-zA-Z0-9]*$',
            passwordMax: 60,
            passwordMin: 4,
            firstNameMax: 50,
            lastNameMax: 50
        };

        $scope.register = register;


        function register(){
            $scope.submitted = true;

            if($scope.registerForm.$invalid){
                return;
            } else if($scope.password !== $scope.confirmPassword){
                return;
            }

            $scope.errors = { };

            Auth.createAccount( {
                login: $scope.username,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName
            } ).then( function(){
                Auth.login( {
                    username: $scope.username,
                    password: $scope.password,
                    rememberMe: false
                } ).then( function(){
                    toaster.pop( 'success', 'Successfully registered' );
                    $state.go( 'dashboard' );
                } );
            } ).catch( function( reason ){
                if(loginIsAlreadyInUse( reason )){
                    $scope.errors['loginAlreadyInUse'] = true;
                } else{
                    toaster.pop( 'error', 'Failure', 'Some error occured' );
                }
            } );
        }

        function loginIsAlreadyInUse( reason ){
            reason = reason.data;

            if(!reason.hasOwnProperty( 'fieldErrors' )){
                return false;
            }

            for( var i = 0; i < reason.fieldErrors.length; i++ ){
                if(reason.fieldErrors[i].field === 'login' && reason.fieldErrors[i].message === 'login already in use'){
                    return true;
                }
            }

            return false;
        }
    }
})();
