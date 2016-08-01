// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var eventApp = angular.module('starter', ['ionic', 'ngStorage', 'starter.controllers', 'starter.services']);
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
        .state('authenticate', {
        url: '/auth',
        templateUrl: 'templates/authentication.html',
        controller: 'AuthController',
        controllerAs: 'auth'
    })
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
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
                controller: 'AccountController',
                controllerAs: 'Acct'
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
    function HomeController(servAuth) {
        this.servAuth = servAuth;
        this.header = "My Events";
        this.Zipcode = "347";
        this.events = [];
        this.testAuthRoute();
    }
    ;
    HomeController.prototype.newEvent = function (alert) {
        return "hey";
        //alert("NEW"); 
    };
    ;
    HomeController.prototype.updateStatusOnEvent = function (id, status) {
        var eventToUpdate = this.events.filter(function (event) { return event.id == id; });
        eventToUpdate[0].status = status;
    };
    HomeController.prototype.testAuthRoute = function () {
        this.servAuth.testRoute().then(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    HomeController.prototype.showNoEventMessage = function () {
        this.events.length == 0 ? true : false;
    };
    HomeController.AngularDependencies = ['AuthService', HomeController];
    return HomeController;
}());
eventApp.controller('HomeController', HomeController.AngularDependencies);
var SearchController = (function () {
    function SearchController($scope, $ionicLoading, eventService) {
        var _this = this;
        this.$ionicLoading = $ionicLoading;
        this.eventService = eventService;
        this.searchResults = [];
        $scope.$watch(function () { return _this.searchText; }, function (newValue, oldValue) {
            if (newValue.length == 5) {
                _this.getYelpResults();
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
    SearchController.prototype.getYelpResults = function () {
        var _this = this;
        this.$ionicLoading.show({
            template: 'Hold up while we search the globe...'
        });
        this.eventService.getEvents({
            search_term: "chinese",
            location: this.searchText }).then(function (data) {
            console.log(data);
            _this.searchResults = data.data.businesses;
            _this.$ionicLoading.hide();
        }, function (error) {
            console.log(error);
            _this.$ionicLoading.hide();
        });
    };
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
    SearchController.AngularDependencies = ['$scope', '$ionicLoading', 'EventService', SearchController];
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
var AuthController = (function () {
    function AuthController(servAuth, $location) {
        this.servAuth = servAuth;
        this.$location = $location;
    }
    AuthController.prototype.signup = function () {
        this.servAuth.signup({
            name: this.name,
            email: this.username,
            password: this.password
        }).then(function () { return alert("success"); }, function () { return alert("failure"); });
    };
    AuthController.prototype.login = function () {
        var _this = this;
        this.servAuth.login({
            name: this.name,
            email: this.username,
            password: this.password
        }).then(function (data) {
            console.log('success', data);
            _this.servAuth.storeToken(data);
            _this.$location('/#/tab/home');
        }, function (e) { return console.log('fail', e); });
    };
    AuthController.AngularDependencies = ['AuthService', '$location', AuthController];
    return AuthController;
}());
eventApp.controller('AuthController', AuthController.AngularDependencies);
var AccountController = (function () {
    function AccountController(servAuth) {
        this.servAuth = servAuth;
    }
    AccountController.prototype.logOutCurrentUser = function () {
        this.servAuth.logout();
        console.log(this.servAuth.getToken());
    };
    AccountController.AngularDependencies = ['AuthService', AccountController];
    return AccountController;
}());
eventApp.controller('AccountController', AccountController.AngularDependencies);
var EventService = (function () {
    function EventService($http) {
        this.$http = $http;
        this.APIURL = 'http://events.app/api/';
    }
    EventService.prototype.getEvents = function (data) {
        return this.$http({
            method: "GET",
            url: this.APIURL + 'yelp/search',
            params: data
        });
    };
    EventService.angularDependencies = ['$http', EventService];
    return EventService;
}());
eventApp.service('EventService', EventService.angularDependencies);
var AuthService = (function () {
    function AuthService($http, $localStorage) {
        this.$http = $http;
        this.$localStorage = $localStorage;
        this.APIURL = 'http://events.app/api/';
    }
    AuthService.prototype.login = function (credentials) {
        return this.$http({
            method: 'POST',
            url: this.APIURL + 'authenticate',
            data: credentials
        });
    };
    AuthService.prototype.logout = function () {
        this.$localStorage.token = "";
    };
    AuthService.prototype.signup = function (credentials) {
        return this.$http({
            method: 'POST',
            url: this.APIURL + 'signup',
            data: credentials
        });
    };
    AuthService.prototype.storeToken = function (token) {
        this.$localStorage.token = token;
    };
    //route only here for testing use of authentication-required endpoints - doesn't belong here
    AuthService.prototype.testRoute = function () {
        return this.$http({
            method: 'GET',
            url: this.APIURL + 'authenticate',
            params: {
                token: this.getToken()
            }
        });
    };
    AuthService.prototype.getToken = function () {
        return this.$localStorage.token.token;
    };
    AuthService.angularDependencies = ['$http', '$localStorage', AuthService];
    return AuthService;
}());
eventApp.service('AuthService', AuthService.angularDependencies);
//# sourceMappingURL=appBundle.js.map