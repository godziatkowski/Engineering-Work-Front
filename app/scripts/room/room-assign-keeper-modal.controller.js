(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomAssignKeeperModalCtrl', RoomAssignKeeperModalCtrl );

    RoomAssignKeeperModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'toaster', 'room', 'users' ];

    function RoomAssignKeeperModalCtrl( $scope, $uibModalInstance, toaster, room, users ){
        $scope.room = room;
        $scope.users = users;
        $scope.keeper = {};
        $scope.save = save;

        function save(){
            $scope.room.$assignKeeper( { id: $scope.room.id, userId: $scope.keeper.id } )
                    .then( function(){
                        toaster.pop( 'success', 'Keeper for room assigned' );
                        $uibModalInstance.close();
                    }, function( reason ){
                        toaster.pop( 'error', 'Assigning keeper for room failed' );
                    } );

        }
    }
})();