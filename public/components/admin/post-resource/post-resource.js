var app = angular.module("TreeApp");

app.controller("PostResourceCtrl", ["$scope", "SubmitService", "TopicService", "ResourceService", "Upload", "$timeout", function ($scope, SubmitService, TopicService, ResourceService, Upload, $timeout) {
    SubmitService.getRecommendations().then(function (response) {
        $scope.recommendations = response.data;
    });

    // start Topic Type out with existing checked
    $scope.topicType = "existing";

    // get all topics
    TopicService.getAllTopics().then(function (response) {
        $scope.allTopics = response.data;
    });

    // ng-model for resourceTopic wasn't working until I included this
    $scope.resourceTopic = {};

    // new topic
    $scope.newTopic = {};

    $scope.postResource = function (resource, existingTopic, newTopic, topicType) {
        // using existing topic
        if (topicType === 'existing') {
            resource.topic = existingTopic._id;
            ResourceService.postResource(resource).then(function (response) {
                console.log(response.data);
            });
            // using new topic
        } else if (topicType === 'new') {
            // post topic first
            TopicService.postTopic(newTopic).then(function (response) {
                var newTopicId = response.data._id;
                resource.topic = newTopicId;
                ResourceService.postResource(resource).then(function (response) {
                    console.log(response.data);
                });
            });

        }
    };

    // delete recommendation (with trash can icon)
    $scope.deleteRecommendation = function (rec) {
        SubmitService.deleteRecommendation(rec).then(function (response) {
            console.log(response.data);
            // refresh recommendations
            SubmitService.getRecommendations().then(function (response) {
                $scope.recommendations = response.data;
            });
        });
    };

    // uploading images
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var fdata = new FormData();
                fdata.append('file', $scope.file);
                fdata.append('upload_preset', "ihpn7nei");
                console.log(fdata);
                if (!file.$error) {
                    Upload.upload({
                        url: 'https://api.cloudinary.com/v1_1/climbing-tree/image/upload',
                        method: 'POST',
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        },
                        fields: {
                            file: file,
                            upload_preset: "ihpn7nei"
                        },
                    }).then(function (resp) {
                        $timeout(function () {
                            $scope.log = 'file: ' +
                                resp.config.fields.file.name +
                                ', Response: ' + JSON.stringify(resp.data) +
                                '\n' + $scope.log;
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                            '% ' + evt.config.fields.file.name + '\n' +
                            $scope.log;

                    });
                }
            }
        }
    };

}]);