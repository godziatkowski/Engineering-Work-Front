(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomListCtrl', RoomListCtrl );

    RoomListCtrl.$inject = [ '$scope', '$state', '$uibModal', 'rooms', 'floors', 'toaster' ];

    function RoomListCtrl( $scope, $state, $uibModal, rooms, floors, toaster ){
        $scope.rooms = rooms;
        $scope.floors = floors;
        $scope.addRoom = addRoom;

        function addRoom(){
            var modal = $uibModal.open( {
                controller: 'RoomAddModalCtrl',
                size: 'md',
                templateUrl: '/views/room/addModal.html'
            } );

            modal.result.then( function( result ){
                toaster.pop( 'success', 'Created new Room ' + result.name );
                $scope.rooms.push( result );
            } );
        }

    }
})();