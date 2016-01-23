(function(){
    'user strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'BuildingListCtrl', BuildingListCtrl );

    BuildingListCtrl.$inject = [ '$scope', '$uibModal', 'buildings', 'toaster', 'Building', 'Principal' ];

    function BuildingListCtrl( $scope, $uibModal, buildings, toaster, Building, Principal ){
        $scope.buildings = buildings;
        $scope.openAddModal = openAddModal;
        $scope.openEditModal = openEditModal;
        $scope.changeUsability = changeUsability;

        checkIfUserHaveAdminRights();

        function openAddModal(){
            var modal = $uibModal.open( {
                templateUrl: 'views/building/addModal.html',
                controller: 'BuildingAddModalCtrl',
                size: 'md'
            } );

            modal.result.then( function( result ){
                $scope.buildings.push( result );
                toaster.pop( 'success', 'Successfully created new building \"' + result.name + '\" at ' + result.address + ' in ' + result.city );
            } );
        }
        function openEditModal( building ){
            var modal = $uibModal.open( {
                templateUrl: 'views/building/editModal.html',
                controller: 'BuildingEditModalCtrl',
                size: 'md',
                resolve: {
                    building: function(){
                        return building;
                    }
                }
            } );

            modal.result.then( function( result ){
                toaster.pop( 'success', 'Successfully edit building \"' + result.name + '\" at ' + result.address + ' in ' + result.city );
                reloadBuildings();
            } );
        }

        function changeUsability( building ){
            if(building.usable){
                markBuildingAsNotUsable( building );
            } else{
                markBuildingAsUsable( building );
            }
        }

        function markBuildingAsUsable( building ){
            var modal = $uibModal.open( {
                templateUrl: '/views/building/markUsableModal.html',
                controller: 'BuildingMarkAsUsableModalCtrl',
                size: 'md',
                resolve: {
                    building: function(){
                        return building;
                    }
                }
            } );
            modal.result.then( function(){
                toaster.pop( 'success', 'Building ' + building.name + ' successfully marked as usable' );
                reloadBuildings();
            } );
        }

        function markBuildingAsNotUsable( building ){
            var modal = $uibModal.open( {
                templateUrl: '/views/building/markNotUsableModal.html',
                controller: 'BuildingMarkAsNotUsableModalCtrl',
                size: 'md',
                resolve: {
                    building: function(){
                        return building;
                    }
                }
            } );
            modal.result.then( function(){
                toaster.pop( 'success', 'Building ' + building.name + ' successfully marked as not usable' );
                reloadBuildings();
            } );
        }

        function reloadBuildings(){
            Building.query().$promise.then( function( result ){
                $scope.buildings = result;
            } );
        }

        function checkIfUserHaveAdminRights(){
            Principal.hasAuthority( 'ADMIN' ).then( function( result ){
                if(result){
                    $scope.isAdmin = true;
                } else{
                    $scope.isAdmin = false;
                }
            } );
        }

    }
})();