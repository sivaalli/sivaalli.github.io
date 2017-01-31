

	var app = angular.module("newsapp",[]);

	//service to get news by calling NT Times REST API
	app.service("newsService",['$http','$log',function($http,$log){
		
		this.getNews = function(){
			return $http.get('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=7989608dd4ab48bc8718120bb5d565f7');
		};
	}]);


	app.directive('newsObject', [function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			 scope: {
			 	eachNews: "="
			 }, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			 template: '<a href="{{eachNews.url}}" class="list-group-item" target="_blank">'+
			 				"<p>{{eachNews.updated_date| date:'medium'}}</p>"+
	  	  					'<h4 class="list-group-item-heading">{{eachNews.title}}</h4>'+
	    					'<p class="list-group-item-text">{{eachNews.abstract}}</p>'+
	 				    '</a>',
			// templateUrl: '',
			 replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			/*link: function($scope, iElm, iAttrs, controller) {
				
			}*/
		};
	}]);

	app.controller('NewsCtrl',['$scope','$log','$interval','newsService',function($scope,$log,$interval,newsService){
		var self = this;
		this.search={
			$:'',
			section:''
		};
		this.newsList=[];
		this.sectionList=[];
		this.updateNews = function(){
			console.log("news updated");
			newsService.getNews().then(function(response){
			self.newsList = response.data.results;

			//load news sections to sectionList array
			var i;
			for(i=0;i<response.data.results.length;i++){
				var currentSection = response.data.results[i].section;
				if(self.sectionList.indexOf(currentSection)==-1){
					self.sectionList.push(currentSection);
				}	
			}
			self.sectionList = self.sectionList.sort();
			//console.log(self.sectionList);
			//console.log(response.data.results);
		});
		};
		//uncomment this to call API every 5 mins
		/*$interval(function(){
			$log.log("called api again");
			newsService.getNews().then(function(response){
			console.log(response);
			currentRef.newsList = response.data.results;
		});
		}, 3000);*/
	}]);

	app.controller('MainCtrl', ['$scope', function($scope){
		this.page=1;
	}]);
