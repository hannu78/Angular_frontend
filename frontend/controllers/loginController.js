
// This is the way to define controllers
// main_module is defined in mainModule.js
// First argument is the name of the controller. This is important as this
// is used when the controller is used in a view
// $scope object is the glue between the view and the controller
main_module.controller('controllerLogin', function ($scope, loginFactory, $location) {
    
    //loginClicked gets called when login button is pressed in partial_login
    $scope.loginClicked = function () {
        console.log("login pressed");
        var temp = {
            username: $scope.user,
            password: $scope.pass
        };
        var waitPromise = loginFactory.startLogin(temp);
        // Wait the response before continuing
        waitPromise.then (function (data) {
           // Code inside this block will be called when success response from server 
           // is received
            console.log("Success!");
            // location.path does not work for me, so location.path('/list').replace() is needed here
            // See http://stackoverflow.com/questions/11784656/angularjs-location-not-changing-the-path
            $location.path('/list').replace();
        }, function(data) {
            console.log ("Fail!");
            $('.error').text('Wrong username or password.');             
        });
    }
    
    //registerClicked gets called when login button is pressed in partial_login
    $scope.registerClicked = function () {
        console.log("register pressed");
        var info = {
            username: $scope.user,
            password: $scope.pass
        };
        var result = loginFactory.startRegister(info);
        result.then (function (data) {
            console.log("Registration succesful!");
            alert( "Registration succesful!" );
            $location.path('/list').replace();
        }, function(data) {
            console.log("Registration failed.");
            $('.error').text('Registration unsuccesful, please try again.');
        });
    }
});

