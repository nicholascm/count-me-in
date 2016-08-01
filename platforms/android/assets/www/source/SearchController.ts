class SearchController {

    static AngularDependencies = ['$scope', SearchController]; 

    constructor($scope: ng.IScope) {

        $scope.$watch(() => { return this.searchText; }, (newValue, oldValue) => {
            if (newValue.length == 5) {
                this.searchResults = this.getLocations(newValue);
            }
            else if (newValue.length < 5) {
                this.searchResults = [];
            }
            else if (newValue.length > 5) {
                this.searchText = this.searchText.slice(0, 5); 
            }
        });
    
    }; 

    searchText: string; 

    searchResults; 

    getLocations(text: string) {
        return [
            {
                "name": "Bob's Pizza",
                "address": "33 Billygoat Street",
                "summary": "love this place!!!",
                "id": "1",
                "image": "cover.jpg"
            },
            {
                "name": "Bob's Pizza",
                "address": "33 Billygoat Street",
                "summary": "love this place!!!",
                "id": "1",
                "image": "cover.jpg"
            },
            {
                "name": "Bob's Pizza",
                "address": "33 Billygoat Street",
                "summary": "love this place!!!",
                "id": "1",
                "image": "cover.jpg"
            }
        ]; 
    }

}

eventApp.controller('SearchController', SearchController.AngularDependencies); 