main_module.controller('editController',function($scope,friendDataFactory,$location,Flash){
    
    var selectedFriend = friendDataFactory.getSelectedFriend();
    
    console.log("here: " + selectedFriend.name);
    
    $scope.id = selectedFriend._id;
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