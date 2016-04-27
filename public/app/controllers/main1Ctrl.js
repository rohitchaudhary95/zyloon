var maincnt = angular.module('main1Ctrl', ['detailService','d3'])


maincnt.controller('Main1Controller', function(d3 ,Detail,$window,$location, $http, $scope){

	$scope.expense_cat1=[], $scope.types1=[], $scope.amount1=[];
	var vm = this;
	Detail.showDetail()
	.success(function(data){
		$scope.data=data;
		$scope.showData(data);
	})

	$scope.addDetail = function() {
		Detail.addDetail({date:$scope.date, expense_cat:$scope.expense_cat, types:$scope.types, amount:$scope.amount})
		.success(function(data){
			vm.detail = data;
			console.log(data.message);
			$scope.data = data;
			$window.alert(data.message);
			Detail.showDetail()
			.success(function(data){
				$scope.data=data;
				$scope.showData(data);
			})
			//$window.location.reload();

			
						
		})
	}

	$scope.isEdit = [];
	$scope.amount =[];
	$scope.showDetail = function(){
		Detail.showDetail()
		.success(function(data){
			console.log(data);
			$scope.data = data;
			$scope.isEdit.push(false);
			$scope.amount.push(data.amount);
		})
	}

	$scope.showData = function(abc)
	{
		console.log(abc);
		var amts = [];
		var count1=0, count2=0;
		abc.forEach(function(obj) {
			amts.push(obj.amount);
			console.log(obj.types);
			if(obj.types=='Cash'){
				count1++;
			}
			else if(obj.types=='Credit'){
				count2++;
			}
		});
		console.log(count1);
		console.log(count2);

		var x = d3.scale.linear()
    		.domain([0, d3.max(amts)])
    		.range([0, 300]);

		d3.select(".chart")
  		.selectAll("div")
    		.data(amts)
  			.enter().append("div")
    		.style("width", function(d) { return x(d) + "px"; })
    		.text(function(d) { return d; });

    	var w = 300;
		var h = 300;
		var r = h/2;
		var color = d3.scale.category20c();

		var data1 = [{"label":"Cash", "value":count1}, 
		          {"label":"Credit", "value":count2}];

		var vis = d3.select('#chart1').append("svg:svg").data([data1]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
		var pie = d3.layout.pie().value(function(d){return d.value;});

		var arc = d3.svg.arc().outerRadius(r);
		
		var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
		arcs.append("svg:path")
    		.attr("fill", function(d, i){
        	return color(i);
    	})
    	.attr("d", function (d) {
        	console.log(arc(d));
        	return arc(d);
    	});

		arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
    		return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    		return data1[i].label;}
    	)
}

	

	$scope.updateDet = function(index){
		console.log($scope.data[index]._id);
		console.log($scope.amount1[index]);
		console.log($scope.types1[index]);
		Detail.updateDet({_id:$scope.data[index]._id,expense_cat:$scope.expense_cat1[index], types:$scope.types1[index], amount:$scope.amount1[index]})
		.success(function(data){
			console.log(data);
			$window.alert(data.message);
			$window.location.reload();
		}); 
	}
	
});





