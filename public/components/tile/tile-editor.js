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
        ResourceService.deleteResource(resource);
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