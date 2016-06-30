(function(){
    'user strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'Room', Room );

    Room.$inject = [ '$resource', 'config' ];

    function Room( $resource, config ){
        return $resource( config.apiUrl + '/room/:id', { }, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: transformResponse
            },
            get: {
                method: 'GET',
                transformResponse: transformResponse
            },
            roomsOnFloor: {
                url: config.apiUrl + '/room/:floor/rooms',
                method: 'GET',
                isArray: true,
                transformResponse: transformResponse
            },
            getFloors:{
                url: config.apiUrl + '/room/floors',
                method: 'GET',
                isArray: true
            },
            edit: {
                url: config.apiUrl + '/room',
                method: 'PUT'
            },
            markAsUsable: {
                url: config.apiUrl + '/room/:id/markAsUsable',
                method: 'PUT'
            },
            markAsNotUsable: {
                url: config.apiUrl + '/room/:id/markAsNotUsable',
                method: 'PUT'
            
            },
            assignKeeper: {
                url: config.apiUrl + '/room/:id/assignKeeper',
                method: 'PUT'
            
            },
            clearKeeper: {
                url: config.apiUrl + '/room/:id/clearKeeper',
                method: 'PUT'
            
            }
            
        } );

        function transformResponse( data ){
            data = angular.fromJson( data );
            return data;
        }

    }
})();