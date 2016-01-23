(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'User', User );

    User.$inject = [ '$resource', 'config' ];

    function User( $resource, config ){
        return $resource( config.apiUrl + '/user', { }, {
            query: {
                url: config.apiUrl + '/user',
                method: 'GET',
                isArray: true
//                transformResponse: transformResponse
            },
            grantAdminRights: {
                url: config.apiUrl + '/user/:id/grantAdminRights',
                method: 'PUT'
            }
        } );

//        function transformResponse(data) {
//            console.log(data)
//            return angular.fromJson(data);
//        }
    }
})();
