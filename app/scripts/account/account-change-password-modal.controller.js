(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'AccountChangePasswordModalCtrl', AccountChangePasswordModalCtrl );

    AccountChangePasswordModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'toaster', 'Account' ];

    function AccountChangePasswordModalCtrl( $scope, $uibModalInstance, toaster, Account ){
        $scope.password = '';
        $scope.confirmPassword = '';

        $scope.constraints = {
            passwordMax: 60,
            passwordMin: 4
        };

        $scope.changePassword = changePassword;

        function changePassword(){
            $scope.submitted = true;
            if($scope.password === $scope.confirmPassword){
                Account.changePassword( { password: $scope.password } ).$promise
                        .then( function(){
                            $uibModalInstance.close();
                        }, function( resaon ){
                            toaster.pop( 'error', 'Couldn\'t change user password' );
                        } );
            }
        }

    }

})();