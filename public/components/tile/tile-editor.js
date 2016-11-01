var app = angular.module("TreeApp");

app.controller("TileEditorCtrl", ["$scope", "ResourceService", "$location", "$window", "TopicService", function ($scope, ResourceService, $location, $window, TopicService) {

    $scope.ResourceService = ResourceService;
    $scope.goToResourcePage = function(resource) {
        ResourceService.currentResource = resource;
        $location.path("/resource-page/" + resource._id);
    }
    // function decides whether to return the star or yellowStar
    $scope.determineStar = ResourceService.determineStar;
    
    $scope.goToSite = function($event, resource) {
        $event.preventDefault();
        $event.stopPropagation();
        $window.open(resource.url, '_blank');
    };
    
    TopicService.getAllTopics().then(function(response) {
        $scope.allTopics = response.data; 
    });
    
    // when click on trash icon
    $scope.deleteResource = function(resource) {
        var confirm = $window.confirm("Are you sure you want to delete this resource?");
        if(confirm) {
            ResourceService.deleteResource(resource).then(function(response) {
                // update resource list, to show resource deleted.
                ResourceService.getAll().then(function(response) {
                    ResourceService.resourceList = response.data;
                });
            });
        }
    };
    
    // update resource!
    $scope.updateResource = function(resource) {
        var confirm = $window.confirm("Are you sure you want to update this resource?");
        if(confirm) {
            resource.editing = false;
            ResourceService.updateResource(resource).then(function(response) {
                // update resource list, to show resource updated.
                Resource.getAll().then(function(response) {
                    ResourceService.resourceList = response.data;
                });
            });
        }
    };
    
}])
    .directive("tileEditor", function () {
        return {
            restrict: 'AE',
            templateUrl: "components/tile/tile-editor.html",
            replace: true,
            controller: "TileEditorCtrl"
        }
    })