var app = angular.module("TreeApp");

app.controller("ManageResourcesCtrl", ["$scope", "ResourceService", function($scope, ResourceService) {
    
    ResourceService.getAll().then(function(response) {
        ResourceService.resourceList = response.data; 
    });
}]);