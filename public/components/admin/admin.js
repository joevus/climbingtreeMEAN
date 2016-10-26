var app = angular.module("TreeApp.Admin", []);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/post-resource", {
            templateUrl: "components/admin/post-resource/post-resource.html",
            controller: "PostResourceCtrl"
        })
}]);