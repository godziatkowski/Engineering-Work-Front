(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomMarkAsUsableModalCtrl', RoomMarkAsUsableModalCtrl );

    RoomMarkAsUsableModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'building', 'room', 'Room' ];

    function RoomMarkAsUsableModalCtrl( $scope, $uibModalInstance, building, room, Room ){
        $scope.building = building;
        $scope.room = room;
        $scope.confirm = confirm;

        function confirm(){
            var room = new Room();
            angular.extend( room, $scope.room );

            room.$markAsUsable( { id: room.id } ).then( function(){
                $uibModalInstance.close();
            } );
        }
    }
})();