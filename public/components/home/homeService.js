var app = angular.module("TreeApp");

//** Service Currently not in use **\\

app.service("HomeService", ["$http", function($http){
    var self = this;
    this.topicList = [];
    
    this.getTopics = function(parentName) {
        $http.get("/api/topics/" + parentName).then(function(response) {
            self.topicList.push(response.data);
        });
    };
    
}]);