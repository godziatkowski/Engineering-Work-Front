(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'BuildingMarkAsUsableModalCtrl', BuildingMarkAsUsableModalCtrl );

    BuildingMarkAsUsableModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'building', 'Building' ];

    function BuildingMarkAsUsableModalCtrl( $scope, $uibModalInstance, building, Building ){
        $scope.building = building;
        $scope.confirm = confirm;

        function confirm(){
            var building = new Building();
            angular.extend( building, $scope.building );

            building.$markAsUsable( { id: building.id } ).then( function(){
                $uibModalInstance.close();
            } );
        }
    }
})();