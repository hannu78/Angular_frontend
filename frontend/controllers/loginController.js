
// This is the way to define controllers
// main_module is defined in mainModule.js
// First argument is the name of the controller. This is important as this
// is used when the controller is used in a view
// $scope object is the glue between the view and the controller
main_module.controller('controllerLogin', function ($scope, loginFactory) {
    //var user = $scope.user;
    //$scope.pass = "halituli";
    
    //loginClicked gets called when login button is pressed in partial_login
    $scope.loginClicked = function () {
        console.log("login pressed");
        var temp = {
            username: $scope.user,
            password: $scope.pass
        };
        loginFactory.startLogin(temp);
    }
    
    //registerClicked gets called when login button is pressed in partial_login
    $scope.registerClicked = function () {
        console.log("register pressed");
    }
});

