main_module.controller('friendDataController', function ($scope, friendDataFactory, loginFactory, $location) {
    
    $scope.user = loginFactory.username;
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.rowClicked = function(id){
 
        friendDataFactory.selected_id = id;
        $location.path('/edit').replace();
    }
    
    function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
        $scope.user = loginFactory.username;
    }
    
    $scope.search = function(){
        console.log('search pressed');
        friendDataFactory.search($scope.search_term).then(function(data){
            //console.log(data);
            $scope.friendData = data;
            
        });
    }
});