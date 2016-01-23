(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomEditModalCtrl', RoomEditModalCtrl );

    RoomEditModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'room', 'building', 'Room', 'toaster' ];

    function RoomEditModalCtrl( $scope, $uibModalInstance, room, building, Room, toaster ){
        $scope.building = { };
        angular.extend( $scope.building, building );
        $scope.room = { };
        angular.extend( $scope.room, room );
        $scope.errorsOnFields = [ ];
        $scope.constraints = {
            maxName: 150
        };

        $scope.edit = edit;

        function edit(){
            var editRoom = new Room();
            angular.extend( editRoom, $scope.room );

            editRoom.$edit().then( function(){
                $uibModalInstance.close( editRoom);
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