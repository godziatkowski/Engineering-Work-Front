(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .config( BuildingRouteProvider );

    BuildingRouteProvider.$inject = [ '$stateProvider' ];

    function BuildingRouteProvider( $stateProvider ){

        var resolveBuildings = [ 'Building', loadBuildings ];
        var resolveSingleBuilding = [ '$stateParams', 'Building', loadBuilding ];
        var resolveRoomsForBuilding = [ '$stateParams', 'Room',
            loadRoomsForBuilding
        ];
        var resolveBuildingReservations = [ '$stateParams', 'Reservation',
            loadReservationForBuilding
        ];
        $stateProvider
                .state( 'building', {
                    parent: 'root',
                    url: '/building',
                    'abstract': true,
                    template: '<ui-view />'
                } )
                .state( 'building.list', {
                    url: '/list',
                    templateUrl: 'views/building/list.html',
                    controller: 'BuildingListCtrl',
                    resolve: {
                        buildings: resolveBuildings
                    }
                } )
                .state( 'building.details', {
                    url: '/{id}/details',
                    templateUrl: 'views/building/details.html',
                    controller: 'BuildingDetailsCtrl',
                    resolve: {
                        building: resolveSingleBuilding,
                        rooms: resolveRoomsForBuilding
                    }
                } )
                .state( 'building.calendar', {
                    url: '/{id}/calendar',
                    templateUrl: 'views/building/calendar.html',
                    controller: 'BuildingCalendarCtrl',
                    resolve: {
                        building: resolveSingleBuilding,
                        reservations: resolveBuildingReservations,
                        identity: [ 'Principal', function( Principal ){
                                return Principal.identity().then( function( identity ){
                                    return identity;
                                } );
                            } ]
                    }
                } );

        function loadBuildings( Building ){
            return Building.query().$promise;
        }
        function loadBuilding( $stateParams, Building ){
            return Building.get( { id: $stateParams.id } ).$promise;
        }
        function loadRoomsForBuilding( $stateParams, Room ){
            return Room.roomsInBuilding( { buildingId: $stateParams.id } ).$promise;
        }
        function loadReservationForBuilding( $stateParams, Reservation ){
            return Reservation.buildingReservations( { buildingId: $stateParams.id } ).$promise;
        }
    }
})();
