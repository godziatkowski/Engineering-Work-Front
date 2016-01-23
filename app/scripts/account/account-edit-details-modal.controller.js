(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'AccountEditDetailsModalCtrl', AccountEditDetailsModalCtrl );

    AccountEditDetailsModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'account', 'toaster', 'Account' ];

    function AccountEditDetailsModalCtrl( $scope, $uibModalInstance, account, toaster, Account ){
        $scope.account = { };
        angular.extend( $scope.account, account );
        $scope.save = save;
        $scope.constraints = {
            loginMax: 20,
            loginMin: 3,
            loginPattern: '^[a-zA-Z0-9]*$',
            firstNameMax: 50,
            lastNameMax: 50
        };
        function save(){
            var editAccount = new Account();

            angular.extend( editAccount, $scope.account );

            editAccount.$edit().then( function(){
                $uibModalInstance.close();
            }, function( reason ){
                toaster.pop( 'error', 'Couldnt\'t edit user account' );
            } );
        }

    }
})();