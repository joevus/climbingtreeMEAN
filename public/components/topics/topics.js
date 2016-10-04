var app = angular.module("TreeApp");

app.controller("TopicsController", ["$scope", "TopicService", "DrawingService", "$location", function($scope, TopicService, DrawingService, $location){
    
    var canvasContainer = document.getElementsByClassName("canvasContainer")[0];
    
    $scope.canvasWidth = canvasContainer.getBoundingClientRect().width;
    
    $scope.TopicService = TopicService;
    
    // update topicList based on topic parent name
    TopicService.beginTopics();
    
}])

.directive('buttonDirective', ["DrawingService", function(DrawingService) {
    return function(scope, element, attrs) {
        console.log(element);
        var mainTopic = document.getElementsByClassName("main-topic");
        var mainTopicHeight = mainTopic[0].getBoundingClientRect().height;
        var buttonTop = element[0].getBoundingClientRect().top - mainTopicHeight;
        var buttonHeight = element[0].getBoundingClientRect().height;
        var canvas = document.getElementById("topicCanvas");
        
        if (scope.$index % 2 === 0) {
                var x1 = canvas.width * .04;
                var x2 = canvas.width * .04;
                var x3 = canvas.width * .10;
        } else {
            var x1 = canvas.width * .49;
            var x2 = canvas.width * .49;
            var x3 = canvas.width * .55;
        }

        if (scope.$index <= 1) {
            var y1 = 0;
        } else {
            var y1 = DrawingService.y2List[scope.$index - 2];
        }
        
        var y2 = buttonTop + .5 * buttonHeight;
        var y3 = buttonTop + .5 * buttonHeight;
        DrawingService.y2List.push(y2);
        
        console.log(buttonTop);
        console.log("inside directive, x1: " + x1);
        console.log("inside directive, y1: " + y1);
        console.log("inside directive, x2: " + x2);
        console.log("inside directive, y2: " + y2);
        
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();
    }
}]);