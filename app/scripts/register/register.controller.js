(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RegisterController', RegisterController );

    RegisterController.$inject = [ '$scope', '$state', 'toaster',
        'Auth' ];

    function RegisterController( $scope, $state, toaster, Auth ){
        $scope.username = '';
        $scope.confirmPassword = '';
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.submitted = false;
        $scope.errors = { };
        $scope.constraints = {
            loginMax: 255,
            loginMin: 3,
            loginPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+p\.lodz\.pl))$/,
            firstNameMax: 50,
            lastNameMax: 50
        };

        $scope.register = register;


        function register(){
            $scope.submitted = true;

            if($scope.registerForm.$invalid){
                return;
            }
            $scope.errors = { };

            Auth.createAccount( {
                login: $scope.username,
                firstName: $scope.firstName,
                lastName: $scope.lastName
            } ).then( function(){
                $state.go( 'login' );
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
