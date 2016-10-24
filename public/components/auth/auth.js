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
    
    this.setToken = function(token) {
        localStorage[userToken] = token;
    };
    
    this.getToken = function(){
        return localStorage[userToken];
    };
    
    this.removeToken = function() {
        localStorage.removeItem(userToken);
    };
}]);

app.service("UserObjService", [function() {
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
    
    this.signup = function(user) {
        return $http.post("http://localhost:8000/auth/signup", user);
    };
    
    this.login = function(user) {
        return $http.post("http://localhost:8000/auth/login", user).then(function(response) {
            TokenService.setToken(response.data.token);
            UserObjService.setUser(response.data.user);
            console.log(response.data.user);
            return response;
        });
    };
    
    this.logout = function () {
        TokenService.removeToken();
        UserObjService.removeUser();
        $location.path("/");
    };
    
    this.isAuthenticated = function() {
        return !!TokenService.getToken();
    };
}]);

app.factory("AuthInterceptor", ["$q", "$location", "TokenService", function($q, $location, TokenService) {
    return {
        request: function (config) {
            var token = TokenService.getToken();
            if(token) {
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