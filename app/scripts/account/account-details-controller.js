(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'AccountDetailsCtrl', AccountDetailsCtrl );

    AccountDetailsCtrl.$inject = [ '$scope', '$uibModal', 'account', 'toaster' ];

    function AccountDetailsCtrl( $scope, $uibModal, account, toaster ){
        $scope.accountData = account.data;
        $scope.openChangePasswordModal = openChangePasswordModal;
        $scope.openEditDetailsModal = openEditDetailsModal;



        function openChangePasswordModal(){
            var modal = $uibModal.open( {
                templateUrl: '/views/account/changePasswordModal.html',
                controller: 'AccountChangePasswordModalCtrl',
                size: 'md'
            } );
            modal.result.then( function(){
                toaster.pop( 'success', 'Password succesfully changed' );
            } );
        }
        function openEditDetailsModal(){
            var modal = $uibModal.open( {
                templateUrl: '/views/account/editModal.html',
                controller: 'AccountEditDetailsModalCtrl',
                size: 'md',
                resolve: {
                    account: function(){
                        return $scope.accountData;
                    }
                }
            } );
            modal.result.then( function(){
                toaster.pop( 'success', 'Account data successfully changed' );
            } );
        }

    }


})();