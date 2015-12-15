/* global angular, message, pageTitle */
var smartHomeApp = (function (angular) {
	var smartHomeApp = angular.module('smartHomeApp', ['ngMaterial', 'ngResource']);

    smartHomeApp.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
                          .primaryPalette('teal')
                          .accentPalette('pink');
    });

    smartHomeApp.controller('appController', ['$scope', '$mdToast', function($scope, $mdToast) {        
        if(message !== ""){
            $mdToast.show($mdToast.simple().content(message));
        }       
        $scope.pageTitle = pageTitle;    
        $scope.leftMenuItems = [
            {name: 'Homepage', url: '/'},
            {name: 'Sensors', url: '/sensors'}
        ]    
    }]);
    
    //should be overriden by page specific controller
    //empty controlled is used for pages when angular would be not necessary
    smartHomeApp.controller('viewController', function() {});
    
    return smartHomeApp;
}(angular));