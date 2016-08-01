/// <reference path="../typings/angularjs/angular.d.ts" />

 class HomeController {

        public static AngularDependencies = ['AuthService', HomeController];

        constructor(private servAuth: AuthService) {
            
            this.testAuthRoute(); 
        }; 

        public header: string = "My Events";

        public Zipcode: string = "347"; 

        public newEvent(alert: string): string {
            return "hey"; 
            //alert("NEW"); 
        }; 

        public updateStatusOnEvent(id, status) {
            let eventToUpdate = this.events.filter((event) => event.id == id); 
            eventToUpdate[0].status = status; 
        }

        public testAuthRoute() {
            this.servAuth.testRoute().then(
                data => console.log(data), 
                error => console.log(error)  
            )
        }

        public showNoEventMessage() {
            this.events.length == 0 ? true : false; 
        }

        public events = [/*{
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
            } */]
    }

eventApp.controller('HomeController', HomeController.AngularDependencies); 