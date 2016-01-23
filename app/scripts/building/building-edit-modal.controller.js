(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'BuildingEditModalCtrl', BuildingEditModalCtrl );

    BuildingEditModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'building', 'Building', 'toaster' ];

    function BuildingEditModalCtrl( $scope, $uibModalInstance, building, Building, toaster ){
        $scope.name = building.name;
        $scope.building = { };
        angular.extend( $scope.building, building );
        $scope.constraints = {
            minName: 3,
            maxName: 150,
            minAddress: 3,
            maxAddress: 150,
            minCity: 3,
            maxCity: 150
        };
        $scope.errorsOnFields = [ ];
        $scope.edit = edit;

        function edit(){
            var building = new Building();
            angular.extend( building, $scope.building );

            building.$edit().then( function(){
                $uibModalInstance.close( building );
            }, function( reason ){
                var message = 'You have some incorrect values in your form';
                if(reason.data.fieldErrors.length === 1){
                    message = reason.data.fieldErrors[0].message;
                }
                $scope.errorsOnFields = [ ];
                for( var i = 0; i < reason.data.fieldErrors.length; i++ ){
                    $scope.errorsOnFields.push( reason.data.fieldErrors[0].field );
                }
                toaster.pop( 'error', message );
            } );

        }
    }
})();