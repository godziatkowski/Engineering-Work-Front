(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomClearKeeperModalCtrl', RoomClearKeeperModalCtrl );

    RoomClearKeeperModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'toaster', 'room' ];

    function RoomClearKeeperModalCtrl( $scope, $uibModalInstance, toaster, room ){
        $scope.room = room;
        $scope.keeper = room.keeper;
        $scope.save = save;

        function save(){
            $scope.room.$clearKeeper( { id: $scope.room.id } )
                    .then( function(){
                        toaster.pop( 'success', 'Keeper role for room has been cleared' );
                        $uibModalInstance.close();
                    }, function( reason ){
                        toaster.pop( 'error', 'Cleraing keeper role for room failed' );
                    } );

        }
    }
})();