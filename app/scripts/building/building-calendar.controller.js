(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'BuildingCalendarCtrl', BuildingCalendarCtrl );

    BuildingCalendarCtrl.$inject = [ '$scope', '$uibModal', 'building', 'reservations', 'identity', 'toaster', 'Reservation' ];

    function BuildingCalendarCtrl( $scope, $uibModal, building, reservations, identity, toaster, Reservation ){
        $scope.identity = identity;
        $scope.building = building;
        $scope.reservations = [ ];
        for( var key in reservations ){
            if($.isArray( reservations[key] )){
                $scope.reservations.push( reservations[key] );
            }
        }
        $scope.calendar = { };
        $scope.calendar.config = {
            buildingCalendar: {
                allDaySlot: false,
                defaultView: 'agendaWeek',
                editable: false,
                eventClick: openEditReservationModal,
                slotEventOverlap: false,
                header: {
                    left: 'title',
                    right: 'month agendaWeek agendaDay today prev,next'
                },
                height: 800,
                scrollTime: '00:00:00',
                select: openReservationModal,
                selectable: true,
                selectHelper: true,
                selectOverlap: false,
                slotLabelFormat: 'H:mm',
                timeFormat: 'DD MMM H:mm'
            }
        };

        function openReservationModal( start, end ){
            var modal = $uibModal.open( {
                controller: 'ReservationAddModalCtrl',
                size: 'md',
                templateUrl: '/views/reservation/addModal.html',
                resolve: {
                    building: function(){
                        return $scope.building;
                    },
                    rooms: [ 'Room', function( Room ){
                            return Room.roomsInBuilding( { buildingId: $scope.building.id } ).$promise;
                        } ],
                    starts: function(){
                        return start;
                    },
                    ends: function(){
                        return end;
                    }
                }
            } );

            modal.result.then( function( result ){
                toaster.pop( 'success', 'Reserved ' + result.room.name );
                reloadReservations();
            } );

        }

        function openEditReservationModal( event ){
            if(identity.id === event.userId){
                var modal = $uibModal.open( {
                    controller: 'ReservationEditModalCtrl',
                    size: 'md',
                    templateUrl: '/views/reservation/EditModal.html',
                    resolve: {
                        rooms: [ 'Room', function( Room ){
                                return Room.roomsInBuilding( { buildingId: $scope.building.id } ).$promise;
                            } ],
                        reservation: function(){
                            return event;
                        }
                    }
                } );

                modal.result.then( function( result ){
                    if(result){
                        toaster.pop( 'success', 'Reservation edited' );
                    }else{
                        toaster.pop( 'success', 'Reservation canceled');
                    }
                    reloadReservations();
                } );
            }
        }
        function reloadReservations(){
            Reservation.buildingReservations( { buildingId: $scope.building.id } )
                    .$promise
                    .then( function( result ){
                        $scope.reservations.splice( 0, $scope.reservations.length );
                        for( var key in result ){
                            if($.isArray( result[key] )){
                                $scope.reservations.push( result[key] );
                            }
                        }
                    } );
        }
    }
})();