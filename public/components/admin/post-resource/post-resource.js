var app = angular.module("TreeApp");

app.controller("PostResourceCtrl", ["$scope", "SubmitService", "TopicService", "ResourceService", function($scope, SubmitService, TopicService, ResourceService) {
    SubmitService.getRecommendations().then(function(response){
       $scope.recommendations = response.data; 
    });
    
    // start Topic Type out with existing checked
    $scope.topicType = "existing";
    
    // get all topics
    TopicService.getAllTopics().then(function(response) {
       $scope.allTopics = response.data; 
    });
    
    // ng-model for resourceTopic wasn't working until I included this
    $scope.resourceTopic = {};
    
    // new topic
    $scope.newTopic = {};
    
    $scope.postResource = function(resource, existingTopic, newTopic, topicType) {
        // using existing topic
        if (topicType === 'existing') {
            resource.topic = existingTopic._id;
            ResourceService.postResource(resource).then(function(response) {
               console.log(response.data);
            });
        // using new topic
        } else if(topicType === 'new') {
            // post topic first
            TopicService.postTopic(newTopic).then(function(response) {
                var newTopicId = response.data._id;
                resource.topic = newTopicId;
                ResourceService.postResource(resource).then(function(response) {
                    console.log(response.data);
                });
            });
            
        }
    };
    
    // delete recommendation (with trash can icon)
    $scope.deleteRecommendation = function(rec) {
        SubmitService.deleteRecommendation(rec).then(function(response) {
            console.log(response.data);
            // refresh recommendations
            SubmitService.getRecommendations().then(function(response){
               $scope.recommendations = response.data; 
            });
        });  
    };
    
}]);