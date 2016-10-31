var app = angular.module("TreeApp");

app.controller("TileEditorCtrl", ["$scope", "ResourceService", "$location", "TopicService", function ($scope, ResourceService, $location, TopicService) {

    $scope.ResourceService = ResourceService;
    $scope.goToResourcePage = function(resource) {
        ResourceService.currentResource = resource;
        $location.path("/resource-page/" + resource._id);
    }
    // function decides whether to return the star or yellowStar
    $scope.determineStar = ResourceService.determineStar;
    
    console.log("hello");
    TopicService.getAllTopics().then(function(response) {
        $scope.allTopics = response.data; 
    });
    
}])
    .directive("tileEditor", function () {
        return {
            restrict: 'AE',
            templateUrl: "components/tile/tile-editor.html",
            replace: true,
            controller: "TileEditorCtrl"
        }
    })