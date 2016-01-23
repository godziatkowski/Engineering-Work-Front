(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'BuildingMarkAsNotUsableModalCtrl', BuildingMarkAsNotUsableModalCtrl );

    BuildingMarkAsNotUsableModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'building', 'Building' ];

    function BuildingMarkAsNotUsableModalCtrl( $scope, $uibModalInstance, building, Building ){
        $scope.building = building;
        $scope.confirm = confirm;

        function confirm(){
            var building = new Building();
            angular.extend( building, $scope.building );

            building.$markAsNotUsable( { id: building.id } ).then( function(){
                $uibModalInstance.close();
            } );
        }
    }
})();