main_module.factory('loginFactory', function (){
    var factory = {};
    
    // This function can be called from any controller using this factory
    factory.startLogin = function (data) {
        console.log(data);
    }
    //factory must always return an object!!
    return factory;
});