main_module.controller('friendDataController', function ($scope, friendDataFactory, $location) {
    
    console.log('friendDataController loaded');
    $scope.name = "by Jussi Juonio";
    $scope.temp = ['Heikki Hela', 'Risto Mattila', 'Juha Sipilä', 'Teuvo Hakkarainen'];
    
    $scope.navbarData = {
           urls: ['/logout', '#/delete', '#/add', 'http://www.kaleva.fi' ],
           texts: ['Logout', 'Delete', 'Add', 'News']
       };
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.rowClicked = function (id) {
        
        friendDataFactory.selected_id = id;
        $location.path('/edit').replace();
    }
    
    function dataCallback(dataArray) {
        
        $scope.friendData = dataArray;
    }
    
    $scope.search = function () {
        console.log('search pressed');
        friendDataFactory.search($scope.search_term).then(function (data) {
            $scope.friendData = data;
            
        });
    }
});