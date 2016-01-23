(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'BuildingDetailsCtrl', BuildingDetailsCtrl );

    BuildingDetailsCtrl.$inject = [ '$scope', '$uibModal', 'building', 'rooms', 'toaster', 'Room' ];

    function BuildingDetailsCtrl( $scope, $uibModal, building, rooms, toaster, Room ){
        $scope.building = building;
        $scope.rooms = rooms;
        $scope.openEditRoomModal = openEditRoomModal;
        $scope.openAddRoomModal = openAddRoomModal;
        $scope.changeRoomUsability = changeRoomUsability;
        $scope.openEditBuildingModal = openEditBuildingModal;

        function openAddRoomModal(){
            var modal = $uibModal.open( {
                templateUrl: '/views/room/addModal.html',
                controller: 'RoomAddModalCtrl',
                size: 'md',
                resolve: {
                    building: function(){
                        return $scope.building;
                    }
                }
            } );

            modal.result.then( function( result ){
                $scope.rooms.push( result );
                toaster.pop( 'success', 'Added room in building' + $scope.building.name );
            } );

        }
        function openEditBuildingModal(){
            var modal = $uibModal.open( {
                templateUrl: 'views/building/editModal.html',
                controller: 'BuildingEditModalCtrl',
                size: 'md',
                resolve: {
                    building: function(){
                        return $scope.building;
                    }
                }
            } );

            modal.result.then( function( result ){
                $scope.building = result;
                toaster.pop( 'success', 'Successfully edit building \"' + result.name + '\" at ' + result.address + ' in ' + result.city );
            } );
        }
        
        function openEditRoomModal( room ){
            var modal = $uibModal.open( {
                templateUrl: '/views/room/editModal.html',
                controller: 'RoomEditModalCtrl',
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
            modal.result.then( function(result){
                toaster.pop( 'success', 'Room ' + result.name + ' successfully edited' );
                reloadRooms();
            } );
        }

        function changeRoomUsability( room ){
            if(room.isUsable){
                markRoomAsNotUsable( room );
            } else{
                markRoomAsUsable( room );
            }
        }

        function markRoomAsUsable( room ){
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

        function markRoomAsNotUsable( room ){
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
            var promise = Room.roomsInBuilding( { buildingId: $scope.building.id } ).$promise;

            promise.then( function( result ){
                $scope.rooms = result;
            } );
        }
    }
})();