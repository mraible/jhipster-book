myApp.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /search
    $urlRouterProvider.otherwise('/search');

    // Set up the states
    $stateProvider
        .state('search', {
            url: '/search',
            templateUrl: 'search/index.html',
            controller: 'SearchController'
        })
        .state('search.edit', {
            url: '/edit/:id',
            templateUrl: 'search/edit.html',
            controller: 'EditController'
        })
});
