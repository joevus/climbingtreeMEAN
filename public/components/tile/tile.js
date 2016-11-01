var app = angular.module("TreeApp");

app.controller("TileCtrl", ["$scope", "ResourceService", "$location", "$window", function ($scope, ResourceService, $location, $window) {

    $scope.ResourceService = ResourceService;
    $scope.goToResourcePage = function(resource) {
        ResourceService.currentResource = resource;
        $location.path("/resource-page/" + resource._id);
    }
    // function decides whether to return the star or yellowStar
    $scope.determineStar = ResourceService.determineStar;
    
    // navigate to site when click on globe icon
    $scope.goToSite = function($event, resource) {
        $event.preventDefault();
        $event.stopPropagation();
        $window.open(resource.url, '_blank');
    };
    
}])
    .directive("tile", function () {
        return {
            restrict: 'AE',
            templateUrl: "components/tile/tile.html",
            replace: true,
            controller: "TileCtrl"
        }
    })