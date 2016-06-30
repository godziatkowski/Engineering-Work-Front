(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomListCtrl', RoomListCtrl );

    RoomListCtrl.$inject = [ '$scope', '$filter', '$uibModal', 'rooms', 'floors', 'toaster', 'Room' ];

    function RoomListCtrl( $scope, $filter, $uibModal, rooms, floors, toaster, Room ){
        $scope.floors = [ 0, 1, 2, 3, 4 ];
        $scope.floor = $scope.floors[0];
        $scope.addRoom = addRoom;
        $scope.editRoom = editRoom;
        $scope.changeRoomUsability = changeRoomUsability;
        $scope.changeDisplayedFloor = changeDisplayedFloor;
        $scope.changeKeeper = changeKeeper;
        changeDisplayedFloor();

        function addRoom(){
            var modal = $uibModal.open( {
                controller: 'RoomAddModalCtrl',
                size: 'md',
                templateUrl: '/views/room/addModal.html',
                resolve: {
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'room/addModal' );
                        } ]
                }
            } );

            modal.result.then( function( result ){
                toaster.pop( 'success', 'Created new Room ' + result.name );
                $scope.rooms.push( result );
            } );
        }

        function editRoom( room ){
            var modal = $uibModal.open( {
                controller: 'RoomEditModalCtrl',
                size: 'md',
                templateUrl: '/views/room/editModal.html',
                resolve: {
                    room: function(){
                        return room;
                    },
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'room/editModal' );
                        } ]
                }
            } );

            modal.result.then( function( result ){
                toaster.pop( 'success', 'Room ' + result.name + ' edited' );
                reloadRooms();
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
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'room/usabilityModals' );
                        } ]
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
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'room/usabilityModals' );
                        } ]
                }
            } );
            modal.result.then( function(){
                toaster.pop( 'success', 'Room ' + room.name + ' successfully marked as not usable' );
                reloadRooms();
            } );
        }

        function changeKeeper( room ){
            if(room.keeper){
                clearKeeper( room );
            } else{
                assignKeeper( room );
            }

        }

        function assignKeeper( room ){
            var modal = $uibModal.open( {
                templateUrl: '/views/room/assignKeeperModal.html',
                controller: 'RoomAssignKeeperModalCtrl',
                size: 'md',
                resolve: {
                    room: function(){
                        return room;
                    },
                    users: [ 'User', function( User ){
                            return User.query().$promise;
                        } ],
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'room/keeperModals' );
                        } ]
                }
            } );
            modal.result.then( function(){
                reloadRooms();
            } );
        }
        function clearKeeper( room ){
            var modal = $uibModal.open( {
                templateUrl: '/views/room/clearKeeperModal.html',
                controller: 'RoomClearKeeperModalCtrl',
                size: 'md',
                resolve: {
                    room: function(){
                        return room;
                    },
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'room/keeperModals' );
                        } ]
                }
            } );
            modal.result.then( function(){
                reloadRooms();
            } );
        }

        function reloadRooms(){
            Room.query().$promise.then( function( result ){
                rooms = result;
                $scope.rooms = $filter( 'roomListFilter' )( result, $scope.floor );
            } );
        }

        function changeDisplayedFloor(){
            $scope.rooms = $filter( 'roomListFilter' )( rooms, $scope.floor );
        }
    }
})();