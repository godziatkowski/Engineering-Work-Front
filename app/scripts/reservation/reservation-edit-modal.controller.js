(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .controller( 'ReservationEditModalCtrl', ReservationEditModalCtrl );

    ReservationEditModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'room', 'reservation', 'toaster', 'Reservation', 'dateResolveUtil' ];

    function ReservationEditModalCtrl( $scope, $uibModalInstance, room, reservation, toaster, Reservation, dateResolveUtil ){
        $scope.tab = 'EDIT';
        $scope.room = room;
        $scope.today = moment();
        $scope.reservation = reservation;
        $scope.start = reservation.start.format( 'YYYY-MM-DD H:mm' );
        $scope.end = reservation.end.format( 'YYYY-MM-DD H:mm' );
        $scope.startDate = reservation.start.format( 'YYYY-MM-DD' );
        $scope.endDate = reservation.end.format( 'YYYY-MM-DD' );
        $scope.startTime = reservation.start.toDate();
        $scope.endTime = reservation.end.toDate();
        $scope.endDatePickerOpen = false;
        $scope.startDatePickerOpen = false;
        $scope.incorrectDates = false;
        $scope.formIsCorrect = false;

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

            if(!$scope.incorrectDates){
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
            var reservation = new Reservation();
            if($scope.tab === 'EDIT'){
                
                reservation.id = $scope.reservation.id;
                reservation.roomId = $scope.room.id;
                reservation.startDate = dateResolveUtil.convertIfDateToString(concatTimeWithDate( $scope.startDate, $scope.startTime ).toDate());
                reservation.endDate = dateResolveUtil.convertIfDateToString(concatTimeWithDate( $scope.endDate, $scope.endTime ).toDate());
                reservation.$edit().then( function(){
                    reservation.room = $scope.selectedRoom;
                    $uibModalInstance.close( reservation );
                }, function( reason ){
                    if(reason.data.fieldErrors[0].message){
                        toaster.pop( 'error', reason.data.fieldErrors[0].message );
                    } else{
                        toaster.pop( 'error', 'Some error occured' );
                    }
                } );
            } else{
                reservation.$cancel( { id: $scope.reservation.id } ).then( function(){
                    $uibModalInstance.close();
                } );
            }
        }

    }
})();