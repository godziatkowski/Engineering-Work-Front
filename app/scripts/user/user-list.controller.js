(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'UserListCtrl', UserListCtrl );

    UserListCtrl.$inject = [ '$scope', '$uibModal', 'users', 'toaster' ];

    function UserListCtrl( $scope, $uibModal, users, toaster ){
        $scope.users = users;

        $scope.openGrantAdminRightsModal = openGrantAdminRightsModal;

        function openGrantAdminRightsModal( user ){
            if(user.userRoles.indexOf( 'ADMIN' ) === -1){
                var modal = $uibModal.open( {
                    templateUrl: '/views/user/grantAdminRightsModal.html',
                    controller: 'GrantAdminRightsModalCtrl',
                    size: 'md',
                    resolve: {
                        user: function(){
                            return user;
                        },
                        translations: [ 'loadTranslations', function( loadTranslations ){
                                return loadTranslations( 'user/grantAdminRightsModal' );
                            } ]
                    }
                } );

                modal.result.then( function(){
                    toaster.pop( 'success', 'Succefully granted admin rights for user ' + user.firstName + ' ' + user.lastName );
                } );
            }
        }

    }
})();