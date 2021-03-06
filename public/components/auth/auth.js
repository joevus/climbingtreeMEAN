var app = angular.module("TreeApp.Auth", []);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/signup", {
            templateUrl: "components/auth/signup/signup.html",
            controller: "SignupController"
        })
        .when("/login", {
            templateUrl: "components/auth/login/login.html",
            controller: "LoginController"
        })
        .when("/logout", {
            controller: "LogoutController",
            template: ""
        })
}]);

app.service("TokenService", [function() {
    var userToken = "token";
    var self = this;
    
    this.setToken = function(token) {
        localStorage[userToken] = token;
    };
    
    this.getToken = function(){
        return localStorage[userToken];
    };
    
    this.removeToken = function() {
        localStorage.removeItem(userToken);
    };
    
    this.setAdmin = function() {
        localStorage["admin"] = "on";
    };
    
    this.getAdmin = function(){
        return localStorage["admin"];
    };
    
    this.removeAdmin = function() {
        localStorage.removeItem("admin");
    };
    
    // For Image uploads
    
    this.setImgUploadPreset = function(preset) {
        localStorage["uploadpreset"] = preset;  
    };
    
    this.getImgUploadPreset = function() {
        return localStorage["uploadpreset"];  
    };
    
    this.removeImgUploadPreset = function() {
        localStorage.removeItem("uploadpreset");  
    };
    
}]);

app.service("UserObjService", [function() {
    // storing and getting user object to local storage
    var userObj = "user";
    
    this.setUser = function(obj) {
        localStorage[userObj] = obj;
    };
    
    this.getUser = function() {
        return localStorage[userObj];
    };
    
    this.removeUser = function() {
        localStorage.removeItem(userObj);
    };
}]);

app.service("UserService", ["$http", "$location", "TokenService", "UserObjService", function($http, $location, TokenService, UserObjService) {
    // signing up, logging in and out
    
    this.signup = function(user) {
        return $http.post("/auth/signup", user);
    };
    
    this.login = function(user) {
        return $http.post("/auth/login", user).then(function(response) {
            TokenService.setToken(response.data.token);
            UserObjService.setUser(response.data.user._id);
            if(response.data.user.admin) {
                TokenService.setAdmin();
                TokenService.setImgUploadPreset(response.data.user.upload_preset);
            } 
            return response;
        });
    };
    
    this.logout = function () {
        TokenService.removeToken();
        UserObjService.removeUser();
        TokenService.removeAdmin();
        TokenService.removeImgUploadPreset();
        $location.path("/");
    };
    
    this.isAuthenticated = function() {
        return !!TokenService.getToken();
    };
    
    this.isAdmin = function() {
        return !!TokenService.getAdmin();
    };
    
}]);

app.factory("AuthInterceptor", ["$q", "$location", "TokenService", function($q, $location, TokenService) {
    return {
        request: function (config) {
            var token = TokenService.getToken();
            // add Authorization header if there is a token AND if not sending request to cloudinary--to upload image
            if(token && !/https:\/\/api.cloudinary.com/.test(config.url)) {
                config.headers = config.headers || {};
                config.headers.Authorization = "Bearer " + token;
            }
            return config;
        },
        responseError: function(response) {
            if (response.status === 401) {
                TokenService.removeToken();
                $location.path("/login");
            }
            return $q.reject(response);
        }
    }
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});