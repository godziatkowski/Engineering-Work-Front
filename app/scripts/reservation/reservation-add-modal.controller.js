(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'ReservationAddModalCtrl', ReservationAddModalCtrl );

    ReservationAddModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'building', 'rooms', 'starts', 'ends', 'toaster', 'Reservation' ];

    function ReservationAddModalCtrl( $scope, $uibModalInstance, building, rooms, starts, ends, toaster, Reservation ){
        $scope.building = building;
        $scope.rooms = rooms;
        $scope.today = moment();
        $scope.startDate = starts.format( 'YYYY-MM-DD' );
        $scope.endDate = ends.format( 'YYYY-MM-DD' );
        $scope.startTime = starts.toDate();
        $scope.endTime = ends.toDate();
        $scope.endDatePickerOpen = false;
        $scope.startDatePickerOpen = false;
        $scope.incorrectDates = false;
        $scope.formIsCorrect = false;
        $scope.selectedRoom = undefined;

        $scope.openEndDatePicker = openEndDatePicker;
        $scope.openStartDatePicker = openStartDatePicker;
        $scope.validateForm = validateForm;
        $scope.save = save;

        validateForm();

        function openStartDatePicker(){
            $scope.startDatePickerOpen = true;
        }
        function openEndDatePicker(){
            $scope.endDatePickerOpen = true;
        }

        function validateForm(){
            if($scope.startDate && $scope.startTime && $scope.endDate && $scope.endTime){
                var start = concatTimeWithDate( $scope.startDate, $scope.startTime );
                var end = concatTimeWithDate( $scope.endDate, $scope.endTime );
                $scope.incorrectDates = end.isBefore( start );
            } else{
                $scope.incorrectDates = false;
            }

            if($scope.selectedRoom && !$scope.incorrectDates){
                $scope.formIsCorrect = true;
            } else{
                $scope.formIsCorrect = false;
            }
        }

        function concatTimeWithDate( date, time ){
            var momentDate = moment( date );
            var momentTime = moment( time );
            var result = moment( );
            result.set( { 'year': momentDate.year(), 'month': momentDate.month(), 'date': momentDate.date(),
                'hour': momentTime.hour(), 'minute': momentTime.minute(),
                'second': 0, 'miliseconds': 0 } );
            return result;
        }
        function save(){
            var start = concatTimeWithDate( $scope.startDate, $scope.startTime );
            var end = concatTimeWithDate( $scope.endDate, $scope.endTime );
            var reservation = new Reservation();
            reservation.roomId = $scope.selectedRoom.id;
            reservation.startDate = start;
            reservation.endDate = end;

            reservation.$reserve().then( function( result ){
                result.room = $scope.selectedRoom;
                $uibModalInstance.close( result );
            }, function( reason ){
                toaster.pop('error', reason.data.fieldErrors[0].message);
            } );
        }

    }
})();