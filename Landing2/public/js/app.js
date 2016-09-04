var module = angular.module('landing2App', ['smoothScroll', 'ngRoute',  'ngCookies']);


module.controller('MainCtrl', function ($scope) {

	// ------------ MENU --------------
	$scope.menuOpen = false;

	$scope.toogleMenu = function () {
		$scope.menuStyle = $scope.menuOpen ? '' : 'collapse';
		$scope.menuOpen = !$scope.menuOpen;
	};

	$scope.toogleMenu();
	// --------------------------------

});


module.directive('onResize', ['$window', function($window) {
    return {
        link: function(scope, elem, attrs) {
            scope.onResize = function() {
                var headerHeight = document.querySelector('.header').offsetHeight;
                scope.scrollOffset = headerHeight;
            };

            scope.onResize();

            angular.element($window).bind('resize', function() {
                scope.onResize();
            });
        }
    };
}]);


module.controller('ServicesCtrl', function ($scope) {
	$scope.selectedItem = 1;

	$scope.serviceItems = [
		{
			title: 'Web Design',
			iconClass: 'icon_desktop'
		},
		{
			title: 'Graphic Design',
			iconClass: 'icon_pencil'
		},
		{
			title: 'Programming',
			iconClass: 'icon_gear'
		},
		{
			title: 'Photography',
			iconClass: 'icon_camera'
		}];

	$scope.select = function (id) {
		$scope.selectedItem = id;
	};
});


module.controller('PortfolioCtrl', function ($scope) {

	$scope.selectedCategory = 'all';

	$scope.categories = {
		all: 'portfolio-category_selected',
		web: '',
		photography: '',
		graphic: ''
	}

	$scope.showMatch = function (type, event) {

		console.log(event);

        event.preventDefault();

        if (type == $scope.selectedCategory) return;

        $scope.selectedCategory = type;

        for (var prop in $scope.categories) {
        	$scope.categories[prop] = '';
        }

        $scope.categories[type] = 'portfolio-category_selected';
    };

    $scope.itemFilter = function (item) {
        if ($scope.selectedCategory == 'all') return item;

        if (item.category == $scope.selectedCategory) return item;
    };

	$scope.portfolioItems = [
		{
			title: 'Sample Image',
			type: 'Web Design',
			image: 'img/port-1.jpg',
			alt: 'Image 1',
			link: '#',
			category: 'web'
		},
		{
			title: 'Sample Image',
			type: 'Photography',
			image: 'img/port-2.jpg',
			alt: 'Image 2',
			link: '#',
			category: 'photography'
		},
		{
			title: 'Sample Image',
			type: 'Graphic Design',
			image: 'img/port-3.jpg',
			alt: 'Image 3',
			link: '#',
			category: 'graphic'
		},
		{
			title: 'Sample Image',
			type: 'Web Design',
			image: 'img/port-4.jpg',
			alt: 'Image 4',
			link: '#',
			category: 'web'
		},
		{
			title: 'Sample Image',
			type: 'Photography',
			image: 'img/port-5.jpg',
			alt: 'Image 5',
			link: '#',
			category: 'photography'
		},
		{
			title: 'Sample Image',
			type: 'Graphic Design',
			image: 'img/port-6.jpg',
			alt: 'Image 6',
			link: '#',
			category: 'graphic'
		},
		{
			title: 'Sample Image',
			type: 'Web Design',
			image: 'img/port-7.jpg',
			alt: 'Image 7',
			link: '#',
			category: 'web'
		},
		{
			title: 'Sample Image',
			type: 'Photography',
			image: 'img/port-8.jpg',
			alt: 'Image 8',
			link: '#',
			category: 'photography'
		},
		{
			title: 'Sample Image',
			type: 'Graphic Design',
			image: 'img/port-9.jpg',
			alt: 'Image 9',
			link: '#',
			category: 'graphic'
		},
		{
			title: 'Sample Image',
			type: 'Web Design',
			image: 'img/port-10.jpg',
			alt: 'Image 10',
			link: '#',
			category: 'web'
		},
		{
			title: 'Sample Image',
			type: 'Photography',
			image: 'img/port-11.jpg',
			alt: 'Image 11',
			link: '#',
			category: 'photography'
		},
		{
			title: 'Sample Image',
			type: 'Graphic Design',
			image: 'img/port-12.jpg',
			alt: 'Image 12',
			link: '#',
			category: 'graphic'
		}];
});



module.directive('statisticsDir', function($interval) {
    return {
		restrict: 'A',
		replace: true,
		templateUrl: "templates/statistics.html",
		controller: function ($scope) {
			$scope.statistics = [
				{number: 3054, text: 'Completed projects', iconClass: 'icon-proud_case'},
				{number: 7234873, text: 'Click presed', iconClass: 'icon-proud_mouse'},
				{number: 4670, text: 'Mails sented & received', iconClass: 'icon-proud_letter'},
				{number: 939, text: 'Jokes tolds', iconClass: 'icon-proud_dialog'}
			];

			this.countValue = function (item) {
				var finalValue = item.number;
				var start = 0;
				var delta = parseInt(finalValue / 100);

				var timer = $interval(function() {
					start += delta;
					if (start > finalValue) {
						start = finalValue;
						$interval.cancel(timer);
					}

					item.number = start;
				}, 30);
			};
		}
	};
});


module.directive('countDir', function($document) {
	return {
		require: '^statisticsDir',
		link: function (scope, element, attribute, ctrl) {

			$document.on('scroll', startCount);

			function startCount() {
				if (pageYOffset + document.documentElement.clientHeight > element.offset().top
				&& pageYOffset + scope.scrollOffset < element.offset().top + element.outerHeight()) {
					ctrl.countValue(scope.item);
					$document.off('scroll', startCount);
				};
			};

			startCount();
		}
	};
});


module.directive('aboutDir', function () {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'templates/about.html',
		controller: function ($scope) {
			$scope.team = [
				{
					name: 'Harold Finch',
					occupation: 'Systems Analyst',
					description: 'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu.',
					imgUrl: 'img/team-member-1.jpg'
				},
				{
					name: 'John Reese',
					occupation: 'Photographer',
					description: 'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu.',
					imgUrl: 'img/team-member-2.jpg'
				},
				{
					name: 'Samantha Groves',
					occupation: 'Sales Manager',
					description: 'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu.',
					imgUrl: 'img/team-member-3.jpg'
				},
				{
					name: 'Lionel Fusco',
					occupation: 'Graphic Designer',
					description: 'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu.',
					imgUrl: 'img/team-member-4.jpg'
				},
			];
		}
	};
});


module.controller('ContactsCtrl', function ($scope, $cookies) {

	$scope.field = {
		name: $cookies.get('userName') || '',
		mail: $cookies.get('userMail') || '',
		message: ''
	};

	$scope.nameRegexp =  /^[a-zA-Z_]+$/;
    $scope.mailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/;
    $scope.messageRegexp = /^.{20,}/;

    $scope.formWarnings = {
		name: 'Allowed english alphabet characters only',
		mail: 'Allowed english alphabet characters, digits, symbols _ and @',
		message: 'Nessage must be at least 20 characters'
	};

    $scope.submitHandler = function(data) {
		$cookies.put('userName', data.name);
		$cookies.put('userMail', data.mail);

        alert('Form submited');
    };
});




module.controller('NewsCtrl', function ($scope, $http, $routeParams) {
	var config = {
		transformResponse: appendTransform($http.defaults.transformResponse, function(response) {
			for (var i = 0; i < response.length; i++) {
				var a = response[i].date.split('/');
				response[i].date = new Date( a[2], a[0]-1, a[1]);
			}
			return response;
		})
	};

	function appendTransform(defaults, transform) {
		defaults = angular.isArray(defaults) ? defaults : [defaults];
		return defaults.concat(transform);
	};

	$http.get('data.json', config).then(function (response) {
		$scope.news = response.data;
	}, function (error) {
		console.log(error);
		$scope.news = [];
	});

	$scope.id = $routeParams.id;

	if (angular.isDefined($scope.news)) {
		for (var i = 0; i < $scope.news.length; i++) {
			if ($scope.news[i].id == $scope.id) {
				$scope.singleNews = $scope.news[i];
				break;
			}
		}
	}
});


module.config(function ($routeProvider, $locationProvider) {

	$routeProvider
	.when('/index.html', {
		redirectTo: '/'
	})
	.when('/:id', {
		templateUrl: 'templates/news.html',
		controller: 'NewsCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
});
