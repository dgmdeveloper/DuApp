app.factory('SecurityFactory', function($window,localStorageService){
	return {
		ComprobeDataToken : function(){
			var url = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
			if(localStorageService.get("access_data"))
			{
				var datos = localStorageService.get("access_data");	
				

				if(datos.access_token == '')
				{
					$window.location.href = 'login.html';
				}
				else if(url == 'login.html')
				{
					$window.location.href = 'index.html';
				}
			}else
			{
				if(url != 'login.html'){$window.location.href = 'login.html';}
			}		
			
		},

		decodeJson : function(data){
			var temp = [];
		    temp = angular.fromJson(data); 
		    return temp[0];
		}

	}
});