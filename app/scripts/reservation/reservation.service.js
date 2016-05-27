(function(){
    'user strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'Reservation', Reservation );

    Reservation.$inject = [ '$resource', 'config', 'dateResolveUtil' ];

    function Reservation( $resource, config, dateResolveUtil ){
        var colorTable = [ { color: '#303F9F', textColor: '#FFFFFF' },
            { color: '#1976D2', textColor: '#FFFFFF' },
            { color: '#2196F3', textColor: '#FFFFFF' },
            { color: '#448AFF', textColor: '#FFFFFF' },
            { color: '#0288D1', textColor: '#FFFFFF' },
            { color: '#03A9F4', textColor: '#FFFFFF' },
            { color: '#0097A7', textColor: '#FFFFFF' },
            { color: '#00BCD4', textColor: '#FFFFFF' },
            { color: '#00796B', textColor: '#FFFFFF' },
            { color: '#009688', textColor: '#FFFFFF' },
            { color: '#388E3C', textColor: '#FFFFFF' },
            { color: '#4CAF50', textColor: '#FFFFFF' },
            { color: '#303F9F', textColor: '#FFFFFF' },
            { color: '#689F38', textColor: '#FFFFFF' },
            { color: '#8BC34A', textColor: '#FFFFFF' },
            { color: '#AFB42B', textColor: '#FFFFFF' },
            { color: '#CDDC39', textColor: '#FFFFFF' },
            { color: '#FBC02D', textColor: '#FFFFFF' },
            { color: '#FFEB3B', textColor: '#FFFFFF' },
            { color: '#FFC107', textColor: '#FFFFFF' }
        ];

        return $resource( config.apiUrl + '/reservation', { }, {
            reserve: {
                url: config.apiUrl + '/reservation',
                method: 'POST',
                transformResponse: transformResponse
            },
            edit: {
                url: config.apiUrl + '/reservation',
                method: 'PUT'
            },
            myReservation: {
                url: config.apiUrl + '/reservation/myReservations',
                method: 'GET',
                isArray: true,
                transformResponse: transformResponse
            },
            roomReservations: {
                url: config.apiUrl + '/reservation/room',
                method: 'GET',
                isArray: true,
                transformResponse: transformResponse
            },
            cancel: {
                url: config.apiUrl + '/reservation/:id/cancel',
                method: 'PUT'
            }
        } );

        function transformResponse( data ){
            data = angular.fromJson( data );
            if($.isArray( data )){
                for( var value in data ){
                    data[value].title = 'Reservation for room ' + data[value].room.name;
                    data[value].start = moment( dateResolveUtil.convertToDate( data[value].startDate ) ).utcOffset(2);
                    data[value].end = moment( dateResolveUtil.convertToDate( data[value].endDate ) ).utcOffset(2);
                }
            }
            return data;
        }
    }
})();