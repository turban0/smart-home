/* global dataForAngular */
(function (angular, hajsApp) {
    smartHomeApp.controller('viewController', ['$scope', '$mdDialog', '$mdToast','$resource', function($scope, $mdDialog, $mdToast, $resource) {
        $scope.items = viewInitData.settlements;
        
        $scope.refresh = function(){
            $resource('api/getSettlements').query().$promise.then(function(data){
                $scope.items = data;
            });
        }
        
        $scope.modalDialog = {
            title: ''
        };
        
        $scope.add = function ($event) {
            $scope.modalDialog.title = 'Add Debt';
            $scope.showDialog($event);
        };
        
        $scope.remove = function ($event) {
            $scope.modalDialog.title = 'Pay Debt';
            $scope.showDialog($event);
        };
        
        $scope.save = function (item) {
            // TODO Back-end service
            console.log(item);
            $scope.items.push(item);
            $mdToast.show($mdToast.simple().content('Debt added'));
        };
        
        $scope.showNotification = function () {
            $mdToast.show($mdToast.simple().content('Pay Debt, Stupid!'));
        };
        
        $scope.showDialog = function ($event) {
            var parentEl = angular.element(document.body);
            
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'partials/settlementDialog.html',
                locals: {
                    save: $scope.save
                },
                escapeToClose: true,
                disableParentScroll: true,
                controller: DialogController
            });

        function DialogController($scope, $mdDialog, save) {
            function closeDialog() {
                $mdDialog.hide();
            }
            
            $scope.submit = function () {
                if (!$scope.settlement.user) {
                    return;
                }
                
                $scope.settlement.name = $scope.settlement.user.name;

                closeDialog();
                save($scope.settlement);
            };
            
            $scope.users = [
                {name: 'Paweł'}, {name: 'Tomasz'}, {name: 'Kacpusz'}, {name: 'Turban'}, { name: 'Piotr' }, {name: 'Gaca'}
            ];
            
            $scope.getMatches = function (searchText) {
                var matches = [];
                
                $scope.users.forEach(function(item) {
                    if (item.name.toLowerCase().indexOf(searchText) > -1) {
                        matches.push(item);
                    }
                });
                
                return matches;
            };
            
            $scope.settlement = {
                id: 1,
                name: '',
                user: null,
                value: '',
                imageSrc: '',
                changeDate: new Date()
            };
        }
      };
    }]);
}(angular, hajsApp));