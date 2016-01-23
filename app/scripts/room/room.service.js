(function(){
    'user strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'Room', Room );

    Room.$inject = [ '$resource', 'config' ];

    function Room( $resource, config ){
        return $resource( config.apiUrl + '/room/:roomId', { }, {
            query: {
                url: config.apiUrl + '/room',
                method: 'GET',
                isArray: true,
                transformResponse: transformResponse
            },
            roomsInBuilding: {
                url: config.apiUrl + '/room/:buildingId/rooms',
                method: 'GET',
                isArray: true,
                transformResponse: transformResponse
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
            }
        } );

        function transformResponse( data ){
            data = angular.fromJson( data );
//            if($.isArray(data)){
//                for( var i in data){
//                    data[i] = angular.fromJson(data[i]);
//                }
//            }
            return data;
        }

    }
})();