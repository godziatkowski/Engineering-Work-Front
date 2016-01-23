(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'ReservationCancelModalCtrl', ReservationCancelModalCtrl );

    ReservationCancelModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'reservation', 'Reservation' ];

    function ReservationCancelModalCtrl( $scope, $uibModalInstance, reservation, Reservation ){
        $scope.reservation = reservation;
        $scope.confirm = confirm;

        function confirm(){
            var reservation = new Reservation();


            reservation.$cancel( { id: $scope.reservation.id } ).then( function(){
                $uibModalInstance.close();
            } )
        }

    }
})();