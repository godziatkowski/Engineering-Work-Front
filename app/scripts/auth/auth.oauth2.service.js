(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'AuthServerProvider', loginService );

    loginService.$inject = [ '$http', 'localStorageService', 'Base64', 'config'
    ];

    function loginService( $http, localStorageService, Base64, config ){
        return {
            login: function( credentials ){
                var data =
                        "username=" + encodeURIComponent( credentials.username )
                        + "&password=" + encodeURIComponent( credentials.password )
                        + "&grant_type=password"
                        + "&scope=read%20write"
                        + "&client_secret=SecretRoomBookingAppOAuthSecret"
                        + "&client_id=roombookingapp";
                return $http.post( config.apiUrl + '/oauth/token', data, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "application/json",
                        "Authorization": "Basic " + Base64.encode( "roombookingapp" + ':' + "SecretRoomBookingAppOAuthSecret" )
                    }
                } ).success( function( response ){
                    var expiredAt = new Date();
                    expiredAt.setSeconds( expiredAt.getSeconds() + response.expires_in );
                    response.expires_at = expiredAt.getTime();
                    localStorageService.set( 'token', response );
                    return response;
                } );
            },
            logout: function(){
                $http.post( config.apiUrl + '/logout' ).then( function(){
                    localStorageService.clearAll();
                } );
            },
            getToken: function(){
                return localStorageService.get( 'token' );
            },
            hasValidToken: function(){
                var token = this.getToken();
                return token && token.expires_at && token.expires_at > new Date().getTime();
            }
        };
    }
})();
