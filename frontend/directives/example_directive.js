//Create new directive with name ofExample
main_module.directive('ofExample',function(){

    //Create empty object. We will fill it with needed
    //information below.
    var directive = {};
    //First define how our directive can be used using the stric attribute
    //possible values are: 
    //'A' as attribute
    //'C' as class
    //'E' as element
    //'M' as comment
    //or combination of pervious values like 'AE' 
    directive.restrict = 'AEC';
    
    //Create isolated scope for our directive
    //From this point onwards, our directive CANNO use parent scope anymore
    directive.scope = {
        //Text binding
        name: '@myname',
        //Two-way binding
        users: '=',
        friends: '='
    }
    //Normally only the link fucntion is just overridden in the directive and
    //there's no need to define custom compile for it
    directive.link = function(scope, elem, attrs) {
        $(elem).click(function() {
           console.log('directive clicked'); 
           //scope.getWeather();
        });
    }
    /*
    //Also a custom controller can be defined for a directive
    directive.controller = function ($scope, $http) {
        console.log('directive controller activated');
        $scope.getWeather = function() {
            $http.get('api.openweathermap.org/data/2.5/weather?q=Oulu,fi').then(function (data) {
                console.log(data);
            });
        }
    }
    */
    /*
    //Compile function is called before the directive
    directive.compile = function (elem, attrs) {
        //Use jQuery to set background-color for the directive element
        $(elem).css('background-color', 'lightgrey');
        //Compile must always return a link function
        return function link (scope, elem, attrs) {
            console.log(scope.name);
            console.log(scope.users);
        }
    }
    */
    //Define the template code
    directive.templateUrl = "/FrontEnd/directives/content.html";
    //We must always return an object from directive!
    return directive;
    
    /* Another way o declare and return a directive object
    return {
        restrict: AEC,
        templateURL:
    }
    */
});