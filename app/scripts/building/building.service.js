(function(){
    'user strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'Building', Building );

    Building.$inject = [ '$resource', 'config' ];

    function Building( $resource, config ){
        return $resource( config.apiUrl + '/building', { }, {
            query: {
                url: config.apiUrl + '/building',
                method: 'GET',
                isArray: true,
                transformResponse: transfromResponse
            },
            get: {
                url: config.apiUrl + '/building/:id',
                method: 'GET',
                transformResponse: transfromResponse
            },
            edit: {
                url: config.apiUrl + '/building/edit',
                method: 'PUT'
            },
            markAsUsable: {
                url: config.apiUrl + '/building/:id/markAsUsable',
                method: 'PUT'
            },
            markAsNotUsable: {
                url: config.apiUrl + '/building/:id/markAsNotUsable',
                method: 'PUT'
            }
        } );

        function transfromResponse( data ){
            data = angular.fromJson( data );
            return data;
        }

    }
})();