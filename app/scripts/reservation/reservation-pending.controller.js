(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'PendingReservationCtrl', PendingReservationCtrl );

    PendingReservationCtrl.$inject = [ '$scope', '$uibModal', 'reservations' ];

    function PendingReservationCtrl( $scope, $uibModal, reservations ){
        $scope.pendingReservations = reservations;
        $scope.accept = accept;
        $scope.reject = reject;

        function accept( reservation ){
            var modal = $uibModal.open( {
                controller: 'ReservationAcceptModalCtrl',
                size: 'md',
                templateUrl: '/views/reservation/acceptModal.html',
                resolve: {
                    reservation: function(){
                        return reservation;
                    },
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'reservation/acceptModal' );
                        } ]
                }
            } );

            modal.result.then( function( ){
                $scope.pendingReservations.splice( $scope.pendingReservations.indexOf( reservation ), 1 );
            } );
        }
        function reject( reservation ){
            var modal = $uibModal.open( {
                controller: 'ReservationRejectModalCtrl',
                size: 'md',
                templateUrl: '/views/reservation/rejectModal.html',
                resolve: {
                    reservation: function(){
                        return reservation;
                    },
                    translations: [ 'loadTranslations', function( loadTranslations ){
                            return loadTranslations( 'reservation/rejectModal' );
                        } ]
                }
            } );

            modal.result.then( function( ){
                $scope.pendingReservations.splice( $scope.pendingReservations.indexOf( reservation ), 1 );
            } );
        }


    }
})();