(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .config( AccountRouteProvider );

    AccountRouteProvider.$inject = [ '$stateProvider' ];

    function AccountRouteProvider( $stateProvider ){
        var resolveAccountData = [ 'Account', loadAccountData ];

        $stateProvider
                .state( 'account', {
                    parent: 'root',
                    url: '/account',
                    'abstract': 'true',
                    template: '<ui-view />'
                } )
                .state( 'account.details', {
                    url: '/details',
                    templateUrl: 'views/account/details.html',
                    controller: 'AccountDetailsCtrl',
                    resolve: {
                        account: resolveAccountData
                    }
                } );

        function loadAccountData( Account ){
            return Account.get().$promise;
        }
    }
})();