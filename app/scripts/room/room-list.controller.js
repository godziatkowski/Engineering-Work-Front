(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomListCtrl', RoomListCtrl );

    RoomListCtrl.$inject = [ '$scope', '$uibModal', 'rooms', 'floors', 'toaster', 'Room' ];

    function RoomListCtrl( $scope, $uibModal, rooms, floors, toaster, Room ){
        $scope.rooms = rooms;
        $scope.floors = floors;
        $scope.addRoom = addRoom;
        $scope.changeRoomUsability = changeRoomUsability;


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

        function changeRoomUsability( room ){
            if(room.isUsable){
                markAsNotUsable( room );
            } else{
                markAsUsable( room );
            }
        }

        function markAsUsable( room ){
            var modal = $uibModal.open( {
                templateUrl: '/views/room/markUsableModal.html',
                controller: 'RoomMarkAsUsableModalCtrl',
                size: 'md',
                resolve: {
                    room: function(){
                        return room;
                    },
                    building: function(){
                        return $scope.building;
                    }
                }
            } );
            modal.result.then( function(){
                toaster.pop( 'success', 'Room ' + room.name + ' successfully marked as usable' );
                reloadRooms();
            } );
        }
        function markAsNotUsable( room ){
            var modal = $uibModal.open( {
                templateUrl: '/views/room/markNotUsableModal.html',
                controller: 'RoomMarkAsNotUsableModalCtrl',
                size: 'md',
                resolve: {
                    room: function(){
                        return room;
                    },
                    building: function(){
                        return $scope.building;
                    }
                }
            } );
            modal.result.then( function(){
                toaster.pop( 'success', 'Room ' + room.name + ' successfully marked as not usable' );
                reloadRooms();
            } );
        }

        function reloadRooms(){
            Room.query().$promise.then( function( result ){
                $scope.rooms = result;
            } );
        }
    }
})();