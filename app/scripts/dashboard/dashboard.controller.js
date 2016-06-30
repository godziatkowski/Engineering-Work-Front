(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'DashboardCtrl', DashboardCtrl );

    DashboardCtrl.$inject = [ '$scope', '$rootScope', '$uibModal', 'myReservations', 'Reservation', 'languageService', 'toaster' ];

    function DashboardCtrl( $scope, $rootScope, $uibModal, myReservations, Reservation, languageService, toaster ){
        $scope.language = resolveLanguage();
        $scope.myReservations = [ ];
        $scope.myReservations.push( myReservations );
        $scope.calendar = { };
        $scope.calendar.config = {
            myReservationsCalendar: {
                lang: $scope.language,
                allDaySlot: false,
                defaultView: 'agendaWeek',
                editable: false,
                eventClick: openEditReservationModal,
                minTime: '08:00:00',
                maxTime: '20:00:00',
                slotEventOverlap: false,
                header: {
                    left: 'title',
                    right: 'month agendaWeek today prev,next'
                },
                height: 598,
                scrollTime: '00:00:00',
                slotLabelFormat: 'H:mm',
                timeFormat: 'DD MMM H:mm',
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives'
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

        $rootScope.$on( 'languageChange', function(){
            $scope.language = resolveLanguage();
            reloadReservations();
        } );

        function resolveLanguage(){
            var activeLanguage = languageService.getActiveLanguage();
            if(activeLanguage === 'en_GB'){
                return 'en';
            } else{
                return 'pl';
            }
        }

    }
})();