interface ISearchResults {
    data: any 
} 

class SearchController {

    static AngularDependencies = ['$scope','$ionicLoading', '$location', 'EventService', 'AuthService', SearchController]; 

    constructor($scope: ng.IScope, private $ionicLoading, private $location,  private eventService: EventService, private servAuth: AuthService) {
        
        $scope.$watch(() => { return this.searchText; }, (newValue, oldValue) => {
            if (newValue.length == 5) {
                this.getYelpResults();
            }
            else if (newValue.length < 5) {
                this.searchResults = [];
            }
            else if (newValue.length > 5) {
                this.searchText = this.searchText.slice(0, 5); 
            }
        }); 
    
    }; 

    public searchText: string; 

    private searchResults = []; 
    
    public findOrCreateEvent(yelp_id: number) {
        if(this.servAuth.userLoggedIn()) {
            this.eventService.findOrCreateEvent({
                yelp_id: yelp_id, 
                user_id: 5
            }).then(
                (data) => {
                    console.log(data);
                    this.$location.path('/#/tab/home'); }, 
                (error) => {
                    console.log(error); }
                );
        } else {
            alert('You need to be signed in in order to attend events.'); 
        }
    } 

    public getYelpResults() {
        this.$ionicLoading.show({
            template: 'Hold up while we search the globe...'
        }); 
        
        this.eventService.getEvents({
                search_term: "burgers", 
                location: this.searchText 
                }).then(
                (response: ISearchResults)  => { 
                    console.log(response.data); 
                    this.searchResults = response.data; 
                    this.$ionicLoading.hide() 
                }, error => { 
                    console.log(error); 
                    this.$ionicLoading.hide();  
                }); 
    }

}

eventApp.controller('SearchController', SearchController.AngularDependencies); 