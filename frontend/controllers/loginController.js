
// This is the way to define controllers
// main_module is defined in mainModule.js
// First argument is the name of the controller. This is important as this
// is used when the controller is used in a view
// $scope object is the glue between the view and the controller
main_module.controller('controllerLogin', function ($scope, loginFactory, $location, Flash) {
    
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
            //console.log(data.secret);
            loginFactory.username = $scope.user;
            //Store jsonwebtoken
            sessionStorage['token'] = data.secret;
            // location.path does not work for me, so location.path('/list').replace() is needed here
            // See http://stackoverflow.com/questions/11784656/angularjs-location-not-changing-the-path
            $location.path('/list').replace();
        }, function(data) {
            console.log ("Fail!");
            Flash.create('danger', 'Wrong user name or password given', 'custom-class'); 
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
            Flash.create('success', "Registration succesful!", 'custom-class');
            $location.path('/list').replace();
        }, function(data) {
            console.log("Registration failed.");
            Flash.create('danger', 'Registration failed, username already exists. Please use another username.', 'custom-class'); 
            $('.error').text('Registration unsuccesful, please try again.');
        });
    }
});

