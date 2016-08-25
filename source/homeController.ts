/// <reference path="../typings/angularjs/angular.d.ts" />

 class HomeController {

        public static AngularDependencies = ['AuthService', '$ionicLoading','EventService','PerformanceService', HomeController];

        constructor(private servAuth: AuthService, private $ionicLoading, private eventServ: EventService, private perform: PerformanceService) {
            
            //this.testAuthRoute(); 
            this.perform.setStart();
            if (this.servAuth.userLoggedIn()) {
                this.getUserEvents(); 
            }
        }; 

        private header: string = "My Events";

        private Zipcode: string = "347"; 

        private updateStatusOnEvent(id, status) {
            let eventToUpdate = this.events.filter((event) => event.id == id); 
            eventToUpdate[0].status = status; 
        }
        private userLoggedIn() {
            this.servAuth.userLoggedIn() ? true : false; 
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


        public getUserEvents() {
        this.$ionicLoading.show({
            template: 'Getting you all set up...'
        }); 
            this.eventServ.getUserEvents().then(
                (response) => {
                    console.log(response); 
                    this.events = response.data; 
                    this.$ionicLoading.hide(); 
                    this.perform.setEnd(); 
                    console.log(this.perform.getTimeLoading()); 
                }, 
                error => {
                    console.log(error)
                    this.$ionicLoading.hide(); 
                    this.perform.setEnd(); 
                    console.log(this.perform.getTimeLoading()); 
                }
            );
        }

        //this will make a call to the event service for the user who is logged in 
        private events; 

    }

eventApp.controller('HomeController', HomeController.AngularDependencies); 