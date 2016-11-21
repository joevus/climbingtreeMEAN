var app = angular.module("TreeApp.Admin", ['ngFileUpload']);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/post-resource", {
            templateUrl: "components/admin/post-resource/post-resource.html",
            controller: "PostResourceCtrl"
        })
        .when("/manage-topics", {
            templateUrl: "components/admin/manage-topics/manage-topics.html",
            controller: "ManageTopicsCtrl"
        })
        .when("/manage-resources", {
            templateUrl: "components/admin/manage-resources/manage-resources.html",
            controller: "ManageResourcesCtrl"
        })
}]);