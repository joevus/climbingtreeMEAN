var app = angular.module("TreeApp");

app.controller("TileCtrl", ["$scope", "ResourceService", function ($scope, ResourceService) {

    $scope.ResourceService = ResourceService;

}])
    .directive("tile", function () {
        return {
            restrict: 'AE',
            templateUrl: "components/tile/tile.html",
            replace: true,
            controller: "TileCtrl"
        }
    })