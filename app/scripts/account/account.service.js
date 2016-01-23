(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'Account', Account );

    Account.$inject = [ '$resource', 'config' ];

    function Account( $resource, config ){
        return $resource( config.apiUrl + '/account', { }, {
            get: {
                method: 'GET',
                interceptor: {
                    response: function( response ){
                        // expose response
                        return response;
                    }
                },
                transformResponse: transformResponse
            },
            edit: {
                url: config.apiUrl + '/account/edit',
                method: 'POST'
            },
            changePassword: {
                url: config.apiUrl + '/account/changePassword',
                method: 'POST'

            },
            register: {
                url: config.apiUrl + '/account/register',
                method: 'POST'
            }
        } );

        function transformResponse( data ){
            return angular.fromJson( data );
        }
    }
})();
