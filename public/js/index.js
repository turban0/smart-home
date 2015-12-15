
/* global viewInitData */
(function (angular, hajsApp) {
    smartHomeApp.controller('viewController', ['$scope', '$resource', function($scope, $resource) {
        $scope.sensors = viewInitData.sensors;
        
        $scope.refresh = function(){
            $resource('api/sensor/getAll').query().$promise.then(function(response){
                $scope.sensors = response.data;
            });
        }
    }]);
}(angular, smartHomeApp));