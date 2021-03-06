// For Generating subtopics and drawing lines to connect the topics like a pedigree
var app = angular.module("TreeApp");

app.service("DrawingService", [function () {

        var self = this;
    
        this.y2List = [];
    
        this.clearY2List = function() {
            self.y2List = [];
        };

        this.clearCanvas = function () {
            self.clearY2List();
            var canvas = document.getElementById("topicCanvas");
            // if canvas is on page, then clear it.
            if (canvas) {
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        this.drawLines = function (x1, x2, x3, y1, y2, y3) {
            // draw lines between main topic and subtopics
            
            var canvas = document.getElementById("topicCanvas");
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.stroke();
        };


}])
    .directive('mySubtopic', ["DrawingService", "$window", function (DrawingService, $window) {
        return {
            template: '<button class="btn btn-lg btn-default subtopic" ng-click="displayTopics(topic)">{{topic.name}}</button>',
            link: function (scope, element, attrs) {
                scope.$watch('topic', function(newValue, oldValue) {
                    var val = newValue || null;
                    if (val) {
                        drawLines();
                    }
                });
                
                // re-draw lines when window size changes
                scope.width = $window.innerWidth;
                angular.element($window).bind('resize', function() {
                    if(scope.$index === 0) {
                        DrawingService.clearCanvas();
                        // Modify canvas width in html
                        var canvasContainer = document.getElementsByClassName("canvasContainer")[0];
                        var newWidth = canvasContainer.getBoundingClientRect().width;
                        var canvas = document.querySelectorAll("#topicCanvas");
                        angular.element(canvas).attr('width', newWidth);
                    }
                        
                    drawLines();
                    //scope.$digest();
                });

                function drawLines() {

                    /*
                    determine left and right positions for all lines
                        - width of canvas
                        - use percentages, multiply total width
                        - x3 is same as margin-left of .subtopic OR
                        - x3 is same as margin-left + .subtopic width + margin-left
                    */
                    var canvas = document.getElementById("topicCanvas");
                    if (scope.$index % 2 === 0) {
                        var x1 = canvas.width * .03;
                        var x2 = canvas.width * .03;
                        var x3 = canvas.width * .06;
                    } else {
                        var x1 = canvas.width * .50;
                        var x2 = canvas.width * .50;
                        var x3 = canvas.width * .53;
                    }


                    /*
                    - determine vertical starting point for buttons 1 and 2
                        - top = 0
                    - vertical ending point for all buttons
                        - (y position of button) + 1/2 * (height of button)
                    - vertical starting point for buttons 3 and beyond
                        - lowest vertical point for nth-2 button
                        - found with y2List[scope.$index-2]
                        
                    */

                    var mainTopic = document.getElementsByClassName("main-topic");
                    var mainTopicBottom = mainTopic[0].getBoundingClientRect().bottom;
                    var buttonTop = element[0].childNodes[0].getBoundingClientRect().top - mainTopicBottom;
                    var buttonHeight = element[0].childNodes[0].getBoundingClientRect().height;

                    if (scope.$index <= 1) {
                        var y1 = 0;
                    } else {
                        var y1 = DrawingService.y2List[scope.$index - 2];
                    }

                    var y2 = buttonTop + .5 * buttonHeight;
                    var y3 = buttonTop + .5 * buttonHeight;
                    DrawingService.y2List.push(y2);
                    
                    // use positions to draw lines on canvas
                    DrawingService.drawLines(x1, x2, x3, y1, y2, y3);
                }
            }


        }
}]);