(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'BuildingAddModalCtrl', BuildingAddModalCtrl );

    BuildingAddModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'Building', 'toaster' ];

    function BuildingAddModalCtrl( $scope, $uibModalInstance, Building, toaster ){
        $scope.building = {
            name: undefined,
            address: undefined,
            city: undefined
        };
        $scope.constraints = {
            minName: 3,
            maxName: 150,
            minAddress: 3,
            maxAddress: 150,
            minCity: 3,
            maxCity: 150
        };
        $scope.errorsOnFields = [ ];
        $scope.save = save;

        function save(){
            var building = new Building();
            angular.extend( building, $scope.building );

            building.$save().then( function( result ){
                $uibModalInstance.close( result );
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