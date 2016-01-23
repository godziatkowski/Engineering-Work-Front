(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .config( UserRouteProvider );

    UserRouteProvider.$inject = [ '$stateProvider' ];

    function UserRouteProvider( $stateProvider ){

        var resolveUsers = [ 'User', loadUsers ];

        $stateProvider
                .state( 'user', {
                    parent: 'root',
                    url: '/user',
                    'abstract': true,
                    template: '<ui-view />'
                } )
                .state( 'user.list', {
                    parent: 'user',
                    url: '/list',
                    templateUrl: 'views/user/list.html',
                    controller: 'UserListCtrl',
                    resolve: {
                        users: resolveUsers
                    }
                } );

        function loadUsers( User ){
            return User.query().$promise;
        }
    }
})();