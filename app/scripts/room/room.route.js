(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .config( RoomRouteProvider );

    RoomRouteProvider.$inject = [ '$stateProvider' ];

    function RoomRouteProvider( $stateProvider ){

        var resolveRoom = [ '$stateParams', 'Room', loadRooms ];
        var resolveReservationsForRoom = [ '$stateParams', 'Reservation', loadReservations ];

        $stateProvider
                .state( 'room', {
                    parent: 'root',
                    url: '/room',
                    'abstract': true,
                    template: '<ui-view />'
                } )
                .state( 'room.reservations', {
                    parent: 'room',
                    url: '/{id}',
                    templateUrl: 'views/room/reservations.html',
                    controller: 'RoomReservationsCtrl',
                    resolve: {
                        room: resolveRoom,
                        reservations: resolveReservationsForRoom
                    }
                } );

        function loadRooms( $stateParams, Room ){
            return Room.get( { id: $stateParams.id } ).$promise;
        }
        function loadReservations( $stateParams, Reservation ){
            return Reservation.roomReservations( { id: $stateParams.id } ).$promise;
        }
    }
})();
