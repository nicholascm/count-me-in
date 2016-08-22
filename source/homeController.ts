/// <reference path="../typings/angularjs/angular.d.ts" />

 class HomeController {

        public static AngularDependencies = ['AuthService', 'EventService', HomeController];

        constructor(private servAuth: AuthService, private eventServ: EventService) {
            
            this.testAuthRoute(); 

            this.getUserEvents(); 
        }; 

        private header: string = "My Events";

        private Zipcode: string = "347"; 

        private updateStatusOnEvent(id, status) {
            let eventToUpdate = this.events.filter((event) => event.id == id); 
            eventToUpdate[0].status = status; 
        }

        private testAuthRoute() {
            if(this.servAuth.userLoggedIn()) {
            console.log(this.servAuth.getToken()); 
            this.servAuth.testRoute().then(
                data => console.log(data), 
                error => console.log(error)  
            )
            } else {
                console.log('not logged in'); 
            }
        }

        private showNoEventMessage() {
            this.events.length == 0 ? true : false; 
        }

        public getUserEvents() {
            this.eventServ.getUserEvents().then(
                response => console.log(response), 
                error => console.log(error)
            );
        }

        //this will make a call to the event service for the user who is logged in 
        private events = []; 

    }

eventApp.controller('HomeController', HomeController.AngularDependencies); 