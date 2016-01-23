(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'GrantAdminRightsModalCtrl', GrantAdminRightsModalCtrl );

    GrantAdminRightsModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'user', 'toaster' ];

    function GrantAdminRightsModalCtrl( $scope, $uibModalInstance, user, toaster ){
        $scope.user = user;
        $scope.confirm = confirm;

        function confirm(){
            $scope.user.$grantAdminRights( { id: $scope.user.id } ).then( function(){
                $uibModalInstance.close();
            }, function( reason ){
                toaster.pop( 'error', reason );
            } );


        }

    }
})();