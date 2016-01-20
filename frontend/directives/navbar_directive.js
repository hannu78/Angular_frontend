main_module.directive('navbarDirective',function(){
    var directive = {};
    
    directive.templateUrl = "/frontend/directives/navbar.html";
    directive.scope = {
        navbarData: '=',
    };
    
    directive.link = function(scope,elem,attrs){
		
	  /* $('a').first.addClass('active');
	   $('a').click(function(){
		  console.log('Link clicked');
		  if(!this.hasClass('active'))
                this.addClass('active');
	   });*/
	}
	
    
    return directive;
});