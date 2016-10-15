var app = angular.module("TreeApp");

app.controller("TileCtrl", ["$scope", "ResourceService", "$location", function ($scope, ResourceService, $location) {

    $scope.ResourceService = ResourceService;
    $scope.goToResourcePage = function(resource) {
        ResourceService.currentResource = resource;
        $location.path("/resource-page/" + resource._id);
    }
    // function decides whether to return the star or yellowStar
    $scope.determineStar = ResourceService.determineStar;
}])
    .directive("tile", function () {
        return {
            restrict: 'AE',
            templateUrl: "components/tile/tile.html",
            replace: true,
            controller: "TileCtrl"
        }
    })