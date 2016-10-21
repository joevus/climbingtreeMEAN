var app = angular.module("TreeApp");

app.controller("ResourcePageCtrl", ["$scope", "ResourceService", "TopicService", function($scope, ResourceService, TopicService) {
    ResourceService.setCurrentResource().then(function(response) {
        $scope.resource = response;
        
        // check if current topic is set, if not set it
        $scope.currentTopic = TopicService.currentTopic || TopicService.setCurrentTopic($scope.resource.topic);
        
        // get comments
        ResourceService.getComments($scope.resource);
    });
    
    // Comments \\
    
    // enables comments to show in ng-repeat
    $scope.ResourceService = ResourceService;
    
    // for submission success message
    $scope.recentComment = false;
    $scope.resetRecentComment = function() {
        recentComment = false;
    }
    
    // post comment
    $scope.postComment = function(comment) {
        ResourceService.postComment(comment).then(function(response) {
            // clear form
            $scope.newComment = {};
            $scope.recentComment = true;
            $timeout($scope.resetRecentComment, 5000);
        });
    };
    
    $scope.TopicService = TopicService;
    
    $scope.backLink = "#/topics/" + $scope.currentTopic;
    
    // enable rating
    $scope.rate = function(rating) {
        ResourceService.rate(rating);
    };
    
    // SHOWING STARS
    // for user
    $scope.userStarImg = ResourceService.userStarImg;
    
    // for resource overall
    $scope.determineStar = ResourceService.determineStar;
}]);