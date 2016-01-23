(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .config( DashboardRouteProvider );

    DashboardRouteProvider.$inject = [ '$stateProvider' ];

    function DashboardRouteProvider( $stateProvider ){

        var resolveMyReservations = [ 'Reservation', loadMyReservations ];

        $stateProvider.state( 'dashboard', {
            parent: 'root',
            url: '/',
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                myReservations: resolveMyReservations
            }
        } );

        function loadMyReservations( Reservation ){
            return Reservation.myReservation( ).$promise;
        }
    }
})();
