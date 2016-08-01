// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var eventApp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']);
eventApp
    .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
    .config(function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
        .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })
        .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })
        .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
            'tab-chats': {
                templateUrl: 'templates/chat-detail.html',
                controller: 'ChatDetailCtrl'
            }
        }
    })
        .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeController',
                controllerAs: 'Ctrl'
            }
        }
    })
        .state('tab.home-search', {
        url: '/home/search',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-search.html',
                controller: 'SearchController',
                controllerAs: 'Srch'
            }
        }
    })
        .state('tab.home-search.event', {
        url: '/home/event',
        views: {
            'tab-home': {
                templateUrl: 'templates/event.html',
                controller: 'EventController',
                controllerAs: 'Event'
            }
        }
    })
        .state('tab.search', {
        url: '/search',
        views: {
            'tab-search': {
                templateUrl: 'templates/tab-search.html',
                controller: 'SearchController',
                controllerAs: 'Srch'
            }
        }
    })
        .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');
});
angular.module('starter.controllers', [])
    .controller('DashCtrl', function ($scope) { })
    .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})
    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})
    .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
/// <reference path="../typings/angularjs/angular.d.ts" />
var HomeController = (function () {
    function HomeController($scope) {
        this.header = "My Events";
        this.Zipcode = "32547";
        this.events = [{
                "id": "1",
                "description": "Description of the event to go down",
                "location": "Buddy's Pizza",
                "date": "3/31/2016",
                "status": "Going",
                "attendees": "3"
            },
            { "id": "2",
                "description": "Another description of the event happening",
                "location": "Jim's Barber Shop",
                "date": "3/31/2016",
                "status": "Going",
                "attendees": "9"
            }];
    }
    ;
    HomeController.prototype.newEvent = function () {
        alert("NEW");
    };
    ;
    HomeController.prototype.updateStatusOnEvent = function (id, status) {
        var eventToUpdate = this.events.filter(function (event) { return event.id == id; });
        eventToUpdate[0].status = status;
    };
    HomeController.AngularDependencies = ['$scope', HomeController];
    return HomeController;
}());
eventApp.controller('HomeController', HomeController.AngularDependencies);
var SearchController = (function () {
    function SearchController($scope) {
        var _this = this;
        $scope.$watch(function () { return _this.searchText; }, function (newValue, oldValue) {
            if (newValue.length == 5) {
                _this.searchResults = _this.getLocations(newValue);
            }
            else if (newValue.length < 5) {
                _this.searchResults = [];
            }
            else if (newValue.length > 5) {
                _this.searchText = _this.searchText.slice(0, 5);
            }
        });
    }
    ;
    SearchController.prototype.getLocations = function (text) {
        return [
            {
                "name": "Bob's Pizza",
                "address": "33 Billygoat Street",
                "summary": "love this place!!!",
                "id": "1",
                "image": "cover.jpg"
            },
            {
                "name": "Bob's Pizza",
                "address": "33 Billygoat Street",
                "summary": "love this place!!!",
                "id": "1",
                "image": "cover.jpg"
            },
            {
                "name": "Bob's Pizza",
                "address": "33 Billygoat Street",
                "summary": "love this place!!!",
                "id": "1",
                "image": "cover.jpg"
            }
        ];
    };
    SearchController.AngularDependencies = ['$scope', SearchController];
    return SearchController;
}());
eventApp.controller('SearchController', SearchController.AngularDependencies);
var EventController = (function () {
    function EventController($scope) {
        this.test = "test";
    }
    EventController.AngularDependencies = ['$scope', EventController];
    return EventController;
}());
//# sourceMappingURL=appBundle.js.map