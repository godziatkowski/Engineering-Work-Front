(function(){
    'user strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'Reservation', Reservation );

    Reservation.$inject = [ '$resource', 'config', 'dateResolveUtil', 'languageService' ];

    function Reservation( $resource, config, dateResolveUtil, languageService ){
        var colorTable = [
            { color: '#449d44', textColor: '#000000' },
            { color: '#FDD835', textColor: '#000000' }
        ];
        var labels = {
            pl: 'Rezerwacja pomieszczenia ',
            en: 'Reservation for room '
        };

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
            pending: {
                url: config.apiUrl + '/reservation/pending',
                method: 'GET',
                isArray: true,
                transformResponse: transformResponse
            },
            pendingCount: {
                url: config.apiUrl + '/reservation/pending/count',
                method: 'GET'
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
            },
            accept: {
                url: config.apiUrl + '/reservation/:id/accept',
                method: 'PUT'
            },
            reject: {
                url: config.apiUrl + '/reservation/:id/reject',
                method: 'PUT'
            }
        } );

        function transformResponse( data ){
            data = angular.fromJson( data );
            if($.isArray( data )){
                for( var value in data ){
                    if(data[value].reservationStatus === 'PENDING'){
                        data[value].color = colorTable[1].color;
                        data[value].textColor = colorTable[1].textColor;
                    } else if(data[value].reservationStatus === 'ACCEPTED'){
                        data[value].color = colorTable[0].color;
                        data[value].textColor = colorTable[0].textColor;
                    }
                    if(languageService.getActiveLanguage() === 'pl_PL'){
                        data[value].title = labels.pl + data[value].room.name;
                    } else{
                        data[value].title = labels.en + data[value].room.name;
                    }
                    data[value].createdAt = moment( dateResolveUtil.convertToDate( data[value].createdAt ) ).utcOffset( 2 );
                    data[value].start = moment( dateResolveUtil.convertToDate( data[value].startDate ) ).utcOffset( 2 );
                    data[value].end = moment( dateResolveUtil.convertToDate( data[value].endDate ) ).utcOffset( 2 );
                }
            }
            return data;
        }
    }
})();