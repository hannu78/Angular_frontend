main_module.factory('friendDataFactory', function ($resource,$http) {
    
    // Friend information is cached to array
    
    var factory = {};
    factory.selected_id = null;
    
    factory.friendsArray = [];
    
    factory.getFriendData = function(callbackFunc){
        if(factory.friendsArray.length === 0){
            //Set custom header in a request like this
            $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
              factory.friendsArray = data;
              callbackFunc(factory.friendsArray);    
                
            },function(error){
                
                factory.friendsArray = [];
                callbackFunc(factory.friendsArray);
            });
        }
        else{
            callbackFunc(factory.friendsArray);
        }
    }
    factory.getSelectedFriend = function(){
        
        for(var i = 0; i < factory.friendsArray.length; i++){
            
            if(factory.friendsArray[i]._id === factory.selected_id){
                
                return factory.friendsArray[i];
            }
        }
        
    }
    factory.updateData = function(data){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var resource = $resource('/persons',{},{'put':{method:'PUT'}});
        return resource.put(data).$promise;
    }
    
    factory.deleteData = function(data){
        $http.defaults.headers.common['content-type'] = 'application/json';
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var resource = $resource('/persons',{},{'delete':{method:'DELETE'}});
        return resource.delete(data).$promise;
    }
    
    factory.addData = function(data){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var resource = $resource('/persons',{},{'post':{method:'POST'}});
        return resource.post(data).$promise;
    }
    
    factory.search = function(term){
        
        var resource = $resource('/persons/search/',{name:term},{'get':{method:'GET'}});
        return resource.query().$promise;
    }
    
    return factory;
});