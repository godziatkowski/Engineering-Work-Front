(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomMarkAsNotUsableModalCtrl', RoomMarkAsNotUsableModalCtrl );

    RoomMarkAsNotUsableModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'building', 'room', 'Room' ];

    function RoomMarkAsNotUsableModalCtrl( $scope, $uibModalInstance, building, room, Room ){
        $scope.building = building;
        $scope.room = room;
        $scope.confirm = confirm;

        function confirm(){
            var room = new Room();
            angular.extend( room, $scope.room );

            room.$markAsNotUsable( { id: room.id } ).then( function(){
                $uibModalInstance.close();
            } );
        }
    }
})();