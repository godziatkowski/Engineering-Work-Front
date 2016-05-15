(function(){
    'use strict';

    angular
            .module( 'roomBookingApp' )
            .factory( 'loadTranslations', loadTranslations );

    loadTranslations.$inject = [ '$translate', '$translatePartialLoader' ];

    function loadTranslations( $translate, $translatePartialLoader ){
        var currentPromise = null;

        return function(){
            for( var i = 0; i < arguments.length; i++ ){
                $translatePartialLoader.addPart( arguments[i] );
            }

            if(currentPromise){
                currentPromise = currentPromise['finally']( function(){
                    return $translate.refresh();
                } );
            } else{
                currentPromise = $translate.refresh();
            }

            return currentPromise;
        };
    }
})();