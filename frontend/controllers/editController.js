main_module.controller('editController',function($scope,friendDataFactory,$location,Flash){
    
    var selectedFriend = friendDataFactory.getSelectedFriend();
    
    console.log("here: " + selectedFriend.id + " & " +selectedFriend.name);
    
    $scope.navbarData = {
           urls:['/logout','#/delete','#/insert','#/location','http://www.kaleva.fi'],
		   texts:['Logout','Delete','Insert','Your Location','News']
    };
    
    $scope.id = selectedFriend.id;
    $scope.name = selectedFriend.name;
    $scope.address = selectedFriend.address;
    $scope.age = selectedFriend.age;
    $scope.email = selectedFriend.email;
    
    $scope.savePerson = function(){
        
        var temp = {
            
            id:$scope.id,
            name:$scope.name,
            address:$scope.address,
            age:$scope.age,
            email:$scope.email
        }
        
        friendDataFactory.updateData(temp).then(success,error);
    }
    
    function success(){
        friendDataFactory.friendsArray = [];
        $location.path('/list').replace();
    }
    
    function error(data){
        Flash.create('danger',data.message, 'custom-class'); 
    }
});