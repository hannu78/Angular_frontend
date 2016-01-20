$(document).ready(function () {
	
	console.log('This is ready');
    
    $('#getBtn').click(function() {
        var myaddress = $('#address').val();
        console.log(myaddress);
        var geocoder = new google.maps.Geocoder();
        
        geoCodeRequest = {
            address: myaddress
        }
        geocoder.geocode(geoCodeRequest, function (response, status) {
           if(status === google.maps.GeocoderStatus.OK) {
               console.log(response);
               //This needs fixing as if there are more than one matches, the first in list is always used
               var data = response[0];
               var lat = data.geometry.location.lat();
               var lng = data.geometry.location.lng();
               var latlng = new google.maps.LatLng(lat, lng);
               
               var mapProp = {
                   center: latlng,
                   zoom: 15,
                   mapTypeId: google.maps.MapTypeId.ROADMAP,
               };
               var map = new google.maps.Map(my_map, mapProp);
               var marker = new google.maps.Marker({
		           position: latlng, 
		           map: map, 
		           title:myaddress
                  })
               
           } else {
               alert(status);
           }
        });
    });
   
	navigator.geolocation.getCurrentPosition(success, error);
	
	function success(position){
	  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	  var mapProp = {
		center:latlng,
		zoom:15,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	  var map=new google.maps.Map(document.getElementById("my_map"),mapProp);
		
      var marker = new google.maps.Marker({
		  position: latlng, 
		  map: map, 
		  title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
  })
		
	}
	
	function error(){
		
		console.log("Geolocation not supported by browser");
	}
	
});