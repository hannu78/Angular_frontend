main_module.factory('loginFactory', function ($resource) {
    var factory = {};
    
    // This function can be called from any controller using this factory
    factory.startLogin = function (data) {
        // Create a resource for context /friends/login
        var req = $resource('/friends/login', {}, {'post':{method:'POST'}});
        // Use POST method to send the username and password to above context
        // Note that we return a promise object (asynchronous programming)
        return req.post(data).$promise;
    }
    factory.startRegister = function(data) {
        var register = $resource('/friends/register', {}, {'post':{method: 'POST'}});
        return register.post(data).$promise;
    }
    
    //factory must always return an object!!
    return factory;
});