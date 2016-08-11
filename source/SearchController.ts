interface ISearchResults {
    data: any 
} 

class SearchController {

    static AngularDependencies = ['$scope','$ionicLoading', 'EventService', SearchController]; 

    constructor($scope: ng.IScope, private $ionicLoading, private eventService: EventService) {
        
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

    public getYelpResults() {
        this.$ionicLoading.show({
            template: 'Hold up while we search the globe...'
        }); 
        
        this.eventService.getEvents({
                search_term: "burgers", 
                location: this.searchText }).then(
                (data: ISearchResults)  => { 
                    console.log(data); 
                    this.searchResults = data.data; 
                    this.$ionicLoading.hide() 
                }, error => { 
                    console.log(error); 
                    this.$ionicLoading.hide();  
                }); 
    }

}

eventApp.controller('SearchController', SearchController.AngularDependencies); 