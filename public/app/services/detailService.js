var detailservice = angular.module('detailService', [])

detailservice.factory('Detail', function($http){
	var detailFactory = {};

	detailFactory.addDetail = function(detData){
		return $http.post('/api/save', detData);
	}

	detailFactory.showDetail = function(){
		return $http.get('/api/show');
		
	}

	detailFactory.updateDet = function(upData){
		return $http.post('/api/updateDet', upData);
		
	}
	return detailFactory;
});