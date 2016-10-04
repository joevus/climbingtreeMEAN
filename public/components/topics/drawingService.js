// For drawing lines to connect the topics like a pedigree
var app = angular.module("TreeApp");

app.service("DrawingService", [function () {
    
    this.y2List = [];
    
    this.clearCanvas = function() {
        console.log("in clear canvas");
        var canvas = document.getElementById("topicCanvas");
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }
    
    this.drawLines = function () {

//        var ctx = canvas.getContext('2d');
//        ctx.beginPath();
//        ctx.moveTo(x1[i], y1[i]);
//        ctx.lineTo(x2[i], y2[i]);
//        ctx.lineTo(x3[i], y3[i]);
//        ctx.stroke();


        /*
    
        - determine left and right positions for all lines
            - width of canvas
            - use percentages, multiply total width
        - determine vertical starting point for buttons 1 and 2
            - top = 0
        - vertical ending point for all buttons
            - y position of button
            - height of button
            - y position + 1/2 * height
        - vertical starting point for buttons 3 and beyond
            - y position of nth - 2 button
            - height of nth - 2 button
            - y position + 1/2 * height 
            
        */

        // use positions to draw lines on canvas
    }


}]);