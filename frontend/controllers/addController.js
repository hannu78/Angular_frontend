main_module.controller("addController", function ($scope,$location,friendDataFactory,Flash) {
   $scope.savePerson = function(){
        $('#save').attr("disabled", true);
       
       $scope.navbarData = {
           urls:['/logout','#/delete','#/insert','#/location','http://www.kaleva.fi'],
		   texts:['Logout','Delete','Insert','Your Location','News']
       };
        var temp = {
            
            name: $scope.name,
            address: $scope.address,
            age: $scope.age,
            email: $scope.email
        };
        
        friendDataFactory.insertData(temp).then(function(data){
            if( temp.name ) {
                friendDataFactory.friendsArray.push(data.data);
                Flash.create('success', 'New friend added succesfully!', 'custom-class');
                $scope.name = "";
                $scope.address = "";
                $scope.age = "";
                $scope.email = "";
                $('#save').attr("disabled", false);
            } else {
                Flash.create('danger', 'Cannot add people without name, quitting.', 'custom-class');
                $('#save').attr("disabled", false);
            }
        },function(error){
            $('#save').attr("disabled", false);
            Flash.create('warning', 'Failed to add friend!', 'custom-class');
        });
    }
    $scope.go = function ( path ) {
        $location.path(path).replace();
    };
});