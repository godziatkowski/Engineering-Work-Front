(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'DashboardCtrl', DashboardCtrl );

    DashboardCtrl.$inject = [ '$scope', '$uibModal', 'myReservations', 'Reservation' ];

    function DashboardCtrl( $scope, $uibModal, myReservations, Reservation ){
        $scope.myReservations = [ ];
        $scope.myReservations.push( myReservations );
        $scope.calendar = { };
        $scope.calendar.config = {
            myReservationsCalendar: {
                allDaySlot: false,
                defaultView: 'agendaWeek',
                editable: false,
                eventClick: openCancelReservationModal,
                slotEventOverlap: false,
                header: {
                    left: 'title',
                    right: 'month agendaWeek agendaDay today prev,next'
                },
                height: 800,
                scrollTime: '00:00:00',
                slotLabelFormat: 'H:mm',
                timeFormat: 'DD MMM H:mm'
            }
        };

        function openCancelReservationModal( event ){
            var modal = $uibModal.open( {
                templateUrl: '/views/reservation/cancelModal.html',
                controller: 'ReservationCancelModalCtrl',
                size: 'sm',
                resolve: {
                    reservation: function(){
                        return event;
                    }
                }
            } );

            modal.result.then( function(){
                Reservation.myReservation( ).$promise.then( function( result ){
                    $scope.myReservations.splice( 0, $scope.myReservations.length );
                    $scope.myReservations.push( result );
                } )

            } );
        }

    }
})();