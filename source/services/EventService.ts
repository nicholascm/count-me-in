interface IEventSearch {
    search_term: string,  
    location: string, 
}

class EventService {

    public static angularDependencies = ['$http', EventService, AuthService]; 

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
        return this.$http({
            method: "GET", 
            url: this.APIURL+'events/'+ this.servAuth.getUserInfo().id; 
        }
    }
}


eventApp.service('EventService', EventService.angularDependencies); 
