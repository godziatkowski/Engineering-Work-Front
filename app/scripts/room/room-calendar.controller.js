(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomCalendarCtrl', RoomCalendarCtrl );

    RoomCalendarCtrl.$inject = [ '$scope', '$rootScope', '$uibModal', 'room', 'reservations', 'identity', 'languageService', 'toaster', 'Reservation' ];

    function RoomCalendarCtrl( $scope, $rootScope, $uibModal, room, reservations, identity, languageService, toaster, Reservation ){
        $scope.identity = identity;
        $scope.room = room;
        $scope.language = resolveLanguage();
        $scope.reservations = [ ];
        $scope.reservations.push( reservations );
        $scope.calendar = { };
        $scope.calendar.config = {
            roomCalendar: {
                lang: $scope.language,
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
                slotLabelFormat: 'H:mm',
                timeFormat: 'DD MMM H:mm',
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives'
            }
        };

        function openReservationModal( start, end ){
            var modal = $uibModal.open( {
                controller: 'ReservationAddModalCtrl',
                size: 'md',
                templateUrl: '/views/reservation/addModal.html',
                resolve: {
                    room: function(){
                        return $scope.room;
                    },
                    starts: function(){
                        return start.toISOString();
                    },
                    ends: function(){
                        return end.toISOString();
                    },
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'reservation/addModal' );
                        } ]
                }
            } );

            modal.result.then( function( result ){
                toaster.pop( 'success', 'Reserved ' + $scope.room.name );
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
                        room: function(){
                            return $scope.room;
                        },
                        reservation: function(){
                            return event;
                        },
                        translations: [ 'loadTranslations', function( loadTranslations ){
                                return loadTranslations( 'reservation/editModal' );
                            } ]
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
        }
        function reloadReservations(){
            Reservation.roomReservations( { roomId: $scope.room.id } )
                    .$promise
                    .then( function( result ){
                        $scope.reservations.splice( 0, $scope.reservations.length );
                        $scope.reservations.push( result );
                    } );
        }

        $rootScope.$on( 'languageChange', function(){
            $scope.language = resolveLanguage();
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