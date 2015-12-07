// Here we create our main module. First argument is the name of this module, the second one, 
// the array, contains the dependencies to other angular modules
var main_module = angular.module('main_module',['ngRoute', 'ngResource']);

// Create basic configuration for angular app.
// Configuration usually includes a router for views.
main_module.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partial_login.html',
        controller: 'controllerLogin'
    }).when('/list', {
        templateUrl: 'partialDataView.html'
    });
});
