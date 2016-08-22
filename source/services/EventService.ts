interface IEventSearch {
    search_term: string,  
    location: string, 
}

class EventService {

    public static angularDependencies = ['$http','AuthService', EventService]; 

    protected APIURL: string = 'http://events.app/api/'; 

    constructor(private $http: ng.IHttpService, private servAuth: AuthService) {

    }

    getEvents (data: IEventSearch){
        return this.$http({
            method: "GET", 
            url: this.APIURL+'yelp/search',
            params: data
        }); 

    }
    
    //TODO: Fix this piece so that the current events for the user for the current day can be shown - need to send user_id with the request for the API 

    getUserEvents () {
        console.log(this.servAuth.getUserInfo().id); 
        return this.$http({
            method: "GET", 
            url: this.APIURL+'events/search/'+ this.servAuth.getUserInfo().id
        });
    } 

    //TODO: use this service (unfinished) to add new events after the search
    findOrCreateEvent(data) {
        return this.$http({
            method: "POST", 
            url: this.APIURL+'events',
            data: data
        });
    }

}


eventApp.service('EventService', EventService.angularDependencies); 
