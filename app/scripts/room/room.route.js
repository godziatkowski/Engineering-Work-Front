(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .config( RoomRouteProvider );

    RoomRouteProvider.$inject = [ '$stateProvider' ];

    function RoomRouteProvider( $stateProvider ){

        var resolveRoom = [ '$stateParams', 'Room', loadRoom ];
        var resolveRooms = [ '$stateParams', 'Room', loadRoomsOnFloor ];
        var resolveFloors = [ 'Room', loadFloors ];
        var resolveReservationsForRoom = [ '$stateParams', 'Reservation', loadReservations ];

        $stateProvider
                .state( 'room', {
                    parent: 'root',
                    url: '/room',
                    'abstract': true,
                    template: '<ui-view />'
                } )
                .state( 'room.list', {
                    parent: 'room',
                    url: '/rooms',
                    templateUrl: 'views/room/list.html',
                    controller: 'RoomListCtrl',
                    resolve: {
                        rooms: resolveRooms,
                        floors: resolveFloors,
                        translations: [ 'loadTranslations', function( loadTranslations ){
                                return loadTranslations( 'room/list' );
                            } ]
                    }
                } )
                .state( 'room.reservations', {
                    parent: 'room',
                    url: '/{id}',
                    templateUrl: 'views/room/calendar.html',
                    controller: 'RoomCalendarCtrl',
                    resolve: {
                        room: resolveRoom,
                        reservations: resolveReservationsForRoom,
                        translations: [ 'loadTranslations', function( loadTranslations ){
                                return loadTranslations( 'room/calendar' );
                            } ]
                    }
                } );

        function loadRoom( $stateParams, Room ){
            return Room.get( { id: $stateParams.id } ).$promise;
        }
        function loadRoomsOnFloor( $stateParams, Room ){
            if($stateParams.floor){
                return Room.roomsOnFloor( { floor: $stateParams.floor } ).$promise;
            } else{
                return Room.query().$promise;
            }
        }
        function loadFloors( Room ){
            return Room.getFloors().$promise;
        }
        function loadReservations( $stateParams, Reservation ){
            var reservationSearchParams = {
                roomId : $stateParams.id
            };
            return Reservation.roomReservations( reservationSearchParams ).$promise;
        }
    }
})();
