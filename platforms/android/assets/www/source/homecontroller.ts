/// <reference path="../typings/angularjs/angular.d.ts" />

 class HomeController {

        static AngularDependencies = ['$scope', HomeController];

        constructor($scope: ng.IScope) {
        }; 

        public header: string = "My Events";

        public Zipcode: string = "32547"; 

        public newEvent() {
            alert("NEW"); 
        }; 

        public updateStatusOnEvent(id, status) {
            let eventToUpdate = this.events.filter((event) => event.id == id); 
            eventToUpdate[0].status = status; 
        }

        public events = [{
            "id": "1", 
            "description": "Description of the event to go down",
            "location": "Buddy's Pizza",
            "date": "3/31/2016",
            "status": "Going", 
            "attendees": "3"
        },
            {   "id":  "2", 
                "description": "Another description of the event happening",
                "location": "Jim's Barber Shop",
                "date": "3/31/2016",
                "status": "Going", 
                "attendees": "9"
            }]
    }

eventApp.controller('HomeController', HomeController.AngularDependencies); 