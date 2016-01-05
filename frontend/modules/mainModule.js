// Here we create our main module. First argument is the name of this module, the second one, 
// the array, contains the dependencies to other angular modules
var main_module = angular.module('main_module', ['ngRoute', 'ngResource', 'flash']);

function loginRequired($q, $resource, $location, $http) {
    // Create a promise
    var deferred = $q.defer();
    $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
    $resource('/isLogged').query().$promise.then(function success(){
        //Mark the promise as resolved
        deferred.resolve();
        return deferred;
    }, function fail(){
        deferred.reject();
        //Go back to root context
        $location.path('/');
        //$location.path('/').replace();
        return deferred;
    });
}

//main_module.run(function($http) {
//    $http.defaults.headers.common['cache-control'] = 'private', 'no-store', 'must-revalidate';
//});

// Create basic configuration for angular app.
// Configuration usually includes a router for views.
main_module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partialLoginView.html',
        controller: 'controllerLogin'
    }).when('/list', {
        templateUrl: 'partialDataView.html',
        controller: 'friendDataController',
        resolve: {loginRequired: loginRequired}
    }).when('/add', {
        templateUrl: "partialAddView.html",
        controller: 'addController',
        resolve: {loginRequired: loginRequired}
    }).when('/edit', {
        templateUrl: "partialEditView.html",
        controller: "editController",
        resolve: {loginRequired: loginRequired}
    }).when('/delete', {
        templateUrl: "partialDeleteView.html",
        controller: "deleteController",
        resolve: {loginRequired: loginRequired}
    });
});
