(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'ReservationAcceptModalCtrl', ReservationAcceptModalCtrl );

    ReservationAcceptModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'reservation', 'toaster', 'Reservation' ];

    function ReservationAcceptModalCtrl( $scope, $uibModalInstance, reservation, toaster, Reservation ){
        $scope.reservation = reservation;
        $scope.accept = accept;
        function accept(){
            new Reservation().$accept( { id: reservation.id } ).then( function( ){
                $uibModalInstance.close( );
            }, function( reason ){
                toaster.pop( 'error', reason.data.fieldErrors[0].message );
            } );
        }

    }
})();