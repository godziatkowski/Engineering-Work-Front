(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .config( ReservationRouteProvider );

    ReservationRouteProvider.$inject = [ '$stateProvider' ];

    function ReservationRouteProvider( $stateProvider ){
        var resolvePendingReservations = [ 'Reservation', loadPendingReservations ];
        $stateProvider
                .state( 'reservation', {
                    parent: 'root',
                    url: '/reservation',
                    'abstract': true,
                    template: '<ui-view />'
                } )
                .state( 'reservation.pending', {
                    parent: 'reservation',
                    url: '/reservation/pending',
                    templateUrl: 'views/reservation/pending.html',
                    controller: 'PendingReservationCtrl',
                    resolve: {
                        reservations: resolvePendingReservations,
                        translations: [ 'loadTranslations', function( loadTranslations ){
                                return loadTranslations( 'reservation/pending' );
                            } ]
                    }
                } );

        function loadPendingReservations( Reservation ){
            return Reservation.pending().$promise;

        }
    }
})();