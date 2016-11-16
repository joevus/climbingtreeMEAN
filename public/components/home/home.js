var app = angular.module("TreeApp");

app.controller("HomeController", ["$scope", "HomeService", "TopicService", "$location", function ($scope, HomeService, TopicService, $location) {
    // makes resources show for STEM
    TopicService.setSTEMTopic();
    
    // store canvas width to use in topics.html
    var canvasContainer = document.getElementsByClassName("canvasContainer")[0];
    $scope.canvasWidth = canvasContainer.getBoundingClientRect().width;
    
    // make TopicService available on scope
    $scope.TopicService = TopicService;
    
    $scope.displayTopics = function (topic) {
        $location.path("/topics/" + topic._id); 
    }
                                  
}]);