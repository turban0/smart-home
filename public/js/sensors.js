/* global dataForAngular */
(function (angular, hajsApp) {
    smartHomeApp.controller('viewController', ['$scope', '$mdDialog','$resource', function($scope, $mdDialog, $resource) {
        //$scope.sensors = viewInitData.sensors;
        $scope.sensors = [{
            id          : 0,
            name        : "sensor1",
            type        : "TEMPERATURE",
            switchable  : true,
            address     : "192.168.1.1",
            addressType : "IP"
        }];
        
        $scope.refresh = function(){
            $resource('api/sensor/getAll').query().$promise.then(function(response){
                $scope.sensors = response.data;
            });
        }                
        
        $scope.showRemoveDialog = function (sensor) {
            function removeSensor(){
                return $resource('api/sensor/remove/' + sensor.id).save().$promise;
            }
            $scope.showConfirmationDialog(removeSensor, "Remove sensor", "Are you sure to remove sensor " + sensor.title);
        };        
        
        $scope.showConfirmationDialog = function (submitFn, heading, text) {
            var parentEl = angular.element(document.body);
            
            $mdDialog.show({
                parent: parentEl,               
                templateUrl: 'partials/confirmationDialog.html',
                locals: {
                    submit: function(){
                        submitFn().then($mdDialog.hide);
                    },
                    content: {
                        heading: heading,
                        text: text
                    }                    
                },
                escapeToClose: true,
                disableParentScroll: true,
                controller: function($scope, $mdDialog, submit, content){
                    $scope.submit = submit;
                    $scope.content = content;
                    $scope.cancel = $mdDialog.hide;
                }
            });        
        };
    }]);
}(angular, smartHomeApp));