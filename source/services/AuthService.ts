interface IUser { 
    name: string, 
    email: string, 
    password: string
}

class AuthService {

    public static angularDependencies = ['$http','$localStorage', AuthService]; 

    protected APIURL: string = 'http://events.app/api/'; 

    constructor(private $http: ng.IHttpService, private $localStorage) {

    }  

    public login(credentials: IUser) {
        return this.$http({
            method: 'POST', 
            url: this.APIURL+'authenticate',
            data: credentials
        }); 
    }

    public logout() {
        this.$localStorage.token = ""; 
    }

    public signup(credentials: IUser) {
        return this.$http({
            method: 'POST', 
            url: this.APIURL+'signup',
            data: credentials
        }); 
    }

    public storeToken(token: any) {
        this.$localStorage.token = token; 
    }

    //route only here for testing use of authentication-required endpoints - doesn't belong here

    public testRoute() {
        return this.$http({
            method: 'GET', 
            url: this.APIURL+'authenticate',
            params: {
                token: this.getToken() 
            }
        }); 
    }

    public userLoggedIn():boolean {
        if (this.$localStorage.token == "") {
            return false; 
        } 
        return true;     
    }

    public getToken(): string {
        if (this.$localStorage.token == ""){
            console.log("user not logged in"); 
        }
        return this.$localStorage.token.data.token; 
    }
}

eventApp.service('AuthService', AuthService.angularDependencies); 