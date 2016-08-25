// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var eventApp = angular.module('starter', ['ionic', 'ngStorage']);
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
/// <reference path="../typings/angularjs/angular.d.ts" />
var HomeController = (function () {
    function HomeController(servAuth, $ionicLoading, eventServ, perform) {
        this.servAuth = servAuth;
        this.$ionicLoading = $ionicLoading;
        this.eventServ = eventServ;
        this.perform = perform;
        this.header = "My Events";
        this.Zipcode = "347";
        //this.testAuthRoute(); 
        this.perform.setStart();
        if (this.servAuth.userLoggedIn()) {
            this.getUserEvents();
        }
    }
    ;
    HomeController.prototype.updateStatusOnEvent = function (id, status) {
        var eventToUpdate = this.events.filter(function (event) { return event.id == id; });
        eventToUpdate[0].status = status;
    };
    HomeController.prototype.userLoggedIn = function () {
        this.servAuth.userLoggedIn() ? true : false;
    };
    HomeController.prototype.testAuthRoute = function () {
        if (this.servAuth.userLoggedIn()) {
            console.log(this.servAuth.getToken());
            this.servAuth.testRoute().then(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        }
        else {
            console.log('not logged in');
        }
    };
    HomeController.prototype.getUserEvents = function () {
        var _this = this;
        this.$ionicLoading.show({
            template: 'Getting you all set up...'
        });
        this.eventServ.getUserEvents().then(function (response) {
            console.log(response);
            _this.events = response.data;
            _this.$ionicLoading.hide();
            _this.perform.setEnd();
            console.log(_this.perform.getTimeLoading());
        }, function (error) {
            console.log(error);
            _this.$ionicLoading.hide();
            _this.perform.setEnd();
            console.log(_this.perform.getTimeLoading());
        });
    };
    HomeController.AngularDependencies = ['AuthService', '$ionicLoading', 'EventService', 'PerformanceService', HomeController];
    return HomeController;
}());
eventApp.controller('HomeController', HomeController.AngularDependencies);
var SearchController = (function () {
    function SearchController($scope, $ionicLoading, $location, eventService, servAuth) {
        var _this = this;
        this.$ionicLoading = $ionicLoading;
        this.$location = $location;
        this.eventService = eventService;
        this.servAuth = servAuth;
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
    SearchController.prototype.findOrCreateEvent = function (yelp_id) {
        var _this = this;
        if (this.servAuth.userLoggedIn()) {
            this.$ionicLoading.show({
                template: 'RSVPing you to this place.'
            });
            this.eventService.findOrCreateEvent({
                yelp_id: yelp_id,
                user_id: this.servAuth.getUserInfo().id
            }).then(function (data) {
                console.log(data);
                _this.$ionicLoading.hide();
                _this.$location.path('/#/tab/home');
            }, function (error) {
                _this.$ionicLoading.hide();
                console.log(error);
            });
        }
        else {
            alert('You need to be signed in in order to attend events.');
        }
    };
    SearchController.prototype.getYelpResults = function () {
        var _this = this;
        this.$ionicLoading.show({
            template: 'Hold up while we search the globe...'
        });
        this.eventService.getEvents({
            search_term: "bars",
            location: this.searchText
        }).then(function (response) {
            console.log(response.data);
            _this.searchResults = response.data;
            _this.$ionicLoading.hide();
        }, function (error) {
            console.log(error);
            _this.$ionicLoading.hide();
        });
    };
    SearchController.AngularDependencies = ['$scope', '$ionicLoading', '$location', 'EventService', 'AuthService', SearchController];
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
    function AuthController(servAuth, $ionicLoading, $location) {
        this.servAuth = servAuth;
        this.$ionicLoading = $ionicLoading;
        this.$location = $location;
    }
    AuthController.prototype.signup = function () {
        var _this = this;
        this.$ionicLoading.show({
            template: "Signing you up!"
        });
        this.servAuth.signup({
            name: this.name,
            email: this.username.toLowerCase(),
            password: this.password
        }).then(function (response) {
            _this.$ionicLoading.hide();
            console.log('success', response);
            _this.responseMessage = "Successful account creation, now just click sign in!";
        }, function (error) {
            _this.$ionicLoading.hide();
            console.log('failure', error);
            _this.responseMessage = error.data.errors[0];
        });
    };
    AuthController.prototype.login = function () {
        var _this = this;
        this.$ionicLoading.show({
            template: "Logging you in"
        });
        this.servAuth.login({
            name: this.name,
            email: this.username.toLowerCase(),
            password: this.password
        }).then(function (data) {
            _this.$ionicLoading.hide();
            console.log('success', data);
            _this.servAuth.storeUser(data);
            _this.$location.path('/#/tab/home');
        }, function (e) {
            console.log('fail', e);
            var filteredError = e.data.error.replace('_', ' ');
            _this.responseMessage = filteredError;
            _this.$ionicLoading.hide();
        });
    };
    AuthController.AngularDependencies = ['AuthService', '$ionicLoading', '$location', AuthController];
    return AuthController;
}());
eventApp.controller('AuthController', AuthController.AngularDependencies);
var AccountController = (function () {
    function AccountController(servAuth) {
        this.servAuth = servAuth;
        if (this.servAuth.userLoggedIn()) {
            this.getUserInfo();
        }
    }
    AccountController.prototype.getUserInfo = function () {
        console.log(this.servAuth.getUserInfo());
        this.user = this.servAuth.getUserInfo();
    };
    AccountController.prototype.logOutCurrentUser = function () {
        this.servAuth.logout();
        console.log(this.servAuth.getToken());
    };
    AccountController.prototype.userLoggedIn = function () {
        return this.servAuth.userLoggedIn() ? true : false;
    };
    AccountController.AngularDependencies = ['AuthService', AccountController];
    return AccountController;
}());
eventApp.controller('AccountController', AccountController.AngularDependencies);
var EventService = (function () {
    function EventService($http, servAuth) {
        this.$http = $http;
        this.servAuth = servAuth;
        this.APIURL = 'http://events.app/api/';
    }
    EventService.prototype.getEvents = function (data) {
        return this.$http({
            method: "GET",
            url: this.APIURL + 'yelp/search',
            params: data
        });
    };
    //TODO: Fix this piece so that the current events for the user for the current day can be shown - need to send user_id with the request for the API 
    EventService.prototype.getUserEvents = function () {
        console.log(this.servAuth.getUserInfo().id);
        return this.$http({
            method: "GET",
            url: this.APIURL + 'events/search/' + this.servAuth.getUserInfo().id
        });
    };
    //TODO: use this service (unfinished) to add new events after the search
    EventService.prototype.findOrCreateEvent = function (data) {
        return this.$http({
            method: "POST",
            url: this.APIURL + 'events',
            data: data
        });
    };
    EventService.angularDependencies = ['$http', 'AuthService', EventService];
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
        this.$localStorage.user = "";
    };
    AuthService.prototype.signup = function (credentials) {
        return this.$http({
            method: 'POST',
            url: this.APIURL + 'signup',
            data: credentials
        });
    };
    AuthService.prototype.storeUser = function (user) {
        this.$localStorage.user = user;
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
    AuthService.prototype.userLoggedIn = function () {
        if (this.$localStorage.user == "") {
            return false;
        }
        return true;
    };
    AuthService.prototype.getToken = function () {
        if (this.$localStorage.user == "") {
            console.log("user not logged in");
        }
        return this.$localStorage.user.data.token;
    };
    //TODO: Make this so we aren't storing sensitive information from the server, also fix the server not to provide it!
    AuthService.prototype.getUserInfo = function () {
        return this.$localStorage.user.data.user[0];
    };
    AuthService.angularDependencies = ['$http', '$localStorage', AuthService];
    return AuthService;
}());
eventApp.service('AuthService', AuthService.angularDependencies);
var PerformanceService = (function () {
    function PerformanceService() {
    }
    PerformanceService.prototype.setStart = function () {
        this.startTime = Date.now();
    };
    PerformanceService.prototype.setEnd = function () {
        this.endTime = Date.now();
    };
    PerformanceService.prototype.getTimeLoading = function () {
        return "Page Load Time: " + (this.endTime - this.startTime) / 1000 + " seconds";
    };
    PerformanceService.angularDependencies = [PerformanceService];
    return PerformanceService;
}());
eventApp.service('PerformanceService', PerformanceService.angularDependencies);
//# sourceMappingURL=appBundle.js.map