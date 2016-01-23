'use strict';

angular.module( 'roomBookingApp' )
        .factory( 'Activate', function( $resource ){
            return $resource( 'api/activate', { }, {
                'get': { method: 'GET', params: { }, isArray: false }
            } );
        } );


