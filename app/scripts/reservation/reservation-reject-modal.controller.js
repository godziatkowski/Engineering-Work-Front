(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'ReservationRejectModalCtrl', ReservationRejectModalCtrl );

    ReservationRejectModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'reservation', 'toaster', 'Reservation' ];

    function ReservationRejectModalCtrl( $scope, $uibModalInstance, reservation, toaster, Reservation ){
        $scope.reservation = reservation;
        $scope.reject = reject;

        function reject(){
            new Reservation().$reject( { id: reservation.id } ).then( function( ){
                $uibModalInstance.close( );
            }, function( reason ){
                toaster.pop( 'error', reason.data.fieldErrors[0].message );
            } );
        }

    }
})();