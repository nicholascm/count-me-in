interface IEventSearch {
    search_term: string,  
    location: string, 
}

class EventService {

    public static angularDependencies = ['$http', EventService]; 

    protected APIURL: string = 'http://events.app/api/'; 

    constructor(private $http: ng.IHttpService) {

    }

    getEvents (data: IEventSearch){
        return this.$http({
            method: "GET", 
            url: this.APIURL+'yelp/search',
            params: data
        }); 

    }
}


eventApp.service('EventService', EventService.angularDependencies); 
