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
            $scope.loadingSensors = true;
            $resource('api/sensor/getAll').get().$promise.then(function(response){
                console.log(response);
                $scope.sensors = response.data;
                $scope.loadingSensors = false;;
            });
        }                
        
        $scope.remove = function (sensor) {            
            var confirm = $mdDialog.confirm()
                .title("Remove sensor")
                .content("Are you sure to remove sensor " + sensor.name)
                .ariaLabel("Remove sensor")
                .ok("Remove")
                .cancel("Cancel");
                
            $mdDialog.show(confirm).then(function() {
                $scope.loadingSensors = true;
                $resource('api/sensor/remove/' + sensor.id).save().$promise.then($scope.refresh)
            });
        };        
    }]);
}(angular, smartHomeApp));