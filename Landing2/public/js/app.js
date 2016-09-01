var module = angular.module('landing2App', ['smoothScroll']);


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