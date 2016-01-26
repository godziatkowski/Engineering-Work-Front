(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'DashboardCtrl', DashboardCtrl );

    DashboardCtrl.$inject = [ '$scope', '$uibModal', 'myReservations', 'Reservation', 'toaster' ];

    function DashboardCtrl( $scope, $uibModal, myReservations, Reservation, toaster ){
        $scope.myReservations = [ ];
        $scope.myReservations.push( myReservations );
        $scope.calendar = { };
        $scope.calendar.config = {
            myReservationsCalendar: {
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
                slotLabelFormat: 'H:mm',
                timeFormat: 'DD MMM H:mm'
            }
        };

        function openEditReservationModal( event ){
            var modal = $uibModal.open( {
                controller: 'ReservationEditModalCtrl',
                size: 'md',
                templateUrl: '/views/reservation/EditModal.html',
                resolve: {
                    rooms: function(){
                        return null;
                    },
                    reservation: function(){
                        return event;
                    }
                }
            } );

            modal.result.then( function( result ){
                if(result){
                    toaster.pop( 'success', 'Reservation edited' );
                } else{
                    toaster.pop( 'success', 'Reservation canceled' );
                }
                reloadReservations();
            } );
        }
        function reloadReservations(){
            Reservation.myReservation( ).$promise.then( function( result ){
                $scope.myReservations.splice( 0, $scope.myReservations.length );
                $scope.myReservations.push( result );
            } );
        }

    }
})();