var app = angular.module("TreeApp", ["ngRoute", "TreeApp.Auth", "TreeApp.Admin"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html",
            controller: "HomeController"
        })
        .when("/topics/:topicId", {
            templateUrl: "components/topics/topics.html",
            controller: "TopicsController"
        })
        .when("/resource-page/:resourceId", {
            templateUrl: "components/resources/resource-page.html",
            controller: "ResourcePageCtrl"
        })
        .when("/submit-resource", {
            templateUrl: "components/submit-resource/submit-resource.html",
            controller: "SubmitResourceCtrl"
        })
        .when("/about", {
            templateUrl: "components/about/about.html",
            controller: "AboutController"
        })
        .when("/admin", {
            templateUrl: "components/admin/admin.html",
            controller: "AdminController"
        })
}]);