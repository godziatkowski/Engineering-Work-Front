(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'RoomAddModalCtrl', RoomAddModalCtrl );

    RoomAddModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'toaster', 'Room' ];

    function RoomAddModalCtrl( $scope, $uibModalInstance,toaster, Room ){
        $scope.room = {
            name: undefined,
            roomType: 'LECTURE_HALL',
            floor: 0,
            seatsCount: 0,
            computerStationsCount: 0,
            hasProjector: false,
            hasBlackboard: false
        };
        $scope.errorsOnFields = [ ];
        $scope.constraints = {
            maxName: 150
        };

        $scope.save = save;

        function save(){
            var room = new Room();
            angular.extend( room, $scope.room );

            room.$save().then( function( result ){
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