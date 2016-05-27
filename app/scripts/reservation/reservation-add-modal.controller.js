(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'ReservationAddModalCtrl', ReservationAddModalCtrl );

    ReservationAddModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'room', 'starts', 'ends', 'toaster', 'Reservation', 'dateResolveUtil' ];

    function ReservationAddModalCtrl( $scope, $uibModalInstance, room, starts, ends, toaster, Reservation, dateResolveUtil ){
        $scope.room = room;
        $scope.today = moment();
        $scope.startDate = moment(starts).format( 'YYYY-MM-DD' );
        $scope.endDate = moment(ends).format( 'YYYY-MM-DD' );
        $scope.startTime = moment(starts);
        $scope.endTime = moment(ends);
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
            if(startDateAndTimeAreCorrect() && endDateAndTimeAreCorrect){
                $scope.incorrectDates = startDateBeforeEndDate();
            } else{
                $scope.incorrectDates = false;
            }

            if(!$scope.incorrectDates){
                $scope.formIsCorrect = true;
            } else{
                $scope.formIsCorrect = false;
            }
        }
        function startDateAndTimeAreCorrect(){
            return $scope.startDate && $scope.startTime;
        }
        function endDateAndTimeAreCorrect(){
            return $scope.endDate && $scope.endTime;

        }
        function startDateBeforeEndDate(){
            var start = concatTimeWithDate( $scope.startDate, $scope.startTime );
            var end = concatTimeWithDate( $scope.endDate, $scope.endTime );
            return end.isSame( start ) || end.isBefore( start );
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
            var reservation = new Reservation();
            reservation.roomId = $scope.room.id;
            reservation.startDate = dateResolveUtil.convertIfDateToString(concatTimeWithDate( $scope.startDate, $scope.startTime ).toDate());
            reservation.endDate = dateResolveUtil.convertIfDateToString(concatTimeWithDate( $scope.endDate, $scope.endTime ).toDate());

            reservation.$reserve().then( function( result ){
                result.room = $scope.selectedRoom;
                $uibModalInstance.close( result );
            }, function( reason ){
                toaster.pop( 'error', reason.data.fieldErrors[0].message );
            } );
        }

    }
})();