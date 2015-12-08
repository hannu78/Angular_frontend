main_module.factory('friendDataFactory', function ($resource) {
    var factory = {};
    // Friend information is cached to array
    factory.friendsArray = [];
    
    factory.getFriendData = function() {
 
        var response = $resource('/friends', {}, {'get':{method:'GET'}});
        // Wait for response from backend
        return response.query().$promise;
    }
    return factory;
});